
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface MessagePreviewProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  isActive?: boolean;
}

export function MessagePreview({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unread,
  isActive = false
}: MessagePreviewProps) {
  return (
    <Link
      to={`/conversation/${id}`}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg transition-colors",
        isActive ? "bg-accent" : "hover:bg-accent"
      )}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-love-100 text-love-500">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={cn("font-medium text-sm", unread && "font-bold")}>
            {name}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className={cn(
          "text-sm truncate text-muted-foreground",
          unread && "font-medium text-foreground"
        )}>
          {lastMessage}
        </p>
      </div>
      
      {unread && (
        <span className="h-2.5 w-2.5 rounded-full bg-love-500 flex-shrink-0" />
      )}
    </Link>
  );
}
