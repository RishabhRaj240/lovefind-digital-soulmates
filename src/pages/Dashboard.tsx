
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileCard, ProfileCardProps } from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchItem, MatchItemProps } from "@/components/MatchItem";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState<ProfileCardProps | null>(null);
  const [potentialMatches, setPotentialMatches] = useState<ProfileCardProps[]>([]);
  const [matches, setMatches] = useState<MatchItemProps[]>([]);
  
  // Mock authentication check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Mock potential matches data
      setPotentialMatches([
        {
          id: "1",
          name: "Sophie",
          age: 28,
          location: "New York, NY",
          bio: "Adventure seeker and coffee enthusiast. Love hiking, photography, and trying new restaurants. Looking for someone who enjoys exploring the city and going on weekend trips.",
          images: ["https://placehold.co/800x1000"],
          interests: ["Travel", "Photography", "Hiking", "Coffee"],
        },
        {
          id: "2",
          name: "Emma",
          age: 26,
          location: "Brooklyn, NY",
          bio: "Artist and book lover. I spend my weekends at galleries or curled up with a good novel. Would love to meet someone who appreciates art and literature.",
          images: ["https://placehold.co/800x1000"],
          interests: ["Art", "Reading", "Museums", "Wine Tasting"],
        },
        {
          id: "3",
          name: "Maya",
          age: 29,
          location: "Manhattan, NY",
          bio: "Tech professional by day, foodie by night. I'm passionate about cooking and trying international cuisines. Looking for someone to share meals and adventures with.",
          images: ["https://placehold.co/800x1000"],
          interests: ["Cooking", "Technology", "Restaurants", "Travel"],
        },
      ]);
      
      // Mock matches data
      setMatches([
        {
          id: "101",
          name: "Jessica",
          avatar: "https://placehold.co/400x400",
          matchDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          id: "102",
          name: "Olivia",
          avatar: "https://placehold.co/400x400",
          matchDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
        {
          id: "103",
          name: "Sophia",
          avatar: "https://placehold.co/400x400",
          matchDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        },
        {
          id: "104",
          name: "Ava",
          avatar: "https://placehold.co/400x400",
          matchDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        },
      ]);
      
      // Set initial profile to show
      if (potentialMatches.length === 0) {
        setCurrentProfile(null);
      } else {
        setCurrentProfile(potentialMatches[0]);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [navigate]);
  
  // Handle like action
  const handleLike = (id: string) => {
    // Simulate matching process
    const matchProbability = 0.7; // 70% chance of match
    const isMatch = Math.random() < matchProbability;
    
    if (isMatch) {
      toast.success("It's a match! 🎉");
      
      // Add to matches
      if (currentProfile) {
        const newMatch: MatchItemProps = {
          id: currentProfile.id,
          name: currentProfile.name,
          avatar: currentProfile.images[0],
          matchDate: new Date(),
        };
        setMatches([newMatch, ...matches]);
      }
    }
    
    // Remove current profile and show next
    showNextProfile();
  };
  
  // Handle pass action
  const handlePass = (id: string) => {
    showNextProfile();
  };
  
  // Navigate to messages
  const handleMessage = (id: string) => {
    navigate(`/conversation/${id}`);
  };
  
  // Show next profile in the queue
  const showNextProfile = () => {
    if (potentialMatches.length <= 1) {
      // No more profiles to show
      setCurrentProfile(null);
      setPotentialMatches([]);
      return;
    }
    
    // Remove first profile and update state
    const newPotentialMatches = [...potentialMatches];
    newPotentialMatches.shift();
    setPotentialMatches(newPotentialMatches);
    setCurrentProfile(newPotentialMatches[0]);
  };

  return (
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
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-pulse text-center">
                    <div className="h-32 w-32 rounded-full bg-muted mx-auto"></div>
                    <div className="h-6 w-40 bg-muted rounded mx-auto mt-4"></div>
                    <div className="h-4 w-60 bg-muted rounded mx-auto mt-2"></div>
                  </div>
                </div>
              ) : currentProfile ? (
                <ProfileCard
                  {...currentProfile}
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
              {matches.length > 0 ? (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-6">Your Matches</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {matches.map(match => (
                      <MatchItem
                        key={match.id}
                        {...match}
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
  );
};

export default Dashboard;
