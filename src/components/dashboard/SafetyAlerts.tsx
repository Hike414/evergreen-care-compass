
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample alerts data
const alerts = [
  { 
    id: 1, 
    title: "Fall Detection", 
    message: "No fall incidents detected in the past 24 hours.", 
    status: "good",
    timestamp: "Today, 10:45 AM"
  },
  { 
    id: 2, 
    title: "Unusual Activity", 
    message: "Movement detected in kitchen during regular sleep hours.", 
    status: "warning",
    timestamp: "Yesterday, 2:30 AM" 
  },
  { 
    id: 3, 
    title: "Motion Sensors", 
    message: "All motion sensors are functioning properly.", 
    status: "good",
    timestamp: "Today, 9:15 AM" 
  },
];

export function SafetyAlerts() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-accessible-xl">Safety & Alerts</CardTitle>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse-soft"></div>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            System Active
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-4 rounded-lg border bg-white dark:bg-card"
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  alert.status === "good" ? "bg-evergreen-100 text-evergreen-600" : 
                  alert.status === "warning" ? "bg-amber-100 text-amber-600" : 
                  "bg-red-100 text-red-600"
                )}>
                  {alert.status === "good" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : alert.status === "warning" ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <Shield className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-accessible">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                  
                  {alert.status === "warning" && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-sm">Ignore</Button>
                      <Button size="sm" variant="secondary" className="text-sm">Check Camera</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" className="text-accessible">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
