
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, User, MessageSquare, Shield, HelpCircle, Users, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    profile: {
      name: "Martha Johnson",
      email: "martha.j@example.com",
      phone: "(555) 123-4567",
      address: "123 Maple Street, Anytown, USA 12345",
      emergencyContact: "Sarah Johnson - (555) 987-6543"
    },
    notifications: {
      medicationReminders: true,
      appointmentAlerts: true,
      healthMetricsAlerts: true,
      socialInvitations: true,
      caregiverUpdates: true,
      systemAnnouncements: false
    },
    privacy: {
      shareHealthData: true,
      shareLocationWithCaregivers: true,
      enableVoiceAssistant: true,
      allowAutomaticDataCollection: false,
      receivePersonalizedContent: true
    },
    accessibility: {
      fontSize: "medium",
      highContrast: false,
      reduceMotion: true,
      enableVoiceControl: true,
      screenReader: false
    }
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleNotificationChange = (key: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key as keyof typeof settings.notifications]
      }
    });
  };

  const handlePrivacyChange = (key: string) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key as keyof typeof settings.privacy]
      }
    });
  };

  const handleAccessibilityChange = (key: string) => {
    if (key === "fontSize") return; // Handle separately for select input
    
    setSettings({
      ...settings,
      accessibility: {
        ...settings.accessibility,
        [key]: !settings.accessibility[key as keyof typeof settings.accessibility]
      }
    });
  };

  const handleFontSizeChange = (size: string) => {
    setSettings({
      ...settings,
      accessibility: {
        ...settings.accessibility,
        fontSize: size
      }
    });
  };

  return (
    <Layout>
      <div className="dashboard-section p-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="account" className="flex items-center text-base py-2 px-4">
              <User className="h-4 w-4 mr-2" /> Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center text-base py-2 px-4">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center text-base py-2 px-4">
              <Lock className="h-4 w-4 mr-2" /> Privacy & Security
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center text-base py-2 px-4">
              <SettingsIcon className="h-4 w-4 mr-2" /> Accessibility
            </TabsTrigger>
            <TabsTrigger value="caregivers" className="flex items-center text-base py-2 px-4">
              <Users className="h-4 w-4 mr-2" /> Caregivers
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center text-base py-2 px-4">
              <HelpCircle className="h-4 w-4 mr-2" /> Help & Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={settings.profile.name} onChange={(e) => setSettings({...settings, profile: {...settings.profile, name: e.target.value}})} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={settings.profile.email} onChange={(e) => setSettings({...settings, profile: {...settings.profile, email: e.target.value}})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={settings.profile.phone} onChange={(e) => setSettings({...settings, profile: {...settings.profile, phone: e.target.value}})} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input id="emergency" value={settings.profile.emergencyContact} onChange={(e) => setSettings({...settings, profile: {...settings.profile, emergencyContact: e.target.value}})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Mailing Address</Label>
                      <Input id="address" value={settings.profile.address} onChange={(e) => setSettings({...settings, profile: {...settings.profile, address: e.target.value}})} />
                    </div>
                    
                    <Button type="button" onClick={handleProfileUpdate}>Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <div className="text-2xl">MJ</div>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-1">{settings.profile.name}</h2>
                  <p className="text-muted-foreground mb-3">{settings.profile.email}</p>
                  <div className="flex flex-col gap-2 w-full mt-4">
                    <Button variant="outline" className="w-full">
                      Change Avatar
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" /> Change Password
                    </Button>
                  </div>
                  
                  <div className="w-full mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-2">Device Settings</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span>Two-Factor Authentication</span>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Medication Reminders</span>
                      <span className="text-sm text-muted-foreground">Get notifications when it's time to take your medications</span>
                    </div>
                    <Switch 
                      checked={settings.notifications.medicationReminders} 
                      onCheckedChange={() => handleNotificationChange('medicationReminders')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Appointment Alerts</span>
                      <span className="text-sm text-muted-foreground">Receive reminders about upcoming medical appointments</span>
                    </div>
                    <Switch 
                      checked={settings.notifications.appointmentAlerts} 
                      onCheckedChange={() => handleNotificationChange('appointmentAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Health Metrics Alerts</span>
                      <span className="text-sm text-muted-foreground">Get notifications for changes in your health metrics</span>
                    </div>
                    <Switch 
                      checked={settings.notifications.healthMetricsAlerts} 
                      onCheckedChange={() => handleNotificationChange('healthMetricsAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Social Invitations</span>
                      <span className="text-sm text-muted-foreground">Notifications for social events and activities</span>
                    </div>
                    <Switch 
                      checked={settings.notifications.socialInvitations} 
                      onCheckedChange={() => handleNotificationChange('socialInvitations')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Caregiver Updates</span>
                      <span className="text-sm text-muted-foreground">Notifications when caregivers add notes or updates</span>
                    </div>
                    <Switch 
                      checked={settings.notifications.caregiverUpdates} 
                      onCheckedChange={() => handleNotificationChange('caregiverUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">System Announcements</span>
                      <span className="text-sm text-muted-foreground">Updates about the Evergreen Care system</span>
                    </div>
                    <Switch 
                      checked={settings.notifications.systemAnnouncements} 
                      onCheckedChange={() => handleNotificationChange('systemAnnouncements')}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline">
                    Test Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security Settings</CardTitle>
                <CardDescription>Manage how your data is used and who can access it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Share Health Data with Caregivers</span>
                      <span className="text-sm text-muted-foreground">Allow your caregivers to view your health metrics and medication history</span>
                    </div>
                    <Switch 
                      checked={settings.privacy.shareHealthData} 
                      onCheckedChange={() => handlePrivacyChange('shareHealthData')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Share Location with Caregivers</span>
                      <span className="text-sm text-muted-foreground">Allow caregivers to see your current location for safety purposes</span>
                    </div>
                    <Switch 
                      checked={settings.privacy.shareLocationWithCaregivers} 
                      onCheckedChange={() => handlePrivacyChange('shareLocationWithCaregivers')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Enable Voice Assistant</span>
                      <span className="text-sm text-muted-foreground">Allow the voice assistant to listen and respond to your commands</span>
                    </div>
                    <Switch 
                      checked={settings.privacy.enableVoiceAssistant} 
                      onCheckedChange={() => handlePrivacyChange('enableVoiceAssistant')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Allow Automatic Data Collection</span>
                      <span className="text-sm text-muted-foreground">Allow the system to automatically collect usage data for improvements</span>
                    </div>
                    <Switch 
                      checked={settings.privacy.allowAutomaticDataCollection} 
                      onCheckedChange={() => handlePrivacyChange('allowAutomaticDataCollection')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Receive Personalized Content</span>
                      <span className="text-sm text-muted-foreground">Allow the system to suggest personalized content based on your activity</span>
                    </div>
                    <Switch 
                      checked={settings.privacy.receivePersonalizedContent} 
                      onCheckedChange={() => handlePrivacyChange('receivePersonalizedContent')}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium">Security Options</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <Lock className="h-4 w-4 mr-2" /> Change Password
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Shield className="h-4 w-4 mr-2" /> Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Users className="h-4 w-4 mr-2" /> Manage Authorized Caregivers
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" className="text-destructive">
                    Delete My Account and Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>Customize your experience to make the app more accessible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Text Size</Label>
                      <select 
                        id="font-size" 
                        className="w-full p-2 rounded-md border"
                        value={settings.accessibility.fontSize}
                        onChange={(e) => handleFontSizeChange(e.target.value)}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium (Default)</option>
                        <option value="large">Large</option>
                        <option value="x-large">Extra Large</option>
                      </select>
                      <p className="text-sm text-muted-foreground">Adjust the size of text throughout the application</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">High Contrast Mode</span>
                      <span className="text-sm text-muted-foreground">Increase contrast for better readability</span>
                    </div>
                    <Switch 
                      checked={settings.accessibility.highContrast} 
                      onCheckedChange={() => handleAccessibilityChange('highContrast')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Reduce Motion</span>
                      <span className="text-sm text-muted-foreground">Minimize animations throughout the interface</span>
                    </div>
                    <Switch 
                      checked={settings.accessibility.reduceMotion} 
                      onCheckedChange={() => handleAccessibilityChange('reduceMotion')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Voice Control</span>
                      <span className="text-sm text-muted-foreground">Enable navigation and control using voice commands</span>
                    </div>
                    <Switch 
                      checked={settings.accessibility.enableVoiceControl} 
                      onCheckedChange={() => handleAccessibilityChange('enableVoiceControl')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Screen Reader Support</span>
                      <span className="text-sm text-muted-foreground">Optimize interface for screen readers</span>
                    </div>
                    <Switch 
                      checked={settings.accessibility.screenReader} 
                      onCheckedChange={() => handleAccessibilityChange('screenReader')}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button onClick={() => {
                    toast({
                      title: "Accessibility settings saved",
                      description: "Your accessibility preferences have been updated."
                    });
                  }}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="caregivers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Caregiver Access</CardTitle>
                  <CardDescription>Manage who has access to your care information</CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" /> Add Caregiver
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <div>S</div>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Sarah Johnson (Primary)</h3>
                          <p className="text-sm text-muted-foreground">Daughter • sarah.j@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Full Access</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <div>M</div>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Michael Johnson</h3>
                          <p className="text-sm text-muted-foreground">Son • michael.j@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Limited Access</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <div>D</div>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Dr. Williams</h3>
                          <p className="text-sm text-muted-foreground">Primary Physician • dr.williams@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Medical Only</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-4">Access Levels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>Full Access</Badge>
                      <span className="text-sm">Can view and modify all information, receive all alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Limited Access</Badge>
                      <span className="text-sm">Can view basic information, receive emergency alerts only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Medical Only</Badge>
                      <span className="text-sm">Access to health metrics and medication information only</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                  <CardDescription>Get help with using Evergreen Care Compass</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
                    <p className="text-muted-foreground mb-3">Find answers to common questions about using the app.</p>
                    <Button variant="outline">View FAQs</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
                    <p className="text-muted-foreground mb-3">Watch step-by-step guides on using key features.</p>
                    <Button variant="outline">Watch Tutorials</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">User Guide</h3>
                    <p className="text-muted-foreground mb-3">Comprehensive documentation on all app features.</p>
                    <Button variant="outline">Read User Guide</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center p-4 border rounded-lg">
                    <MessageSquare className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Chat Support</h3>
                      <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
                      <Button className="mt-2" variant="outline">Start Chat</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Send a Message</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="support-subject">Subject</Label>
                        <Input id="support-subject" placeholder="What do you need help with?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-message">Message</Label>
                        <textarea 
                          id="support-message" 
                          rows={4} 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Describe your issue in detail..."
                        />
                      </div>
                      <Button onClick={() => {
                        toast({
                          title: "Support request sent",
                          description: "We'll get back to you as soon as possible."
                        });
                      }}>
                        Send Message
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Support Hotline</h3>
                    <p className="text-muted-foreground">
                      Call us directly at <span className="font-medium">(800) 123-4567</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm EST</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
