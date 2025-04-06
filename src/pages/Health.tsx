
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Activity, MoveHorizontal, Brain, ScrollText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample health data
const healthData = [
  { date: 'Jun 1', heartRate: 72, bloodPressure: 120, spo2: 98, sleep: 7.2 },
  { date: 'Jun 2', heartRate: 75, bloodPressure: 125, spo2: 97, sleep: 6.8 },
  { date: 'Jun 3', heartRate: 78, bloodPressure: 130, spo2: 98, sleep: 7.5 },
  { date: 'Jun 4', heartRate: 74, bloodPressure: 128, spo2: 99, sleep: 8.0 },
  { date: 'Jun 5', heartRate: 76, bloodPressure: 127, spo2: 98, sleep: 7.3 },
  { date: 'Jun 6', heartRate: 73, bloodPressure: 122, spo2: 97, sleep: 7.6 },
  { date: 'Jun 7', heartRate: 77, bloodPressure: 126, spo2: 99, sleep: 7.8 },
];

// Sample cognitive data
const cognitiveData = [
  { date: 'Jun 1', memoryScore: 85, focusScore: 78, moodRating: 7 },
  { date: 'Jun 2', memoryScore: 82, focusScore: 80, moodRating: 8 },
  { date: 'Jun 3', memoryScore: 86, focusScore: 79, moodRating: 6 },
  { date: 'Jun 4', memoryScore: 84, focusScore: 82, moodRating: 7 },
  { date: 'Jun 5', memoryScore: 88, focusScore: 84, moodRating: 8 },
  { date: 'Jun 6', memoryScore: 87, focusScore: 81, moodRating: 8 },
  { date: 'Jun 7', memoryScore: 89, focusScore: 83, moodRating: 9 },
];

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  color: string;
}

