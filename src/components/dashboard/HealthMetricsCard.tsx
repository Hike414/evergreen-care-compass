
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Activity, MoveHorizontal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Sample data
const healthData = [
  { time: '6am', heartRate: 72, bloodPressure: 120, spo2: 98 },
  { time: '9am', heartRate: 75, bloodPressure: 125, spo2: 97 },
  { time: '12pm', heartRate: 78, bloodPressure: 130, spo2: 98 },
  { time: '3pm', heartRate: 74, bloodPressure: 128, spo2: 99 },
  { time: '6pm', heartRate: 76, bloodPressure: 127, spo2: 98 },
  { time: '9pm', heartRate: 73, bloodPressure: 122, spo2: 97 },
];

interface MetricProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  color: string;
}

function Metric({ icon, title, value, change, color }: MetricProps) {
  return (
    <div className="flex items-start gap-4">
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <span className="text-xs text-emerald-500 font-medium">{change}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function HealthMetricsCard() {
  const [activeMetrics, setActiveMetrics] = useState<string[]>(["heartRate", "bloodPressure"]);

  const toggleMetric = (metric: string) => {
    if (activeMetrics.includes(metric)) {
      if (activeMetrics.length > 1) { // Ensure at least one metric is always shown
        setActiveMetrics(activeMetrics.filter(m => m !== metric));
      }
    } else {
      setActiveMetrics([...activeMetrics, metric]);
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-accessible-xl">Health Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Metric 
            icon={<HeartPulse className="h-5 w-5 text-white" />}
            title="Heart Rate"
            value="75 BPM"
            change="Normal"
            color="bg-skyblue-500"
          />
          <Metric 
            icon={<MoveHorizontal className="h-5 w-5 text-white" />}
            title="Blood Pressure"
            value="125/82"
            color="bg-evergreen-500"
          />
          <Metric 
            icon={<Activity className="h-5 w-5 text-white" />}
            title="SpO2"
            value="98%"
            color="bg-skyblue-700"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            size="sm"
            variant={activeMetrics.includes("heartRate") ? "default" : "outline"}
            onClick={() => toggleMetric("heartRate")}
            className="text-base"
          >
            Heart Rate
          </Button>
          <Button
            size="sm"
            variant={activeMetrics.includes("bloodPressure") ? "default" : "outline"}
            onClick={() => toggleMetric("bloodPressure")}
            className="text-base"
          >
            Blood Pressure
          </Button>
          <Button
            size="sm"
            variant={activeMetrics.includes("spo2") ? "default" : "outline"}
            onClick={() => toggleMetric("spo2")}
            className="text-base"
          >
            SpO2
          </Button>
        </div>
        
        <div className="pt-2 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={healthData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="time" tick={{ fontSize: 14 }} />
              <YAxis domain={[60, 140]} tick={{ fontSize: 14 }} />
              <Tooltip 
                contentStyle={{ fontSize: '16px', borderRadius: '8px' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              {activeMetrics.includes("heartRate") && (
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3} 
                  dot={{ r: 5 }}
                  name="Heart Rate"
                  activeDot={{ r: 8 }}
                />
              )}
              {activeMetrics.includes("bloodPressure") && (
                <Line 
                  type="monotone" 
                  dataKey="bloodPressure" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 5 }}
                  name="Blood Pressure"
                  activeDot={{ r: 8 }}
                />
              )}
              {activeMetrics.includes("spo2") && (
                <Line 
                  type="monotone" 
                  dataKey="spo2" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3} 
                  dot={{ r: 5 }}
                  name="SpO2"
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
