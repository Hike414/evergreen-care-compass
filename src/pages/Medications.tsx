
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Clock, Calendar, Plus, Check, AlertCircle, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Sample medication data
const initialMedications = [
  { 
    id: 1, 
    name: "Lisinopril", 
    dosage: "10mg", 
    time: "8:00 AM", 
    status: "taken", 
    purpose: "Blood pressure management",
    instructions: "Take with food",
    refill: "Jun 30, 2025",
  },
  { 
    id: 2, 
    name: "Metformin", 
    dosage: "500mg", 
    time: "12:30 PM", 
    status: "upcoming", 
    purpose: "Blood sugar control",
    instructions: "Take with meal",
    refill: "Jul 15, 2025",
  },
  { 
    id: 3, 
    name: "Atorvastatin", 
    dosage: "20mg", 
    time: "8:00 PM", 
    status: "upcoming", 
    purpose: "Cholesterol management",
    instructions: "Take in the evening",
    refill: "Aug 5, 2025",
  },
  { 
    id: 4, 
    name: "Vitamin D", 
    dosage: "1000 IU", 
    time: "8:00 AM", 
    status: "taken", 
    purpose: "Bone health",
    instructions: "Take with breakfast",
    refill: "Sep 10, 2025",
  },
];

const Medications = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    time: "",
    purpose: "",
    instructions: "",
    refill: "",
  });
  const [open, setOpen] = useState(false);
  const [adherenceRate, setAdherenceRate] = useState(92);
  const { toast } = useToast();

  const handleTakeMedication = (id: number) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, status: "taken" } : med
      )
    );
    toast({
      title: "Medication taken",
      description: "Your medication has been marked as taken",
    });
  };

  const handleSkipMedication = (id: number) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, status: "skipped" } : med
      )
    );
    toast({
      title: "Medication skipped",
      description: "Your medication has been marked as skipped",
    });
  };

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.time) {
      setMedications([
        ...medications,
        {
          id: medications.length + 1,
          ...newMedication,
          status: "upcoming",
        },
      ]);
      setNewMedication({
        name: "",
        dosage: "",
        time: "",
        purpose: "",
        instructions: "",
        refill: "",
      });
      setOpen(false);
      toast({
        title: "Medication added",
        description: "Your new medication has been added to your schedule",
      });
    }
  };

  const getMedicationStatusIcon = (status: string) => {
    switch (status) {
      case "taken":
        return <Check className="h-5 w-5 text-green-600" />;
      case "skipped":
        return <X className="h-5 w-5 text-red-600" />;
      case "upcoming":
        return <Clock className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const todaysMedications = medications.filter(med => med.status !== "skipped");
  const takenCount = medications.filter(med => med.status === "taken").length;

  return (
    <Layout>
      <div className="dashboard-section p-6">
        <h1 className="text-3xl font-bold mb-8">Medication Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Today's Progress</h3>
                <span className="text-2xl font-bold">{takenCount}/{todaysMedications.length}</span>
              </div>
              <Progress value={(takenCount / todaysMedications.length) * 100} className="h-3" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Adherence Rate</h3>
                <span className="text-2xl font-bold">{adherenceRate}%</span>
              </div>
              <Progress value={adherenceRate} className="h-3" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Add Medication</h3>
                <p className="text-sm text-muted-foreground">Add a new prescription</p>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="mr-2 h-5 w-5" /> Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Medication</DialogTitle>
                    <DialogDescription>
                      Enter the details of your new medication. All fields with * are required.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="medication-name">Name *</Label>
                        <Input
                          id="medication-name"
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                          placeholder="Medication name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="medication-dosage">Dosage *</Label>
                        <Input
                          id="medication-dosage"
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                          placeholder="e.g., 10mg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="medication-time">Time *</Label>
                        <Input
                          id="medication-time"
                          type="time"
                          value={newMedication.time}
                          onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="medication-refill">Refill Date</Label>
                        <Input
                          id="medication-refill"
                          type="date"
                          value={newMedication.refill}
                          onChange={(e) => setNewMedication({ ...newMedication, refill: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medication-purpose">Purpose</Label>
                      <Input
                        id="medication-purpose"
                        value={newMedication.purpose}
                        onChange={(e) => setNewMedication({ ...newMedication, purpose: e.target.value })}
                        placeholder="What is this medication for?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medication-instructions">Instructions</Label>
                      <Input
                        id="medication-instructions"
                        value={newMedication.instructions}
                        onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                        placeholder="Special instructions"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleAddMedication}>
                      Add Medication
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="flex items-center p-4 border rounded-lg bg-card">
                  <div className="p-3 rounded-full bg-primary/10 mr-4">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <h3 className="text-xl font-medium mr-2">{med.name}</h3>
                      <span className="text-sm text-muted-foreground">{med.dosage}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">{med.time}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-muted-foreground">{med.purpose}</span>
                    </div>
                    {med.status === "upcoming" && (
                      <div className="text-xs text-blue-600 mt-1">{med.instructions}</div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {getMedicationStatusIcon(med.status)}
                    <span className="mx-2"></span>
                    {med.status === "upcoming" ? (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleTakeMedication(med.id)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Take
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSkipMedication(med.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Skip
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" disabled={med.status === "skipped"}>
                        {med.status === "taken" ? "Taken" : "Skipped"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Refills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications
                  .filter(med => med.refill)
                  .sort((a, b) => new Date(a.refill).getTime() - new Date(b.refill).getTime())
                  .slice(0, 3)
                  .map((med) => (
                    <div key={`refill-${med.id}`} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{med.name}</h4>
                          <p className="text-sm text-muted-foreground">{med.dosage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{new Date(med.refill).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.ceil((new Date(med.refill).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Refills
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Medication Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-amber-50 border-amber-200 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">Mild Interaction</h4>
                    <p className="text-sm text-amber-700">Lisinopril may interact with Vitamin D supplements. Consider taking them at different times.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">No Known Interactions</h4>
                    <p className="text-sm text-green-700">No problematic interactions found between Metformin and Atorvastatin.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Full Interaction Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Medications;
