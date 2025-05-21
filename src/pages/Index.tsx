
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthModal } from "@/components/AuthModal";
import { Heart, Search, MessageSquare } from "lucide-react";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");
  const navigate = useNavigate();

  const openAuthModal = (tab: "login" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-love-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-love-700 to-secondary bg-clip-text text-transparent animate-slide-up">
                Find Your Perfect Match
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:pr-12 animate-slide-up" style={{animationDelay: '0.1s'}}>
                Discover meaningful connections with people who share your interests, values, and desires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Button 
                  size="lg" 
                  className="bg-love-500 hover:bg-love-600 text-white shadow-lg"
                  onClick={() => openAuthModal("signup")}
                >
                  Get Started Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-love-500 text-love-500 hover:bg-love-100"
                  onClick={() => openAuthModal("login")}
                >
                  Log In
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 relative animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-love-300 rounded-full opacity-30 animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-secondary rounded-full opacity-20 animate-pulse-slow"></div>
                
                <img 
                  src="https://placehold.co/800x1000" 
                  alt="Dating app illustration" 
                  className="relative z-10 mx-auto w-full max-w-md rounded-2xl shadow-xl"
                />
                
                {/* Floating elements */}
                <div className="absolute top-10 -left-5 animate-float" style={{animationDelay: '0.5s'}}>
                  <Heart className="h-12 w-12 text-love-500" fill="#FF5384" />
                </div>
                <div className="absolute bottom-20 right-0 animate-float" style={{animationDelay: '1s'}}>
                  <MessageSquare className="h-10 w-10 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="bg-white border border-muted shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-10 pb-6 px-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-love-100 flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-love-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Tell us about yourself, your interests, and what you're looking for in a partner.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-muted shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-10 pb-6 px-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-love-100 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-love-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Discover Matches</h3>
                <p className="text-muted-foreground">
                  Browse through potential matches and connect with people you're interested in.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-muted shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-10 pb-6 px-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-love-100 flex items-center justify-center mb-6">
                  <MessageSquare className="h-8 w-8 text-love-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Start Conversations</h3>
                <p className="text-muted-foreground">
                  Connect through our messaging platform and get to know each other better.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-love-500 hover:bg-love-600 shadow-md"
              onClick={() => openAuthModal("signup")}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-love-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-love-100 flex items-center justify-center mr-4">
                  <span className="text-love-500 font-bold">S</span>
                </div>
                <div>
                  <h3 className="font-bold">Sarah & Mike</h3>
                  <p className="text-sm text-muted-foreground">Together for 2 years</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "We matched on LoveFind and instantly connected over our shared love for hiking. 
                Two years later, we're engaged and planning our mountain-top wedding!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-love-100 flex items-center justify-center mr-4">
                  <span className="text-love-500 font-bold">J</span>
                </div>
                <div>
                  <h3 className="font-bold">James & David</h3>
                  <p className="text-sm text-muted-foreground">Together for 1 year</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I was about to give up on dating apps when I matched with David. His profile really 
                stood out and we had the most amazing first date. The rest is history!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-love-100 flex items-center justify-center mr-4">
                  <span className="text-love-500 font-bold">M</span>
                </div>
                <div>
                  <h3 className="font-bold">Maria & Alex</h3>
                  <p className="text-sm text-muted-foreground">Together for 3 years</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "We both had specific interests that made it hard to find partners who understood us. 
                LoveFind's matching algorithm brought us together, and we've been inseparable ever since."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-love-600 to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of singles who have found meaningful connections on LoveFind.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-love-600 hover:bg-white/90 shadow-lg"
            onClick={() => openAuthModal("signup")}
          >
            Create Your Free Profile
          </Button>
        </div>
      </section>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Index;
