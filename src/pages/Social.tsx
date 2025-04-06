
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Video, Calendar, BookOpen, MessageSquare, Activity, Music, Bird, Coffee } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample social data
const upcomingEvents = [
  { 
    id: 1, 
    title: "Virtual Book Club", 
    type: "Online", 
    date: "Today, 3:00 PM", 
    participants: 8,
    icon: BookOpen,
  },
  { 
    id: 2, 
    title: "Family Check-in", 
    type: "Video Call", 
    date: "Tomorrow, 11:00 AM", 
    participants: 4,
    icon: Video,
  },
  { 
    id: 3, 
    title: "Community Exercise Class", 
    type: "Online", 
    date: "Jun 10, 2:00 PM", 
    participants: 12,
    icon: Activity,
  },
  { 
    id: 4, 
    title: "Music Appreciation Group", 
    type: "Online", 
    date: "Jun 12, 1:00 PM", 
    participants: 15,
    icon: Music,
  },
];

const contactGroups = [
  {
    id: 1,
    name: "Family",
    members: [
      { id: 1, name: "Sarah (Daughter)", avatar: "S", lastContact: "Yesterday" },
      { id: 2, name: "Michael (Son)", avatar: "M", lastContact: "3 days ago" },
      { id: 3, name: "Emma (Granddaughter)", avatar: "E", lastContact: "1 week ago" },
      { id: 4, name: "Robert (Son-in-law)", avatar: "R", lastContact: "1 week ago" },
    ]
  },
  {
    id: 2,
    name: "Friends",
    members: [
      { id: 5, name: "Judy Miller", avatar: "J", lastContact: "2 days ago" },
      { id: 6, name: "Tom Williams", avatar: "T", lastContact: "5 days ago" },
      { id: 7, name: "Helen Garcia", avatar: "H", lastContact: "1 week ago" },
      { id: 8, name: "George Smith", avatar: "G", lastContact: "2 weeks ago" },
    ]
  },
  {
    id: 3,
    name: "Healthcare",
    members: [
      { id: 9, name: "Dr. Johnson", avatar: "D", lastContact: "2 weeks ago" },
      { id: 10, name: "Nurse Wilson", avatar: "N", lastContact: "1 month ago" },
    ]
  },
];

const suggestedActivities = [
  {
    id: 1,
    title: "Bird Watching Club",
    description: "Join other nature enthusiasts in virtual bird spotting sessions",
    participants: 32,
    icon: Bird,
  },
  {
    id: 2,
    title: "Coffee & Conversations",
    description: "Weekly casual chats about books, movies, and current events",
    participants: 45,
    icon: Coffee,
  },
  {
    id: 3,
    title: "Beginner's Yoga",
    description: "Gentle yoga sessions designed for seniors with modifications",
    participants: 28,
    icon: Activity,
  },
];

const Social = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout>
      <div className="dashboard-section p-6">
        <h1 className="text-3xl font-bold mb-8">Social Engagement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Start Video Call</h3>
              <p className="text-muted-foreground mb-4">Connect with family and friends with a video call</p>
              <Button size="lg" className="w-full">
                Start Call
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Join Activity</h3>
              <p className="text-muted-foreground mb-4">Participate in community events and activities</p>
              <Button size="lg" variant="outline" className="w-full">
                Browse Activities
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Send Message</h3>
              <p className="text-muted-foreground mb-4">Send a message to your contacts or care team</p>
              <Button size="lg" variant="outline" className="w-full">
                New Message
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="upcoming" className="text-lg py-2 px-4">Upcoming Events</TabsTrigger>
            <TabsTrigger value="contacts" className="text-lg py-2 px-4">My Contacts</TabsTrigger>
            <TabsTrigger value="suggestions" className="text-lg py-2 px-4">Suggested Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <event.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.type}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {event.participants} participants
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full">
                      Join Event
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="contacts">
            <div className="space-y-8">
              {contactGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      {group.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {group.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 bg-primary/10 text-primary">
                              <div>{member.avatar}</div>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">Last contact: {member.lastContact}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Video className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Add Contact
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedActivities.map((activity) => (
                <Card key={activity.id} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{activity.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {activity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{activity.participants} members</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">More Info</Button>
                    <Button>Join Group</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Social Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-4 border rounded-lg">
                <Avatar className="h-10 w-10 mr-4">
                  <div>S</div>
                </Avatar>
                <div>
                  <div className="font-medium">Sarah shared family photos</div>
                  <p className="text-sm text-muted-foreground">Yesterday at 4:30 PM</p>
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p>Mom, I've uploaded new pictures from Emma's graduation. Check them out when you have time!</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start p-4 border rounded-lg">
                <Avatar className="h-10 w-10 mr-4">
                  <div>B</div>
                </Avatar>
                <div>
                  <div className="font-medium">Book Club Discussion</div>
                  <p className="text-sm text-muted-foreground">2 days ago at 3:15 PM</p>
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p>Thank you Martha for your insightful comments during our last book discussion. Looking forward to seeing you again next week!</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start p-4 border rounded-lg">
                <Avatar className="h-10 w-10 mr-4">
                  <div>J</div>
                </Avatar>
                <div>
                  <div className="font-medium">Judy sent you a message</div>
                  <p className="text-sm text-muted-foreground">3 days ago at 11:20 AM</p>
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p>Are we still meeting for coffee on Thursday? Let me know if that still works for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Social;
