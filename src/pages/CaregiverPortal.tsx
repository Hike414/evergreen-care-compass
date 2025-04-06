
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Pill, AlertTriangle, MessageSquare, Calendar, BarChart4, Users, Settings, BellRing } from "lucide-react";

// Sample data for patients
const patients = [
  {
    id: 1,
    name: "Martha Johnson",
    age: 78,
    avatar: "MJ",
    lastChecked: "30 min ago",
    status: "normal",
    alerts: 0,
  },
  {
    id: 2,
    name: "Robert Smith",
    age: 82,
    avatar: "RS",
    lastChecked: "2 hrs ago",
    status: "alert",
    alerts: 2,
  },
  {
    id: 3,
    name: "Helen Williams",
    age: 75,
    avatar: "HW",
    lastChecked: "1 hr ago",
    status: "caution",
    alerts: 1,
  },
  {
    id: 4,
    name: "Thomas Brown",
    age: 80,
    avatar: "TB",
    lastChecked: "3 hrs ago",
    status: "normal",
    alerts: 0,
  },
];

// Sample data for recent alerts
const recentAlerts = [
  {
    id: 1,
    patientName: "Robert Smith",
    type: "Medication",
    message: "Missed morning medication",
    time: "2 hours ago",
    severity: "high",
  },
  {
    id: 2,
    patientName: "Robert Smith",
    type: "Activity",
    message: "Unusual inactivity detected",
    time: "3 hours ago",
    severity: "high",
  },
  {
    id: 3,
    patientName: "Helen Williams",
    type: "Health",
    message: "Blood pressure reading above normal",
    time: "1 hour ago",
    severity: "medium",
  },
];

// Sample data for upcoming tasks
const upcomingTasks = [
  {
    id: 1,
    task: "Medication Review - Robert Smith",
    time: "Today, 2:00 PM",
    completed: false,
  },
  {
    id: 2,
    task: "Virtual Check-in - Martha Johnson",
    time: "Today, 3:30 PM",
    completed: false,
  },
  {
    id: 3,
    task: "Health Report Update - Helen Williams",
    time: "Today, 5:00 PM",
    completed: false,
  },
  {
    id: 4,
    task: "Family Consultation - Thomas Brown",
    time: "Tomorrow, 10:00 AM",
    completed: false,
  },
];

const CaregiverPortal = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <Layout>
      <div className="dashboard-section p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Caregiver Portal</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your patients' health and wellness
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button size="sm">
              <Users className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Patient Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground mt-1">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{recentAlerts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">2 high priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingTasks.filter(task => task.time.includes("Today")).length}</div>
              <p className="text-xs text-muted-foreground mt-1">0 completed, 3 pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Health Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-xs text-muted-foreground mt-1">No critical events in last 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients List Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Your Patients</CardTitle>
              <CardDescription>
                Select a patient to view their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div 
                    key={patient.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border ${
                      selectedPatient.id === patient.id ? 'bg-accent border-primary' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`/avatars/${patient.id}.jpg`} alt={patient.name} />
                      <AvatarFallback>{patient.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Age: {patient.age} • Last check: {patient.lastChecked}
                      </p>
                    </div>
                    {patient.alerts > 0 && (
                      <Badge variant="destructive">{patient.alerts}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={`/avatars/${selectedPatient.id}.jpg`} alt={selectedPatient.name} />
                    <AvatarFallback>{selectedPatient.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{selectedPatient.name}</CardTitle>
                    <CardDescription>
                      Age: {selectedPatient.age} • Status: {selectedPatient.status === "normal" ? 
                        <span className="text-green-600">Normal</span> : 
                        selectedPatient.status === "caution" ? 
                        <span className="text-amber-600">Caution</span> : 
                        <span className="text-red-600">Alert</span>}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm">View Profile</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full"
                onValueChange={(value) => setSelectedTab(value)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center">
                        <HeartPulse className="h-5 w-5 text-rose-500 mr-2" />
                        <h3 className="font-medium">Vital Signs</h3>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Heart Rate</span>
                            <span className="font-medium">76 BPM</span>
                          </div>
                          <Progress value={76} className="h-1.5 mt-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Blood Pressure</span>
                            <span className="font-medium">125/82 mmHg</span>
                          </div>
                          <Progress value={70} className="h-1.5 mt-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Oxygen Saturation</span>
                            <span className="font-medium">98%</span>
                          </div>
                          <Progress value={98} className="h-1.5 mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Pill className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="font-medium">Medication Adherence</h3>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm">
                          <span>Weekly Adherence</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2 mt-1" />
                        <div className="mt-4 text-sm">
                          <div className="flex items-center text-green-600">
                            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                            <span>19 doses taken</span>
                          </div>
                          <div className="flex items-center text-amber-600 mt-1">
                            <div className="w-3 h-3 rounded-full bg-amber-600 mr-2"></div>
                            <span>1 dose late</span>
                          </div>
                          <div className="flex items-center text-red-600 mt-1">
                            <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                            <span>1 dose missed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      <h3 className="font-medium">Recent Alerts</h3>
                    </div>
                    
                    {selectedPatient.alerts > 0 ? (
                      <div className="mt-3 space-y-3">
                        {recentAlerts
                          .filter(alert => alert.patientName === selectedPatient.name)
                          .map(alert => (
                            <div key={alert.id} className="flex items-start p-2 border-b">
                              <div className={`p-1.5 rounded-full mr-3 ${
                                alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                              }`}>
                                <BellRing className={`h-4 w-4 ${
                                  alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{alert.type} Alert</h4>
                                <p className="text-xs text-muted-foreground">{alert.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="ml-auto">
                                Resolve
                              </Button>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground text-sm py-4">
                        No recent alerts for this patient
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="health">
                  <div className="text-center text-muted-foreground py-16">
                    Health metrics and detailed charts would be displayed here
                  </div>
                </TabsContent>
                
                <TabsContent value="medications">
                  <div className="text-center text-muted-foreground py-16">
                    Medication schedule and history would be displayed here
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule">
                  <div className="text-center text-muted-foreground py-16">
                    Appointment calendar and schedule would be displayed here
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Tasks and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{task.task}</h4>
                        <p className="text-xs text-muted-foreground">{task.time}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Complete
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start border-b pb-4">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Martha Johnson</span> completed her morning medication
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start border-b pb-4">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Robert Smith</span> missed his blood pressure check
                    </p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start border-b pb-4">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>HW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Helen Williams</span> completed her physical therapy session
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>TB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Thomas Brown</span> had a video call with his doctor
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View Full Activity Log
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CaregiverPortal;
