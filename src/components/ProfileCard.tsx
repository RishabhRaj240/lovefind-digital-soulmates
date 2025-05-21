
import { Heart, X, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  images: string[];
  interests: string[];
  onLike?: (id: string) => void;
  onPass?: (id: string) => void;
  onMessage?: (id: string) => void;
}

export function ProfileCard({
  id,
  name,
  age,
  location,
  bio,
  images,
  interests,
  onLike,
  onPass,
  onMessage
}: ProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  const handleLike = () => {
    if (onLike) onLike(id);
  };
  
  const handlePass = () => {
    if (onPass) onPass(id);
  };
  
  const handleMessage = () => {
    if (onMessage) onMessage(id);
  };

  return (
    <Card className="swipe-card w-full max-w-md mx-auto bg-card">
      <div className="relative">
        {/* Images */}
        <div className="relative h-96 w-full overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={`${name}'s photo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <User className="h-20 w-20 text-muted-foreground" />
            </div>
          )}
          
          {/* Image navigation dots */}
          {images.length > 1 && (
            <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 p-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full ${
                    index === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/60"
                  }`}
                ></div>
              ))}
            </div>
          )}
          
          {/* Image navigation areas */}
          {images.length > 1 && (
            <>
              <div
                className="absolute top-0 left-0 w-1/4 h-full cursor-pointer"
                onClick={prevImage}
              ></div>
              <div
                className="absolute top-0 right-0 w-1/4 h-full cursor-pointer"
                onClick={nextImage}
              ></div>
            </>
          )}
        </div>
        
        {/* Basic info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">{name}, {age}</h3>
          </div>
          <p className="text-sm">{location}</p>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h4 className="font-medium mb-2">About</h4>
          <p className="text-sm text-muted-foreground">{bio}</p>
        </div>
        
        {interests.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-14 w-14 rounded-full border-2 border-muted hover:border-red-500 hover:text-red-500 hover:bg-red-50"
            onClick={handlePass}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button 
            className="h-16 w-16 rounded-full bg-love-500 hover:bg-love-600"
            onClick={handleLike}
          >
            <Heart className="h-8 w-8" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-14 w-14 rounded-full border-2 border-muted hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50"
            onClick={handleMessage}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
