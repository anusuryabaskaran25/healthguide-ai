import React, { useState, useEffect } from 'react';
import { Brain, Wind, Smile, Meh, Frown, Sparkles, Play, Pause, RotateCcw, Heart } from 'lucide-react';

export const MentalHealthSanctuary: React.FC = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (7s)' | 'Exhale (8s)'>('Inhale (4s)');
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [userMood, setUserMood] = useState<'great' | 'okay' | 'anxious' | 'sad'>('great');
  const [moodLog, setMoodLog] = useState<{ mood: string; time: string }[]>([
    { mood: 'Great', time: 'Yesterday 09:00 AM' },
    { mood: 'Anxious', time: 'Yesterday 04:30 PM' }
  ]);

  // 4-7-8 Breathing Cycle Timer
  useEffect(() => {
    let timer: any = null;
    if (breathingActive) {
      timer = setInterval(() => {
        setPhaseSeconds(prev => {
          if (prev > 1) return prev - 1;
          
          if (breathPhase === 'Inhale (4s)') {
            setBreathPhase('Hold (7s)');
            return 7;
          } else if (breathPhase === 'Hold (7s)') {
            setBreathPhase('Exhale (8s)');
            return 8;
          } else {
            setBreathPhase('Inhale (4s)');
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathPhase]);

  const handleLogMood = (mood: string) => {
    setMoodLog(prev => [{ mood, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          <span>Mental Health Sanctuary & Mindfulness</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Mindfulness & <span className="text-gradient">Stress Relief</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Calm your nervous system with guided 4-7-8 breathing exercises and track your daily emotional mood patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 4-7-8 Breathing Visualizer */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Parasympathetic Nervous System Reset
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">4-7-8 Guided Breathing</h3>
          </div>

          {/* Animated Expanding Ring */}
          <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-brand-cyan to-brand-emerald opacity-30 blur-xl transition-all duration-1000 ${
                breathPhase.startsWith('Inhale')
                  ? 'scale-125'
                  : breathPhase.startsWith('Hold')
                  ? 'scale-125'
                  : 'scale-75'
              }`}
            />
            <div
              className={`w-44 h-44 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center transition-all duration-1000 glass-panel shadow-2xl ${
                breathPhase.startsWith('Inhale')
                  ? 'scale-110 border-brand-cyan'
                  : breathPhase.startsWith('Hold')
                  ? 'scale-110 border-indigo-500'
                  : 'scale-90 border-emerald-400'
              }`}
            >
              <Wind className="w-8 h-8 text-indigo-400 mb-1" />
              <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{breathPhase}</span>
              <span className="text-3xl font-black text-indigo-500 font-mono mt-1">{phaseSeconds}s</span>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2"
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{breathingActive ? 'Pause Session' : 'Start 4-7-8 Breathing'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Mood Tracker */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest block mb-1">
              Emotional Wellness Logging
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Daily Mood Tracker</h3>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'great', label: 'Great', icon: Smile, color: 'text-emerald-500' },
              { id: 'okay', label: 'Okay', icon: Meh, color: 'text-amber-500' },
              { id: 'anxious', label: 'Anxious', icon: Wind, color: 'text-indigo-500' },
              { id: 'sad', label: 'Low', icon: Frown, color: 'text-rose-500' },
            ].map(m => {
              const MoodIcon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => handleLogMood(m.label)}
                  className="p-3 rounded-2xl glass-card flex flex-col items-center gap-1.5 hover:scale-105 transition-all"
                >
                  <MoodIcon className={`w-6 h-6 ${m.color}`} />
                  <span className="text-xs font-extrabold">{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recent Mood History</span>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {moodLog.map((log, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">{log.mood}</span>
                  <span className="text-slate-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
