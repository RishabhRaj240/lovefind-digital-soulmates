
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Heart, MapPin, Briefcase, GraduationCap, Edit, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock profile data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    age: 28,
    location: "New York, NY",
    occupation: "Software Engineer",
    education: "University of California",
    bio: "Travel enthusiast, coffee addict, and tech lover. Looking for someone to share adventures with. I enjoy hiking, photography, and exploring new restaurants on the weekends.",
    photos: ["https://placehold.co/800x1000", "https://placehold.co/800x1000", "https://placehold.co/800x1000"],
    interests: ["Travel", "Photography", "Hiking", "Coffee", "Technology", "Movies"],
  });
  
  // Mock stats
  const [stats, setStats] = useState({
    likes: 45,
    matches: 12,
    conversations: 8,
    profileViews: 124,
  });
  
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
      setIsLoading(false);
    }, 500);
  }, [navigate]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/");
  };
  
  // Handle edit profile
  const handleEditProfile = () => {
    navigate("/create-profile");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-64 bg-muted rounded-xl"></div>
              <div className="h-8 w-1/3 bg-muted rounded"></div>
              <div className="h-4 w-1/2 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded-xl"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header with photos and basic info */}
              <Card>
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <img 
                    src={profile.photos[0]} 
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h1 className="text-3xl font-bold flex items-center">
                      {profile.name}, {profile.age}
                    </h1>
                    <div className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="pt-6">
                  <div className="flex flex-wrap justify-between items-center mb-6">
                    <div className="flex space-x-4 mb-4 sm:mb-0">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{profile.occupation}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{profile.education}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleEditProfile}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="ghost" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList className="w-full max-w-md grid grid-cols-3">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="photos">Photos</TabsTrigger>
                      <TabsTrigger value="stats">Stats</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="pt-4 space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">About Me</h3>
                        <p className="text-muted-foreground">{profile.bio}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest) => (
                            <Badge key={interest} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="photos" className="pt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {profile.photos.map((photo, index) => (
                          <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                            <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="stats" className="pt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <Heart className="h-8 w-8 text-love-500" fill="#FF5384" />
                          </div>
                          <div className="text-2xl font-bold">{stats.likes}</div>
                          <div className="text-sm text-muted-foreground">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <svg className="h-8 w-8 text-love-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 9L19 4M19 4H15M19 4V8M10 15L5 20M5 20H9M5 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="text-2xl font-bold">{stats.matches}</div>
                          <div className="text-sm text-muted-foreground">Matches</div>
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <svg className="h-8 w-8 text-love-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.08 19.661 7.8 19.064L3 20L4.3 15.5C3.5 14.5 3 13.3 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="text-2xl font-bold">{stats.conversations}</div>
                          <div className="text-sm text-muted-foreground">Conversations</div>
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <svg className="h-8 w-8 text-love-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.45825 12.9584C3.73253 9.16184 7.52281 6.5 12.0004 6.5C16.4781 6.5 20.2684 9.16184 21.5426 12.9584" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="text-2xl font-bold">{stats.profileViews}</div>
                          <div className="text-sm text-muted-foreground">Profile Views</div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
