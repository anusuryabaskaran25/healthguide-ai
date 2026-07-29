import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Volume2, Mic, ShieldCheck, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am HealthGuide AI Companion. How can I assist with your medical questions, medication dosages, or lifestyle goals today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const presetPrompts = [
    'What should I do for a sudden migraine?',
    'What are common side effects of Amoxicillin?',
    'Create a diabetic-friendly meal plan',
    'How much water should I drink daily for weight loss?'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulated AI Intelligence Engine Stream Response
    setTimeout(() => {
      let responseText = `Regarding "${queryText}": Always consult your primary physician for emergency medical conditions. `;
      if (queryText.toLowerCase().includes('migraine')) {
        responseText = 'For a sudden migraine: 1. Rest in a dark, quiet room with cold compress applied to your forehead. 2. Stay hydrated with water or electrolyte fluids. 3. Triptans or NSAIDs (like Ibuprofen) may help if taken early at onset.';
      } else if (queryText.toLowerCase().includes('amoxicillin')) {
        responseText = 'Amoxicillin common side effects include mild nausea, diarrhea, and skin rash. Seek emergency care if severe allergic hives or swelling occur.';
      } else if (queryText.toLowerCase().includes('water')) {
        responseText = 'Adults should aim for roughly 30-35 ml of water per kilogram of body weight daily (approx. 2.5 to 3.5 liters), increasing intake during strenuous exercise or high temperatures.';
      } else {
        responseText = 'Based on medical literature, maintaining balanced hydration, low-sodium high-fiber nutrition, and 150 minutes of weekly aerobic exercise supports optimal cardiovascular health.';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is supported in standard modern browsers.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Interactive 24/7 AI Medical Assistant</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          HealthGuide <span className="text-gradient">AI Companion</span>
        </h2>
      </div>

      {/* Main Chat Glass Box */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 h-[520px] flex flex-col">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : 'bg-gradient-to-tr from-brand-cyan to-brand-emerald text-slate-900 shadow-glow-cyan'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleVoiceSpeak(msg.text)}
                      className="hover:text-brand-cyan transition-colors"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-brand-cyan font-semibold pl-12 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>HealthGuide AI is analyzing medical literature...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Chips */}
        <div className="py-3 flex flex-wrap gap-2 border-t border-slate-200 dark:border-slate-800">
          {presetPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-xs font-medium hover:border-brand-cyan/40 border border-slate-200 dark:border-slate-700 transition-all text-left truncate max-w-[200px]"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your health or medication question..."
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-2xl shadow-glow-blue hover:opacity-90 transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
