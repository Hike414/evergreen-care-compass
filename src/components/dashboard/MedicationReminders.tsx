
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample medications data
const medications = [
  { id: 1, name: "Lisinopril", dosage: "10mg", time: "8:00 AM", taken: true },
  { id: 2, name: "Metformin", dosage: "500mg", time: "12:30 PM", taken: false },
  { id: 3, name: "Atorvastatin", dosage: "20mg", time: "8:00 PM", taken: false },
  { id: 4, name: "Vitamin D", dosage: "1000 IU", time: "8:00 AM", taken: true },
];

export function MedicationReminders() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-accessible-xl">Medication Reminders</CardTitle>
        <Button size="sm" className="accessible-btn bg-primary" aria-label="Add medication">
          <Plus className="h-4 w-4 mr-2" />
          <span>Add</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med) => (
            <div 
              key={med.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                med.taken ? "bg-muted/50" : "bg-white dark:bg-card"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  med.taken ? "bg-evergreen-100 text-evergreen-600" : "bg-skyblue-100 text-skyblue-600"
                )}>
                  {med.taken ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-accessible">{med.name}</p>
                  <p className="text-sm text-muted-foreground">{med.dosage}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className={cn(
                  "text-sm font-medium",
                  med.taken ? "text-muted-foreground" : "text-foreground"
                )}>
                  {med.time}
                </p>
                {!med.taken && (
                  <Button size="sm" variant="outline" className="accessible-btn">
                    <span>Take Now</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
