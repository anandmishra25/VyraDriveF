import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShieldCheck, AlertTriangle, MessageSquare, Send,
  CheckCircle2, Clock, MapPin, Phone, Radio,
} from 'lucide-react';
import { messages, safetyCheckins, driverProfile } from '@/lib/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SafetyPage() {
  const [sosActive, setSosActive] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSOS = () => {
    setSosActive(!sosActive);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setChatMessages([
      { id: Date.now(), from: 'You', time: 'Just now', message: messageInput, read: true },
      ...chatMessages,
    ]);
    setMessageInput('');
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-2xl font-heading font-bold text-foreground">Safety & Communication</h2>
        <p className="text-sm text-muted-foreground mt-1">Emergency tools and fleet communication</p>
      </motion.div>

      {/* SOS Button */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className={`border-destructive/20 ${
          sosActive ? 'bg-destructive/5' : 'bg-card'
        }`}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={handleSOS}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  sosActive
                    ? 'bg-destructive animate-pulse shadow-[0_0_30px_hsl(var(--destructive)/0.4)]'
                    : 'bg-destructive/10 hover:bg-destructive/20'
                }`}
              >
                <AlertTriangle className={`w-10 h-10 ${
                  sosActive ? 'text-destructive-foreground' : 'text-destructive'
                }`} />
              </button>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-heading font-bold text-foreground">
                  {sosActive ? 'SOS Active — Sharing Live Location' : 'Emergency SOS'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {sosActive
                    ? 'Your live location is being shared with the fleet owner. Press again to deactivate.'
                    : 'Press the SOS button to share your live location with the fleet owner immediately.'}
                </p>
                {sosActive && (
                  <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                    <Badge variant="destructive" className="gap-1 animate-pulse">
                      <Radio className="w-3 h-3" />
                      Broadcasting
                    </Badge>
                    <Badge variant="muted" className="gap-1">
                      <MapPin className="w-3 h-3" />
                      GPS Active
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex sm:flex-col gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  Call Owner
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  Call 112
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="checkins" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="checkins">Safety Check-ins</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="checkins" className="space-y-4 mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Mandatory Check-ins (Every 2 Hours)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {safetyCheckins.map((checkin, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        checkin.status === 'completed' ? 'bg-success/10' :
                        checkin.status === 'due' ? 'bg-accent/10 animate-pulse' : 'bg-secondary'
                      }`}>
                        {checkin.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : checkin.status === 'due' ? (
                          <AlertTriangle className="w-5 h-5 text-accent" />
                        ) : (
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{checkin.time}</p>
                        <p className="text-xs text-muted-foreground capitalize">{checkin.status}</p>
                      </div>
                      {checkin.status === 'due' && (
                        <Button variant="premium" size="sm">
                          Check In
                        </Button>
                      )}
                      {checkin.status === 'completed' && (
                        <Badge variant="success" className="text-[10px]">Done</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Communication Hub
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message to fleet admin..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="premium" size="icon" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Messages List */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg ${
                        msg.from === 'You'
                          ? 'bg-primary/10 ml-8'
                          : msg.read
                            ? 'bg-secondary/30'
                            : 'bg-accent/5 border border-accent/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">{msg.from}</span>
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
