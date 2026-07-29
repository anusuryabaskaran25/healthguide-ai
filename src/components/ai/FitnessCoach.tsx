import React, { useState, useEffect } from 'react';
import { Dumbbell, Play, Pause, RotateCcw, Flame, CheckCircle2, Award } from 'lucide-react';

export const FitnessCoach: React.FC = () => {
  const [workoutType, setWorkoutType] = useState('Full Body Cardio & Core');
  const [activeTimer, setActiveTimer] = useState(false);
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    let interval: any = null;
    if (activeTimer && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setActiveTimer(false);
    }
    return () => clearInterval(interval);
  }, [activeTimer, seconds]);

  const exercises = [
    { name: 'Jumping Jacks', reps: '45 Seconds', cals: '12 kcal', desc: 'Maintain steady aerobic rhythm.' },
    { name: 'Bodyweight Squats', reps: '15 Reps x 3 Sets', cals: '18 kcal', desc: 'Keep chest upright, knees tracking over toes.' },
    { name: 'Push-Ups (Standard / Knee)', reps: '12 Reps x 3 Sets', cals: '15 kcal', desc: 'Engage core, lower chest near floor.' },
    { name: 'Plank Hold', reps: '60 Seconds', cals: '10 kcal', desc: 'Maintain flat neutral spine without sagging hips.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Dumbbell className="w-4 h-4" />
          <span>Interactive AI Workout Coach</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          AI Fitness <span className="text-gradient">& Exercise Coach</span>
        </h2>
      </div>

      <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Workout Selector & Timer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Selected Protocol</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{workoutType}</span>
          </div>

          {/* Built-in Rest Timer */}
          <div className="flex items-center space-x-3 bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-2 rounded-xl border border-brand-blue/30">
            <div className="text-center">
              <span className="text-[10px] font-bold text-brand-blue dark:text-brand-cyan uppercase block">Set Rest Timer</span>
              <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{seconds}s</span>
            </div>
            <button
              onClick={() => setActiveTimer(!activeTimer)}
              className="p-2 bg-brand-blue text-white rounded-lg hover:bg-brand-darkBlue transition-all"
            >
              {activeTimer ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setSeconds(45); setActiveTimer(false); }}
              className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-3">
          {exercises.map((ex, i) => (
            <div key={i} className="p-4 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-blue dark:text-brand-cyan font-black flex items-center justify-center text-xs">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{ex.name}</h4>
                  <p className="text-xs text-slate-500">{ex.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-brand-cyan block">{ex.reps}</span>
                <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-0.5 justify-end">
                  <Flame className="w-3 h-3" /> {ex.cals}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
