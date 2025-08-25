import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  matched_at: string;
  matched_user: {
    id: string;
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

export const useMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("matches")
        .select(`
          *,
          user1_profile:profiles!user1_id(*),
          user2_profile:profiles!user2_id(*)
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order("matched_at", { ascending: false });

      if (error) throw error;

      // Transform the data to get the matched user's profile
      const transformedMatches = data?.map((match: any) => {
        const matchedUser = match.user1_id === user.id 
          ? match.user2_profile 
          : match.user1_profile;
        
        return {
          ...match,
          matched_user: matchedUser,
        };
      }) || [];

      setMatches(transformedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  return {
    matches,
    loading,
    refetchMatches: fetchMatches,
  };
};