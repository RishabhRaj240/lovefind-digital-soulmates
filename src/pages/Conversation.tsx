
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Message, MessageProps } from "@/components/Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  messages: MessageProps[];
}

const Conversation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Mock authentication check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    
    // Simulate loading conversation data
    setIsLoading(true);
    setTimeout(() => {
      // Mock conversation data based on ID
      const mockConversation: Conversation = {
        id: id || "unknown",
        name: id === "101" ? "Jessica" : id === "102" ? "Olivia" : id === "103" ? "Sophia" : "Unknown",
        avatar: "https://placehold.co/400x400",
        messages: [
          {
            content: "Hey there! I saw that we both like hiking. Have you been on any good trails lately?",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            isOutgoing: false,
            senderName: "Jessica",
            status: "read",
          },
          {
            content: "Hi Jessica! Yes, I went to Bear Mountain last weekend. It was beautiful this time of year with all the fall colors. Do you have any favorite trails?",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
            isOutgoing: true,
            status: "read",
          },
          {
            content: "Bear Mountain is great! I love Breakneck Ridge, although it's a bit challenging. Would you be interested in going hiking sometime?",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            isOutgoing: false,
            senderName: "Jessica",
            status: "read",
          },
          {
            content: "I'd love to! Breakneck Ridge has been on my list for a while. How about next Saturday if the weather is good?",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000), // 15 minutes later
            isOutgoing: true,
            status: "read",
          },
          {
            content: "Saturday sounds perfect! Should we meet there or would you like to carpool?",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            isOutgoing: false,
            senderName: "Jessica",
            status: "read",
          },
          {
            content: "Let's carpool, it's better for the environment. I can pick you up if that works for you?",
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
            isOutgoing: true,
            status: "read",
          },
          {
            content: "That would be great! I'll send you my address. I'm looking forward to it! 😊",
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            isOutgoing: false,
            senderName: "Jessica",
            status: "read",
          },
        ],
      };
      
      setConversation(mockConversation);
      setIsLoading(false);
    }, 1000);
  }, [id, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (messageInput.trim() === "" || !conversation) return;
    
    const newMessage: MessageProps = {
      content: messageInput,
      timestamp: new Date(),
      isOutgoing: true,
      status: "sending",
    };
    
    // Update conversation with new message
    setConversation({
      ...conversation,
      messages: [...conversation.messages, newMessage],
    });
    
    setMessageInput("");
    
    // Simulate message being sent and delivered
    setTimeout(() => {
      setConversation(prevConversation => {
        if (!prevConversation) return null;
        
        const updatedMessages = prevConversation.messages.map((msg, i) => {
          if (i === prevConversation.messages.length - 1) {
            return { ...msg, status: "sent" };
          }
          return msg;
        });
        
        return { ...prevConversation, messages: updatedMessages };
      });
    }, 1000);
    
    setTimeout(() => {
      setConversation(prevConversation => {
        if (!prevConversation) return null;
        
        const updatedMessages = prevConversation.messages.map((msg, i) => {
          if (i === prevConversation.messages.length - 1) {
            return { ...msg, status: "delivered" };
          }
          return msg;
        });
        
        return { ...prevConversation, messages: updatedMessages };
      });
    }, 2000);
    
    // Simulate a reply after a short delay for demo purposes
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const replies = [
          "That sounds great!",
          "I'm looking forward to meeting you!",
          "What are your plans for the weekend?",
          "Have you tried that new restaurant downtown?",
          "What kind of movies do you enjoy?",
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        if (conversation) {
          const reply: MessageProps = {
            content: randomReply,
            timestamp: new Date(),
            isOutgoing: false,
            senderName: conversation.name,
            senderAvatar: conversation.avatar,
          };
          
          setConversation(prevConversation => {
            if (!prevConversation) return null;
            
            // Update previous message to "read"
            const updatedMessages = prevConversation.messages.map((msg, i) => {
              if (i === prevConversation.messages.length - 1) {
                return { ...msg, status: "read" };
              }
              return msg;
            });
            
            return {
              ...prevConversation,
              messages: [...updatedMessages, reply],
            };
          });
        }
      }, 6000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-background rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-13rem)]">
            {/* Conversation header */}
            {isLoading ? (
              <div className="flex items-center gap-3 p-4 border-b animate-pulse">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="h-5 w-32 bg-muted rounded"></div>
              </div>
            ) : conversation ? (
              <div className="flex items-center gap-3 p-4 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback className="bg-love-100 text-love-500">
                    {conversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{conversation.name}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 border-b">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="h-5 w-32 bg-muted rounded"></div>
              </div>
            )}
            
            {/* Messages area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-2 animate-pulse">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div className="w-2/3">
                      <div className="h-20 bg-muted rounded-2xl"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-end animate-pulse">
                    <div className="w-2/3">
                      <div className="h-12 bg-muted rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              ) : conversation ? (
                conversation.messages.map((message, index) => (
                  <Message key={index} {...message} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  Conversation not found
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t">
              <form 
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input 
                  placeholder="Type a message..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  type="submit"
                  className="bg-love-500 hover:bg-love-600"
                  disabled={isLoading || !conversation}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Conversation;
