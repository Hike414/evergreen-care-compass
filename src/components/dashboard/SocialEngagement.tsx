
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Video, MessageCircle, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample activities data
const activities = [
  { 
    id: 1, 
    title: "Virtual Book Club", 
    time: "Today, 3:00 PM",
    type: "video",
    participants: 8
  },
  { 
    id: 2, 
    title: "Family Check-in", 
    time: "Tomorrow, 11:00 AM",
    type: "video",
    participants: 4
  },
  { 
    id: 3, 
    title: "Friends Chat Group", 
    time: "New messages",
    type: "chat",
    participants: 6
  },
];

export function SocialEngagement() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-accessible-xl">Social Engagement</CardTitle>
        <Button size="sm" className="accessible-btn" variant="outline" aria-label="View calendar">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Calendar</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="p-4 rounded-lg border bg-white dark:bg-card"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  activity.type === "video" ? "bg-skyblue-100 text-skyblue-600" : "bg-evergreen-100 text-evergreen-600"
                )}>
                  {activity.type === "video" ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <MessageCircle className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-medium text-accessible">{activity.title}</h4>
                    <div className="flex items-center mt-1 sm:mt-0">
                      <UsersRound className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">{activity.participants}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                    <Button 
                      size="sm" 
                      variant={activity.type === "video" ? "secondary" : "outline"}
                      className="text-sm"
                    >
                      {activity.type === "video" ? "Join" : "Open"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button className="accessible-btn flex-1 bg-skyblue-500 hover:bg-skyblue-600">
            <Video className="h-5 w-5 mr-2" />
            <span>Start Video Call</span>
          </Button>
          <Button className="accessible-btn flex-1" variant="outline">
            <UsersRound className="h-5 w-5 mr-2" />
            <span>Find Activities</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
