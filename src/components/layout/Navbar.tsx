
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-love-500 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-love-500 to-secondary bg-clip-text text-transparent">LoveFind</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-foreground/70 hover:text-love-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Find Matches
                  </Link>
                  <Link to="/messages" className="text-foreground/70 hover:text-love-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Messages
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost" className="rounded-full hover:bg-love-100 hover:text-love-500">
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="rounded-full hover:bg-love-100 hover:text-love-500"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <a href="#how-it-works" className="text-foreground/70 hover:text-love-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    How It Works
                  </a>
                  <a href="#testimonials" className="text-foreground/70 hover:text-love-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Success Stories
                  </a>
                  <Link to="/auth">
                    <Button variant="ghost">Log In</Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-love-500 hover:bg-love-600">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
