
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CalendarClock, Clock, Plus } from "lucide-react";

// Sample routine data
const initialRoutines = [
  { id: 1, time: "07:30 AM", title: "Morning Medication", completed: false },
  { id: 2, time: "08:15 AM", title: "Breakfast", completed: true },
  { id: 3, time: "10:00 AM", title: "Physical Therapy Exercises", completed: false },
  { id: 4, time: "12:30 PM", title: "Lunch & Afternoon Medication", completed: false },
  { id: 5, time: "03:00 PM", title: "Social Call with Family", completed: false },
  { id: 6, time: "06:00 PM", title: "Dinner", completed: false },
  { id: 7, time: "08:30 PM", title: "Evening Medication", completed: false },
  { id: 8, time: "09:30 PM", title: "Bedtime Routine", completed: false },
];

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [routines, setRoutines] = useState(initialRoutines);
  const [newRoutine, setNewRoutine] = useState({ time: "", title: "" });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddRoutine = () => {
    if (newRoutine.time && newRoutine.title) {
      setRoutines([
        ...routines,
        {
          id: routines.length + 1,
          time: newRoutine.time,
          title: newRoutine.title,
          completed: false,
        },
      ]);
      setNewRoutine({ time: "", title: "" });
      setOpen(false);
      toast({
        title: "Routine added",
        description: "Your new routine has been added to the schedule",
      });
    }
  };

  const toggleComplete = (id: number) => {
    setRoutines(
      routines.map((routine) =>
        routine.id === id
          ? { ...routine, completed: !routine.completed }
          : routine
      )
    );
  };

  return (
    <Layout>
      <div className="dashboard-section">
        <h1 className="text-3xl font-bold mb-8">Daily Schedule</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 text-lg h-12">
                      <Plus className="mr-2 h-5 w-5" />
                      Add New Routine
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Routine</DialogTitle>
                      <DialogDescription>
                        Create a new daily routine activity. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="routine-time" className="text-base">Time</Label>
                        <Input
                          id="routine-time"
                          type="time"
                          value={newRoutine.time}
                          onChange={(e) => setNewRoutine({ ...newRoutine, time: e.target.value })}
                          className="h-12 text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routine-title" className="text-base">Activity</Label>
                        <Input
                          id="routine-title"
                          placeholder="Enter activity name"
                          value={newRoutine.title}
                          onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
                          className="h-12 text-lg"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" onClick={handleAddRoutine} className="text-lg">
                        Save Routine
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl flex items-center">
                  <CalendarClock className="mr-2 h-6 w-6" />
                  <span>Today's Routines</span>
                </CardTitle>
                <div className="text-lg font-medium">
                  {date?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routines.map((routine) => (
                    <div
                      key={routine.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <Checkbox
                            checked={routine.completed}
                            onCheckedChange={() => toggleComplete(routine.id)}
                            className="h-6 w-6"
                          />
                        </div>
                        <div>
                          <h3 className={`text-xl font-medium ${routine.completed ? "line-through text-muted-foreground" : ""}`}>
                            {routine.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="flex items-center text-lg text-muted-foreground">
                          <Clock className="mr-2 h-5 w-5" />
                          {routine.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
