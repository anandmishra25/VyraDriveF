import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertTriangle, ShieldCheck, Phone, Radio, MapPin,
  CheckCircle2, Clock, Send, MessageSquare,
} from 'lucide-react';
import { safetyCheckins, messages } from '@/lib/mockData';

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: d } } });

export const MobileSafety = () => {
  const [sosActive, setSosActive] = useState(false);
  const [tab, setTab] = useState('sos');
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setChatMessages([{ id: Date.now(), from: 'You', time: 'Now', message: messageInput, read: true }, ...chatMessages]);
    setMessageInput('');
  };

  return (
    <div className="px-5 pt-2 space-y-4">
      {/* SOS Hero */}
      <motion.div {...fadeUp()}>
        <Card className={`border-destructive/20 ${ sosActive ? 'bg-destructive/5' : 'bg-card'}`}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setSosActive(!sosActive)}
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
                  sosActive
                    ? 'bg-destructive shadow-[0_0_40px_hsl(var(--destructive)/0.4)] animate-pulse'
                    : 'bg-destructive/10 active:bg-destructive/20'
                }`}
              >
                <AlertTriangle className={`w-12 h-12 ${
                  sosActive ? 'text-destructive-foreground' : 'text-destructive'
                }`} />
              </button>
              <div className="text-center">
                <p className="text-lg font-heading font-bold text-foreground">
                  {sosActive ? 'SOS Active' : 'Emergency SOS'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {sosActive ? 'Sharing live location with fleet owner' : 'Tap to share live location'}
                </p>
              </div>
              {sosActive && (
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="gap-1 animate-pulse text-[10px]">
                    <Radio className="w-3 h-3" />Broadcasting
                  </Badge>
                  <Badge variant="muted" className="gap-1 text-[10px]">
                    <MapPin className="w-3 h-3" />GPS Active
                  </Badge>
                </div>
              )}
              <div className="flex gap-3 w-full">
                <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-1">
                  <Phone className="w-3.5 h-3.5" /> Call Owner
                </Button>
                <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-1">
                  <Phone className="w-3.5 h-3.5" /> Call 112
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl">
        {[{id:'sos', label:'Check-ins'}, {id:'chat', label:'Messages'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 ${
            tab === t.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}>{t.label}</button>
        ))}
      </div>

      {tab === 'sos' && (
        <motion.div {...fadeUp(0.04)}>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <p className="text-sm font-heading font-semibold text-foreground">Check-ins (Every 2h)</p>
              </div>
              <div className="space-y-2.5">
                {safetyCheckins.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      c.status === 'completed' ? 'bg-success/10' : c.status === 'due' ? 'bg-accent/10 animate-pulse' : 'bg-secondary'
                    }`}>
                      {c.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-success" /> :
                       c.status === 'due' ? <AlertTriangle className="w-5 h-5 text-accent" /> :
                       <Clock className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{c.time}</p>
                      <p className="text-[11px] text-muted-foreground capitalize">{c.status}</p>
                    </div>
                    {c.status === 'due' && <Button variant="premium" size="sm" className="rounded-xl h-8 text-xs">Check In</Button>}
                    {c.status === 'completed' && <Badge variant="success" className="text-[9px]">Done</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {tab === 'chat' && (
        <motion.div {...fadeUp(0.04)}>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <p className="text-sm font-heading font-semibold text-foreground">Fleet Chat</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Message fleet admin..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 rounded-xl h-10"
                />
                <Button variant="premium" size="icon" className="rounded-xl w-10 h-10" onClick={handleSend}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`p-3 rounded-xl ${
                    msg.from === 'You' ? 'bg-primary/10 ml-8' :
                    !msg.read ? 'bg-accent/5 border border-accent/20' : 'bg-secondary/30'
                  }`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-medium text-foreground">{msg.from}</span>
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      <div className="h-4" />
    </div>
  );
};