function MetricCard({ icon, title, value, subtitle, color }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <p className="text-lg text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{value}</p>
              {subtitle && (
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const Health = () => {
  const [activeMetric, setActiveMetric] = useState<string>("heartRate");
  const [timeRange, setTimeRange] = useState<string>("week");
  const [activeCognitiveMetric, setActiveCognitiveMetric] = useState<string>("memoryScore");

  return (
    <Layout>
      <div className="dashboard-section p-6">
        <h1 className="text-3xl font-bold mb-8">Health Metrics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            icon={<HeartPulse className="h-6 w-6 text-white" />}
            title="Heart Rate"
            value="75 BPM"
            subtitle="Normal range"
            color="bg-rose-500"
          />
          <MetricCard 
            icon={<MoveHorizontal className="h-6 w-6 text-white" />}
            title="Blood Pressure"
            value="125/82 mmHg"
            subtitle="Slightly elevated"
            color="bg-amber-500"
          />
          <MetricCard 
            icon={<Activity className="h-6 w-6 text-white" />}
            title="Oxygen Saturation"
            value="98%"
            subtitle="Normal range"
            color="bg-blue-500"
          />
          <MetricCard 
            icon={<Brain className="h-6 w-6 text-white" />}
            title="Cognitive Score"
            value="87/100"
            subtitle="Above average"
            color="bg-violet-500"
          />
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Health Trends</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={timeRange === "week" ? "default" : "outline"} 
                  onClick={() => setTimeRange("week")}
                  size="sm"
                >
                  Week
                </Button>
                <Button 
                  variant={timeRange === "month" ? "default" : "outline"} 
                  onClick={() => setTimeRange("month")}
                  size="sm"
                >
                  Month
                </Button>
                <Button 
                  variant={timeRange === "year" ? "default" : "outline"} 
                  onClick={() => setTimeRange("year")}
                  size="sm"
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                size="sm"
                variant={activeMetric === "heartRate" ? "default" : "outline"}
                onClick={() => setActiveMetric("heartRate")}
              >
                Heart Rate
              </Button>
              <Button
                size="sm"
                variant={activeMetric === "bloodPressure" ? "default" : "outline"}
                onClick={() => setActiveMetric("bloodPressure")}
              >
                Blood Pressure
              </Button>
              <Button
                size="sm"
                variant={activeMetric === "spo2" ? "default" : "outline"}
                onClick={() => setActiveMetric("spo2")}
              >
                SpO2
              </Button>
              <Button
                size="sm"
                variant={activeMetric === "sleep" ? "default" : "outline"}
                onClick={() => setActiveMetric("sleep")}
              >
                Sleep
              </Button>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {activeMetric === "heartRate" && (
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Heart Rate (BPM)"
                    />
                  )}
                  {activeMetric === "bloodPressure" && (
                    <Line 
                      type="monotone" 
                      dataKey="bloodPressure" 
                      stroke="hsl(var(--amber-500))" 
                      strokeWidth={3}
                      name="Blood Pressure (systolic)"
                    />
                  )}
                  {activeMetric === "spo2" && (
                    <Line 
                      type="monotone" 
                      dataKey="spo2" 
                      stroke="hsl(var(--blue-500))" 
                      strokeWidth={3}
                      name="SpO2 (%)"
                    />
                  )}
                  {activeMetric === "sleep" && (
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="hsl(var(--violet-500))" 
                      strokeWidth={3}
                      name="Sleep (hours)"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Sleep Quality</span>
                    <span className="text-sm text-muted-foreground">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Deep Sleep</span>
                    <span className="text-sm text-muted-foreground">2.5 hrs</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">REM Sleep</span>
                    <span className="text-sm text-muted-foreground">1.8 hrs</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Light Sleep</span>
                    <span className="text-sm text-muted-foreground">3.2 hrs</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Health Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Report</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Jun 5, 2025</TableCell>
                    <TableCell>Blood Work Results</TableCell>
                    <TableCell className="text-green-600">Normal</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 20, 2025</TableCell>
                    <TableCell>Physical Examination</TableCell>
                    <TableCell className="text-amber-600">Follow-up</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 12, 2025</TableCell>
                    <TableCell>Cardiology Checkup</TableCell>
                    <TableCell className="text-green-600">Normal</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Mental Health & Cognitive Wellness Section */}
        <h2 className="text-2xl font-bold mb-6">Mental Health & Cognitive Wellness</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cognitive Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                size="sm"
                variant={activeCognitiveMetric === "memoryScore" ? "default" : "outline"}
                onClick={() => setActiveCognitiveMetric("memoryScore")}
              >
                Memory
              </Button>
              <Button
                size="sm"
                variant={activeCognitiveMetric === "focusScore" ? "default" : "outline"}
                onClick={() => setActiveCognitiveMetric("focusScore")}
              >
                Focus & Attention
              </Button>
              <Button
                size="sm"
                variant={activeCognitiveMetric === "moodRating" ? "default" : "outline"}
                onClick={() => setActiveCognitiveMetric("moodRating")}
              >
                Mood
              </Button>
            </div>
            
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={cognitiveData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {activeCognitiveMetric === "memoryScore" && (
                    <Line 
                      type="monotone" 
                      dataKey="memoryScore" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      name="Memory Score"
                    />
                  )}
                  {activeCognitiveMetric === "focusScore" && (
                    <Line 
                      type="monotone" 
                      dataKey="focusScore" 
                      stroke="#82ca9d" 
                      strokeWidth={3}
                      name="Focus Score"
                    />
                  )}
                  {activeCognitiveMetric === "moodRating" && (
                    <Line 
                      type="monotone" 
                      dataKey="moodRating" 
                      stroke="#ffc658" 
                      strokeWidth={3}
                      name="Mood Rating (1-10)"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Brain Health Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full mr-3">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Daily Word Puzzle</h4>
                      <p className="text-sm text-muted-foreground">Improves vocabulary and recall</p>
                    </div>
                  </div>
                  <Button>Start</Button>
                </div>
                
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Memory Match Game</h4>
                      <p className="text-sm text-muted-foreground">Enhances short-term memory</p>
                    </div>
                  </div>
                  <Button>Start</Button>
                </div>
                
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <ScrollText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Guided Meditation</h4>
                      <p className="text-sm text-muted-foreground">Reduces stress and improves focus</p>
                    </div>
                  </div>
                  <Button>Start</Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Activities
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wellness Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Hydration Reminder</h4>
                  <p className="text-sm text-blue-700">You've been drinking less water than usual. Try to increase your fluid intake.</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Mental Exercise</h4>
                  <p className="text-sm text-green-700">Your cognitive scores are improving! Continue with your daily puzzles.</p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-1">Social Connection</h4>
                  <p className="text-sm text-purple-700">Consider joining the virtual book club to boost social engagement.</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                All Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Health;
