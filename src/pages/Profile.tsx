
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save, UserRound } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: "Martha Johnson",
    age: "78",
    address: "123 Maple Avenue, Springfield, IL",
    emergencyContact: "Sarah Johnson (Daughter) - (555) 123-4567",
    medicalInfo: "Type 2 Diabetes, Hypertension, Arthritis",
    preferences: "Prefers to be called 'Martha'. Enjoys reading and gardening. Allergic to penicillin."
  });
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully"
    });
  };
  
  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <Layout>
      <div className="dashboard-section">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <Avatar className="w-32 h-32 border-4 border-primary">
                    <AvatarImage src="/profile-image.jpg" alt="Martha Johnson" />
                    <AvatarFallback className="text-4xl">MJ</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full" 
                    variant="outline"
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                <p className="text-muted-foreground text-lg mb-6">{profile.age} years old</p>
                
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full text-lg"
                  variant={isEditing ? "outline" : "default"}
                >
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profile.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          disabled={!isEditing}
                          className="h-12 text-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-base">Age</Label>
                        <Input 
                          id="age" 
                          value={profile.age}
                          onChange={(e) => handleChange("age", e.target.value)}
                          disabled={!isEditing}
                          className="h-12 text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-base">Address</Label>
                      <Input 
                        id="address" 
                        value={profile.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        disabled={!isEditing}
                        className="h-12 text-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergency" className="text-base">Emergency Contact</Label>
                      <Input 
                        id="emergency" 
                        value={profile.emergencyContact}
                        onChange={(e) => handleChange("emergencyContact", e.target.value)}
                        disabled={!isEditing}
                        className="h-12 text-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medical" className="text-base">Medical Information</Label>
                      <Textarea 
                        id="medical" 
                        value={profile.medicalInfo}
                        onChange={(e) => handleChange("medicalInfo", e.target.value)}
                        disabled={!isEditing}
                        className="text-lg min-h-[80px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferences" className="text-base">Preferences & Notes</Label>
                      <Textarea 
                        id="preferences" 
                        value={profile.preferences}
                        onChange={(e) => handleChange("preferences", e.target.value)}
                        disabled={!isEditing}
                        className="text-lg min-h-[120px]"
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <Button 
                      onClick={handleSave} 
                      className="w-full h-12 text-lg font-medium"
                      type="button"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
