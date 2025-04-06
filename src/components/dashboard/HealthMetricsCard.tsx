
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Lungs, MoveHorizontal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
            icon={<Lungs className="h-5 w-5 text-white" />}
            title="SpO2"
            value="98%"
            color="bg-skyblue-700"
          />
        </div>
        
        <div className="pt-4 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={healthData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis domain={[60, 140]} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ fontSize: '14px', borderRadius: '8px' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                name="Heart Rate"
              />
              <Line 
                type="monotone" 
                dataKey="bloodPressure" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                name="Blood Pressure"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
