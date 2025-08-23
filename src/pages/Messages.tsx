
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MessagePreview } from "@/components/MessagePreview";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Messages = () => {
  const { user } = useAuth();
  const { conversations, loading } = useMessages();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter conversations based on search query
  const filteredConversations = searchQuery
    ? conversations.filter(convo => {
        const otherParticipant = convo.participants.find(p => p.user_id !== user?.id);
        const name = `${otherParticipant?.profile.first_name || ''} ${otherParticipant?.profile.last_name || ''}`.trim();
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : conversations;

  return (
    <ProtectedRoute>
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
                {loading ? (
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
                  filteredConversations.map(conversation => {
                    const otherParticipant = conversation.participants.find(p => p.user_id !== user?.id);
                    const name = `${otherParticipant?.profile.first_name || ''} ${otherParticipant?.profile.last_name || ''}`.trim() || 'Anonymous';
                    
                    return (
                      <MessagePreview 
                        key={conversation.id}
                        id={conversation.id}
                        name={name}
                        avatar={otherParticipant?.profile.avatar_url}
                        lastMessage={conversation.last_message?.content || 'No messages yet'}
                        timestamp={conversation.last_message ? new Date(conversation.last_message.created_at) : new Date(conversation.created_at)}
                        unread={false} // TODO: Implement unread message tracking
                      />
                    );
                  })
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
    </ProtectedRoute>
  );
};

export default Messages;
