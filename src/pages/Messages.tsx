
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MessagePreview, MessagePreviewProps } from "@/components/MessagePreview";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Messages = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState<MessagePreviewProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
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
      // Mock conversations data
      setConversations([
        {
          id: "101",
          name: "Jessica",
          avatar: "https://placehold.co/400x400",
          lastMessage: "I'd love to meet for coffee sometime this week!",
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          unread: true,
        },
        {
          id: "102",
          name: "Olivia",
          avatar: "https://placehold.co/400x400",
          lastMessage: "That sounds like a great plan. Let me know when you're free!",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          unread: false,
        },
        {
          id: "103",
          name: "Sophia",
          avatar: "https://placehold.co/400x400",
          lastMessage: "I love that restaurant too! It's one of my favorites.",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          unread: false,
        },
        {
          id: "104",
          name: "Ava",
          avatar: "https://placehold.co/400x400",
          lastMessage: "Thanks for the movie recommendation! I'll definitely watch it this weekend.",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          unread: false,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);
  
  // Filter conversations based on search query
  const filteredConversations = searchQuery
    ? conversations.filter(convo => 
        convo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-background rounded-xl shadow-sm overflow-hidden">
            {/* Search header */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Conversation list */}
            <div className="divide-y">
              {isLoading ? (
                // Loading skeleton
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                      <div className="h-3 w-40 bg-muted rounded animate-pulse mt-2"></div>
                    </div>
                  </div>
                ))
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => (
                  <MessagePreview key={conversation.id} {...conversation} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No conversations match your search" : "No messages yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
