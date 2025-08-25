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

// Sample profiles to show when no real profiles exist
const sampleProfiles: Profile[] = [
  {
    id: 'sample-1',
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    first_name: 'Sarah',
    last_name: 'Johnson',
    age: 28,
    location: 'San Francisco, CA',
    bio: 'Adventure seeker who loves hiking, photography, and trying new cuisines. Looking for someone who shares my passion for exploring the world!',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b272?w=400&h=400&fit=crop&crop=face',
    interests: ['hiking', 'photography', 'travel', 'cooking', 'yoga'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    first_name: 'Michael',
    last_name: 'Chen',
    age: 32,
    location: 'Seattle, WA',
    bio: 'Software engineer by day, musician by night. I play guitar in a local band and love discovering new coffee shops around the city.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    interests: ['music', 'coffee', 'technology', 'guitar', 'concerts'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    first_name: 'Emma',
    last_name: 'Rodriguez',
    age: 26,
    location: 'Austin, TX',
    bio: 'Art teacher who believes creativity makes life beautiful. I spend weekends painting, visiting museums, and dancing salsa.',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    interests: ['art', 'painting', 'dancing', 'museums', 'teaching'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sample-4',
    user_id: '550e8400-e29b-41d4-a716-446655440004',
    first_name: 'David',
    last_name: 'Thompson',
    age: 30,
    location: 'Denver, CO',
    bio: 'Fitness enthusiast and personal trainer. I love helping others reach their goals. When I\'m not at the gym, you\'ll find me rock climbing or cooking healthy meals.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    interests: ['fitness', 'rock climbing', 'cooking', 'health', 'outdoor activities'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// State to track swiped sample profiles in local storage
const getSwipedSampleProfiles = (): string[] => {
  try {
    const swiped = localStorage.getItem('swiped_sample_profiles');
    return swiped ? JSON.parse(swiped) : [];
  } catch {
    return [];
  }
};

const addSwipedSampleProfile = (profileId: string) => {
  try {
    const swiped = getSwipedSampleProfiles();
    if (!swiped.includes(profileId)) {
      swiped.push(profileId);
      localStorage.setItem('swiped_sample_profiles', JSON.stringify(swiped));
    }
  } catch {
    // Ignore localStorage errors
  }
};

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
      let query = supabase
        .from("profiles")
        .select("*")
        .neq("user_id", user.id);

      // Only add the not.in filter if there are actually swiped users
      if (swipedUserIds.length > 0) {
        query = query.not("user_id", "in", `(${swipedUserIds.join(",")})`);
      }

      const { data: profilesData, error } = await query;

      if (error) throw error;
      
      // If no real profiles exist, show sample profiles
      if (!profilesData || profilesData.length === 0) {
        // Filter out any sample profiles that were already "swiped" locally
        const swipedSampleIds = getSwipedSampleProfiles();
        const filteredSamples = sampleProfiles.filter(
          profile => !swipedSampleIds.includes(profile.user_id)
        );
        setProfiles(filteredSamples);
      } else {
        setProfiles(profilesData);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      // On error, fallback to sample profiles
      const swipedSampleIds = getSwipedSampleProfiles();
      const filteredSamples = sampleProfiles.filter(
        profile => !swipedSampleIds.includes(profile.user_id)
      );
      setProfiles(filteredSamples);
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

    // Check if this is a sample profile
    const isSampleProfile = sampleProfiles.some(p => p.user_id === profileId);
    
    if (isSampleProfile) {
      // Handle sample profile swiping locally
      addSwipedSampleProfile(profileId);
      
      // Remove the profile from the current list
      setProfiles(prev => prev.filter(p => p.user_id !== profileId));
      
      // For sample profiles, we can simulate a match sometimes
      if (isLike && Math.random() > 0.7) {
        return { match: true, error: null };
      }
      
      return { match: false, error: null };
    }

    // Record the swipe for real profiles
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
        .maybeSingle();

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