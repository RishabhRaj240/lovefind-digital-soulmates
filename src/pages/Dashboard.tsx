
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchItem } from "@/components/MatchItem";
import { useProfiles } from "@/hooks/useProfiles";
import { useMatches } from "@/hooks/useMatches";
import { useMessages } from "@/hooks/useMessages";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profiles, loading: profilesLoading, swipeProfile } = useProfiles();
  const { matches, loading: matchesLoading } = useMatches();
  const { createConversation } = useMessages();
  
  const currentProfile = profiles[0] || null;

  // Handle like action
  const handleLike = async (profileId: string) => {
    const result = await swipeProfile(profileId, true);
    
    if (result?.match) {
      toast.success("It's a match! 🎉");
    }
  };

  // Handle pass action
  const handlePass = async (profileId: string) => {
    await swipeProfile(profileId, false);
  };

  // Navigate to messages
  const handleMessage = async (userId: string) => {
    const conversationId = await createConversation(userId);
    if (conversationId) {
      navigate(`/conversation/${conversationId}`);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow bg-muted/30 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="mb-8 w-full max-w-md mx-auto">
                <TabsTrigger value="discover" className="flex-1">Discover</TabsTrigger>
                <TabsTrigger value="matches" className="flex-1">Matches</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discover" className="flex justify-center mt-4">
                {profilesLoading ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-pulse text-center">
                      <div className="h-32 w-32 rounded-full bg-muted mx-auto"></div>
                      <div className="h-6 w-40 bg-muted rounded mx-auto mt-4"></div>
                      <div className="h-4 w-60 bg-muted rounded mx-auto mt-2"></div>
                    </div>
                  </div>
                ) : currentProfile ? (
                  <ProfileCard
                    id={currentProfile.user_id}
                    name={`${currentProfile.first_name || ''} ${currentProfile.last_name || ''}`.trim() || 'Anonymous'}
                    age={currentProfile.age || 0}
                    location={currentProfile.location || 'Unknown'}
                    bio={currentProfile.bio || 'No bio available'}
                    images={currentProfile.avatar_url ? [currentProfile.avatar_url] : []}
                    interests={currentProfile.interests || []}
                    onLike={handleLike}
                    onPass={handlePass}
                    onMessage={handleMessage}
                  />
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-2xl font-bold mb-4">No more profiles to show</h3>
                    <p className="text-muted-foreground mb-8">
                      Check back soon for new potential matches!
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="matches">
                {matchesLoading ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-love-500"></div>
                  </div>
                ) : matches.length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold mb-6">Your Matches</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {matches.map(match => (
                        <MatchItem
                          key={match.id}
                          id={match.matched_user.user_id}
                          name={`${match.matched_user.first_name || ''} ${match.matched_user.last_name || ''}`.trim() || 'Anonymous'}
                          avatar={match.matched_user.avatar_url || undefined}
                          matchDate={new Date(match.matched_at)}
                          onMessage={handleMessage}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-xl font-bold mb-2">No matches yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start liking profiles to make connections
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
