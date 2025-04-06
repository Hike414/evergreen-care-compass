
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  
  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would activate the voice recognition system
  };
  
  return (
    <Card className={cn(
      "dashboard-card border-2 transition-colors duration-300",
      isListening ? "border-primary" : "border-accent"
    )}>
      <CardContent className="py-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors",
            isListening ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
          )}>
            {isListening ? (
              <Mic className="h-10 w-10 animate-pulse" />
            ) : (
              <MicOff className="h-10 w-10" />
            )}
          </div>
          
          <h3 className="text-accessible-xl font-medium mb-2">
            {isListening ? "Listening..." : "Voice Assistant"}
          </h3>
          
          <p className="text-muted-foreground mb-6 max-w-xs">
            {isListening 
              ? "Say a command like 'Show my medications' or 'Call my daughter'"
              : "Press the button and speak to control Evergreen Care Compass with your voice"
            }
          </p>
          
          <div className="flex gap-4">
            <Button 
              size="lg"
              onClick={toggleListening}
              className={cn(
                "accessible-btn",
                isListening ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
              )}
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </Button>
            
            <Button size="lg" variant="outline" className="accessible-btn">
              <Volume2 className="h-5 w-5 mr-2" />
              <span>Help</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
