
import { useState } from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Upload, X, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  
  // Create form
  const form = useForm({
    defaultValues: {
      name: "",
      gender: "",
      lookingFor: [],
      occupation: "",
      education: "",
      about: "",
    },
  });
  
  // Handle adding a new interest
  const handleAddInterest = () => {
    if (interestInput.trim() !== "" && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };
  
  // Handle removing an interest
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };
  
  // Handle photo upload (mock)
  const handlePhotoUpload = () => {
    // In a real app, this would open a file picker
    // For this demo, we'll add a placeholder
    if (photos.length < 6) {
      setPhotos([...photos, "https://placehold.co/800x1000"]);
      toast.success("Photo uploaded successfully!");
    } else {
      toast.error("You can only upload up to 6 photos.");
    }
  };
  
  // Handle removing a photo
  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  // Handle form submission
  const onSubmit = (data: any) => {
    if (!date) {
      toast.error("Please select your date of birth.");
      return;
    }
    
    if (photos.length === 0) {
      toast.error("Please upload at least one photo.");
      return;
    }
    
    // Combine form data with other state
    const profileData = {
      ...data,
      dateOfBirth: date,
      interests,
      photos,
    };
    
    // In a real app, this would be sent to the server
    console.log("Profile data:", profileData);
    
    // Show success message and navigate to dashboard
    toast.success("Profile created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>
                Tell us about yourself so we can help you find meaningful connections.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="non-binary">Non-binary</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="lookingFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Looking for</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="I'm interested in..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="men">Men</SelectItem>
                              <SelectItem value="women">Women</SelectItem>
                              <SelectItem value="everyone">Everyone</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Photos */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Photos</h3>
                    <FormDescription>
                      Upload up to 6 photos. Your first photo will be your profile picture.
                    </FormDescription>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                          <img
                            src={photo}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => handleRemovePhoto(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      {photos.length < 6 && (
                        <Button
                          variant="outline"
                          className="aspect-[3/4] flex flex-col items-center justify-center border-dashed gap-2"
                          onClick={handlePhotoUpload}
                        >
                          <Upload className="h-8 w-8" />
                          <span>Upload</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* About */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">About You</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input placeholder="What do you do?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Education</FormLabel>
                            <FormControl>
                              <Input placeholder="Your education" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About Me</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell potential matches about yourself, your interests, and what you're looking for..."
                              className="resize-none min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Interests */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Interests</h3>
                    <FormDescription>
                      Add some interests to help us find people with similar tastes.
                    </FormDescription>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="px-3 py-1.5">
                          {interest}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 pl-2"
                            onClick={() => handleRemoveInterest(interest)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        placeholder="Add an interest (e.g. Hiking, Cooking, Movies)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddInterest();
                          }
                        }}
                      />
                      <Button type="button" size="icon" onClick={handleAddInterest}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-love-500 hover:bg-love-600">
                    Complete Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateProfile;
