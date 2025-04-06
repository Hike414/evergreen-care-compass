
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, ChevronRight } from "lucide-react";
import { useState } from "react";

// Sample messages data
const contacts = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    avatar: "S", 
    status: "online", 
    lastMessage: "Are you taking your medication?",
    unread: 2,
    time: "10:35 AM",
  },
  { 
    id: 2, 
    name: "Dr. Williams", 
    avatar: "D", 
    status: "offline", 
    lastMessage: "Your test results look good.",
    unread: 0,
    time: "Yesterday",
  },
  { 
    id: 3, 
    name: "Nurse Thompson", 
    avatar: "N", 
    status: "online", 
    lastMessage: "How are you feeling today?",
    unread: 1,
    time: "Yesterday",
  },
  { 
    id: 4, 
    name: "Michael Johnson", 
    avatar: "M", 
    status: "offline", 
    lastMessage: "I'll come visit this weekend.",
    unread: 0,
    time: "Monday",
  },
  { 
    id: 5, 
    name: "Emma Smith", 
    avatar: "E", 
    status: "offline", 
    lastMessage: "Grandma, I passed my exam!",
    unread: 0,
    time: "Monday",
  },
  { 
    id: 6, 
    name: "Judy Miller", 
    avatar: "J", 
    status: "offline", 
    lastMessage: "Are we still meeting for coffee?",
    unread: 0,
    time: "Last week",
  },
];

const sampleMessages = [
  { id: 1, sender: "Sarah Johnson", content: "Hi Mom, how are you feeling today?", time: "10:20 AM", isSelf: false },
  { id: 2, sender: "You", content: "I'm doing well, thank you for asking! Just took my morning medication.", time: "10:25 AM", isSelf: true },
  { id: 3, sender: "Sarah Johnson", content: "That's great! Are you drinking enough water?", time: "10:28 AM", isSelf: false },
  { id: 4, sender: "You", content: "Yes, I've been using that water reminder app you installed for me. It's very helpful.", time: "10:30 AM", isSelf: true },
  { id: 5, sender: "Sarah Johnson", content: "Perfect! And are you taking your medication regularly?", time: "10:35 AM", isSelf: false },
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="dashboard-section h-full">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Contacts sidebar */}
          <Card className="w-80 h-full rounded-none rounded-l-lg flex flex-col border-r">
            <CardHeader className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Messages</CardTitle>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search contacts..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto px-3 py-0">
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent ${selectedContact.id === contact.id ? 'bg-accent' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <div className="text-lg">{contact.avatar}</div>
                      </Avatar>
                      {contact.status === "online" && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-base truncate">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{contact.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="ml-2 rounded-full">{contact.unread}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="border-b p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <div>{selectedContact.avatar}</div>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedContact.status === "online" ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-6 overflow-auto bg-background">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isSelf && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <div>{selectedContact.avatar}</div>
                      </Avatar>
                    )}
                    <div className={`max-w-[70%] ${message.isSelf ? 'bg-primary text-primary-foreground' : 'bg-accent'} p-3 rounded-lg`}>
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isSelf ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t p-4 flex items-center">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input 
                placeholder="Type a message..." 
                className="mx-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Extra info sidebar (can be toggled) */}
          <Card className="w-72 h-full rounded-none rounded-r-lg border-l overflow-auto hidden xl:block">
            <CardContent className="p-4">
              <div className="flex flex-col items-center py-6">
                <Avatar className="h-20 w-20 mb-3">
                  <div className="text-2xl">{selectedContact.avatar}</div>
                </Avatar>
                <h2 className="text-xl font-bold">{selectedContact.name}</h2>
                <p className={`text-sm ${selectedContact.status === "online" ? "text-green-500" : "text-muted-foreground"}`}>
                  {selectedContact.status === "online" ? "Online" : "Last seen recently"}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" /> Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" /> Video
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Info</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <span className="text-sm">555-123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Relationship</span>
                      <span className="text-sm">Daughter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm">Boston, MA</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Shared Media</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-muted rounded"></div>
                    <div className="aspect-square bg-muted rounded"></div>
                    <div className="aspect-square bg-muted rounded"></div>
                  </div>
                  <Button variant="link" size="sm" className="mt-2 p-0">
                    View All <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Reminders</h3>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">Sarah is scheduled to visit on Saturday, June 12 at 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
