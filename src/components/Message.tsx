
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface MessageProps {
  content: string;
  timestamp: Date;
  isOutgoing: boolean;
  senderName?: string;
  senderAvatar?: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

export function Message({
  content,
  timestamp,
  isOutgoing,
  senderName,
  senderAvatar,
  status = "sent"
}: MessageProps) {
  return (
    <div className={cn(
      "flex gap-2 max-w-[80%]",
      isOutgoing ? "ml-auto flex-row-reverse" : "mr-auto"
    )}>
      {/* Avatar for incoming messages */}
      {!isOutgoing && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src={senderAvatar} alt={senderName || "User"} />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {senderName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div>
        <div className={cn(
          "rounded-2xl p-3",
          isOutgoing 
            ? "bg-love-500 text-white rounded-tr-none" 
            : "bg-muted rounded-tl-none"
        )}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 mt-1 text-xs text-muted-foreground",
          isOutgoing ? "justify-end" : "justify-start"
        )}>
          <span>{formatDistanceToNow(timestamp, { addSuffix: true })}</span>
          
          {isOutgoing && (
            <span className="ml-1">
              {status === "sending" && "•"}
              {status === "sent" && "✓"}
              {status === "delivered" && "✓✓"}
              {status === "read" && (
                <span className="text-love-500">✓✓</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
