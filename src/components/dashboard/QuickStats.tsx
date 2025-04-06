
import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, Flame, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

function StatCard({ icon, label, value, bgColor, textColor }: StatCardProps) {
  return (
    <Card className="dashboard-card">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={cn("p-3 rounded-full", bgColor)}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={<Activity className="h-5 w-5 text-white" />}
        label="Daily Activity"
        value="Good"
        bgColor="bg-evergreen-500"
        textColor="text-evergreen-600 dark:text-evergreen-400"
      />
      <StatCard 
        icon={<Moon className="h-5 w-5 text-white" />}
        label="Sleep Quality"
        value="7.5 hrs"
        bgColor="bg-skyblue-700"
        textColor="text-skyblue-600 dark:text-skyblue-400"
      />
      <StatCard 
        icon={<Flame className="h-5 w-5 text-white" />}
        label="Calories"
        value="1,850"
        bgColor="bg-orange-500"
        textColor="text-orange-600 dark:text-orange-400"
      />
      <StatCard 
        icon={<AlertTriangle className="h-5 w-5 text-white" />}
        label="Alerts Today"
        value="1"
        bgColor="bg-amber-500"
        textColor="text-amber-600 dark:text-amber-400"
      />
    </div>
  );
}
