import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  interests: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useProfiles = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Get current user's profile
  useEffect(() => {
    if (!user) return;

    const fetchCurrentProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!error && data) {
        setCurrentProfile(data);
      }
    };

    fetchCurrentProfile();
  }, [user]);

  // Get potential matches (other profiles excluding current user and already swiped)
  const fetchPotentialMatches = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get already swiped user IDs
      const { data: swipedUsers } = await supabase
        .from("user_swipes")
        .select("swiped_id")
        .eq("swiper_id", user.id);

      const swipedUserIds = swipedUsers?.map(s => s.swiped_id) || [];
      
      // Get profiles excluding current user and already swiped users
      const { data: profilesData, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("user_id", user.id)
        .not("user_id", "in", `(${swipedUserIds.join(",") || "''"})`);

      if (error) throw error;
      setProfiles(profilesData || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !currentProfile) return;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id);

    if (!error) {
      setCurrentProfile({ ...currentProfile, ...updates });
    }
    
    return { error };
  };

  // Like/Pass on a profile
  const swipeProfile = async (profileId: string, isLike: boolean) => {
    if (!user) return;

    // Record the swipe
    const { error: swipeError } = await supabase
      .from("user_swipes")
      .insert({
        swiper_id: user.id,
        swiped_id: profileId,
        is_like: isLike,
      });

    if (swipeError) {
      console.error("Error recording swipe:", swipeError);
      return { match: false, error: swipeError };
    }

    // If it's a like, check if there's a mutual match
    if (isLike) {
      const { data: mutualSwipe } = await supabase
        .from("user_swipes")
        .select("*")
        .eq("swiper_id", profileId)
        .eq("swiped_id", user.id)
        .eq("is_like", true)
        .single();

      if (mutualSwipe) {
        // Create a match
        const { error: matchError } = await supabase
          .from("matches")
          .insert({
            user1_id: user.id < profileId ? user.id : profileId,
            user2_id: user.id < profileId ? profileId : user.id,
          });

        if (!matchError) {
          return { match: true, error: null };
        }
      }
    }

    // Remove the profile from the current list
    setProfiles(prev => prev.filter(p => p.user_id !== profileId));
    
    return { match: false, error: null };
  };

  useEffect(() => {
    if (user) {
      fetchPotentialMatches();
    }
  }, [user]);

  return {
    profiles,
    currentProfile,
    loading,
    updateProfile,
    swipeProfile,
    refetchProfiles: fetchPotentialMatches,
  };
};