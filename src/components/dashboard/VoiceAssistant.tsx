
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const { toast } = useToast();
  
  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    setResponse("");
    
    // Simulate voice recognition after a delay
    setTimeout(() => {
      setTranscript("Show me my medication schedule for today");
      
      // Simulate AI response after transcript is received
      setTimeout(() => {
        setIsListening(false);
        setResponse("You have 3 medications scheduled for today: Lisinopril at 8:00 AM, Metformin at 12:30 PM, and Atorvastatin at 8:00 PM. Would you like me to set reminders for these?");
      }, 2000);
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
    
    if (!transcript) {
      toast({
        title: "Listening canceled",
        description: "Voice assistant has stopped listening"
      });
    }
  };
  
  const handleQuickCommand = (command: string) => {
    setTranscript(command);
    
    // Simulate AI response based on the command
    let aiResponse = "";
    
    switch(command) {
      case "What time is it?":
        aiResponse = `The current time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
        break;
      case "Call my daughter":
        aiResponse = "Calling Sarah, your daughter. Connecting now...";
        break;
      case "Turn on the lights":
        aiResponse = "Smart home control is enabled. Turning on the living room lights to 70% brightness.";
        break;
      default:
        aiResponse = "I'm sorry, I didn't understand that command. Could you please try again?";
    }
    
    setResponse(aiResponse);
  };
  
  // Accessibility feature: automatic suggestions
  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse("");
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [response]);
  
  return (
    <Card className={cn(
      "dashboard-card border-2 transition-colors duration-300",
      isListening ? "border-primary" : response ? "border-emerald-500" : "border-accent"
    )}>
      <CardContent className="py-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors",
            isListening ? "bg-primary text-primary-foreground" : 
            response ? "bg-emerald-500 text-white" : "bg-accent text-accent-foreground"
          )}>
            {isListening ? (
              <Mic className="h-10 w-10 animate-pulse" />
            ) : response ? (
              <Sparkles className="h-10 w-10" />
            ) : (
              <MicOff className="h-10 w-10" />
            )}
          </div>
          
          <h3 className="text-accessible-xl font-medium mb-2">
            {isListening ? "Listening..." : response ? "Response" : "Voice Assistant"}
          </h3>
          
          {transcript && (
            <div className="bg-muted p-3 rounded-lg mb-4 max-w-xs lg:max-w-md mx-auto">
              <p className="text-lg font-medium">"{transcript}"</p>
            </div>
          )}
          
          {response && (
            <div className="bg-primary/10 p-4 rounded-lg mb-4 max-w-xs lg:max-w-md mx-auto">
              <p className="text-lg">{response}</p>
            </div>
          )}
          
          {!isListening && !response && (
            <p className="text-muted-foreground mb-6 max-w-xs lg:max-w-sm">
              Press the button and speak to control Evergreen Care Compass with your voice
            </p>
          )}
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={toggleListening}
              className={cn(
                "accessible-btn h-12 text-lg",
                isListening ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
              )}
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </Button>
            
            <Button size="lg" variant="outline" className="accessible-btn h-12 text-lg">
              <HelpCircle className="mr-2 h-5 w-5" />
              <span>Help</span>
            </Button>
          </div>
          
          {!isListening && !response && (
            <div className="mt-6">
              <p className="text-base font-medium mb-3">Try saying:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["What time is it?", "Call my daughter", "Turn on the lights"].map((command) => (
                  <Button 
                    key={command} 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleQuickCommand(command)}
                    className="text-base"
                  >
                    {command}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
