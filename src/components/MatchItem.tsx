
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export interface MatchItemProps {
  id: string;
  name: string;
  avatar?: string;
  matchDate: Date;
  onMessage?: (id: string) => void;
}

export function MatchItem({
  id,
  name,
  avatar,
  matchDate,
  onMessage,
}: MatchItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMessage = () => {
    if (onMessage) onMessage(id);
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(matchDate);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/conversation/${id}`}>
        <div className="relative rounded-lg overflow-hidden h-40 w-32 bg-muted transition-transform duration-200 group-hover:scale-105">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-love-100 text-love-500 text-xl">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-sm font-medium truncate">{name}</p>
            <p className="text-white/70 text-xs">{formattedDate}</p>
          </div>
          
          {/* Overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-love-500/30 flex items-center justify-center">
              <Button 
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleMessage();
                }}
                className="bg-white text-love-500 hover:bg-white/90"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
