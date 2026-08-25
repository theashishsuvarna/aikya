'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AikyaMark } from '@/components/aikya-logo';
import { askAIAdvisor } from '@/lib/ai-service';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  supportingData?: string;
  recommendation?: string;
  confidence?: string;
  actions?: string[];
}

const suggestedQuestions = [
  'Which managers have too many direct reports?',
  'Where do we have overlapping responsibilities?',
  'Should Engineering be split into two teams?',
  'Which roles are missing?',
  'Who reports indirectly to the CEO?',
  'What are the biggest organizational risks?',
  'How should we structure Product as we grow?',
];

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleAsk = (question: string) => {
    if (!question.trim() || isThinking) return;
    const userMsg: Message = { id: `u_${Date.now()}`, role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const response = askAIAdvisor(question);
      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: response.content,
        reasoning: response.reasoning,
        supportingData: response.supportingData,
        recommendation: response.recommendation,
        confidence: response.confidence,
        actions: response.actions,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div>
      <AppHeader title="Ask AIKYA" subtitle="Understand your organization in natural language" />

      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center mb-4">
                  <AikyaMark className="h-12 w-12" />
                </div>
                <h2 className="font-serif text-2xl font-semibold mb-2">Ask AIKYA</h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                  I understand your organization's structure, people, teams, and reporting lines. Ask me anything.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                  {suggestedQuestions.map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleAsk(q)}
                      className="text-left p-3 rounded-lg border border-border/60 hover:border-foreground/15 hover:bg-secondary/30 transition-all text-sm"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <AikyaMark className="h-7 w-7" />
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-card border border-border/60 rounded-tl-sm'
                  )}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                    {msg.reasoning && (
                      <div className="mt-3 pt-3 border-t border-border/40">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Reasoning</p>
                        <p className="text-xs text-muted-foreground">{msg.reasoning}</p>
                      </div>
                    )}
                    {msg.supportingData && (
                      <div className="mt-2">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Supporting data</p>
                        <p className="text-xs text-muted-foreground font-mono">{msg.supportingData}</p>
                      </div>
                    )}
                    {msg.recommendation && (
                      <div className="mt-3 p-2.5 rounded-lg bg-accent/5 border border-accent/20">
                        <p className="text-[10px] font-medium text-accent uppercase tracking-wider mb-1">Recommendation</p>
                        <p className="text-xs">{msg.recommendation}</p>
                      </div>
                    )}
                    {msg.confidence && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">Confidence:</span>
                        <Badge variant={msg.confidence === 'HIGH' ? 'default' : 'secondary'} className="text-[10px]">{msg.confidence}</Badge>
                      </div>
                    )}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {msg.actions.map((action) => (
                          <Button key={action} size="sm" variant="outline" className="h-7 text-xs gap-1">
                            {action} <ArrowRight className="h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <AikyaMark className="h-7 w-7" />
                <div className="bg-card border border-border/60 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-2 w-2 rounded-full bg-muted-foreground/40"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border/50 p-4 bg-background/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Ask about your organization..."
              className="flex-1 h-11 px-4 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk(input)}
            />
            <Button onClick={() => handleAsk(input)} disabled={isThinking || !input.trim()} size="lg" className="gap-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
