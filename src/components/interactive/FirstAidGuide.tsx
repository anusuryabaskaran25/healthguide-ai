import React, { useState, useEffect } from 'react';
import { AlertCircle, PhoneCall, HeartPulse, Play, Pause, Download, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { FIRST_AID_GUIDES, FirstAidGuide } from '../../data/firstAidData';

export const FirstAidGuideComponent: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<FirstAidGuide>(FIRST_AID_GUIDES[0]);
  const [cprActive, setCprActive] = useState(false);
  const [cprBeat, setCprBeat] = useState(false);

  // CPR Metronome Audio Chime & Visual Beat
  useEffect(() => {
    let interval: any = null;
    if (cprActive && selectedGuide.cprMetronomeBpm) {
      const intervalMs = (60 / selectedGuide.cprMetronomeBpm) * 1000;
      interval = setInterval(() => {
        setCprBeat(prev => !prev);
      }, intervalMs);
    } else {
      setCprBeat(false);
    }
    return () => clearInterval(interval);
  }, [cprActive, selectedGuide]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 animate-bounce" />
          <span>Emergency First Aid Protocol Center</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Life-Saving <span className="text-gradient">First Aid Guides</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Immediate step-by-step instructions for cardiac arrest CPR, choking, severe hemorrhage, and thermal burns.
        </p>
      </div>

      {/* Emergency Phone Call Triggers */}
      <div className="p-4 bg-rose-950/60 border border-rose-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-lg animate-pulse">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-300 uppercase tracking-widest block">Immediate Life Threat?</span>
            <span className="text-lg font-black">Call Local Emergency Response Services Immediately</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <a href="tel:911" className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-sm rounded-xl shadow-lg transition-all">
            Call 911 (US)
          </a>
          <a href="tel:112" className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-black text-sm rounded-xl shadow-lg transition-all">
            Call 112 (EU/Global)
          </a>
        </div>
      </div>

      {/* Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {FIRST_AID_GUIDES.map(guide => (
          <button
            key={guide.id}
            onClick={() => { setSelectedGuide(guide); setCprActive(false); }}
            className={`p-4 rounded-3xl border text-left transition-all space-y-2 ${
              selectedGuide.id === guide.id
                ? 'border-rose-500 bg-rose-500/10 shadow-lg text-slate-900 dark:text-white'
                : 'glass-card border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-500 uppercase">
              {guide.urgency}
            </span>
            <h4 className="text-sm font-extrabold line-clamp-1">{guide.title}</h4>
          </button>
        ))}
      </div>

      {/* Active Guide Detail Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">{selectedGuide.category}</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{selectedGuide.title}</h3>
          </div>

          {/* CPR Audio Metronome Control if applicable */}
          {selectedGuide.cprMetronomeBpm && (
            <div className="flex items-center space-x-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
              <div className="text-left">
                <span className="text-[10px] font-bold text-rose-500 uppercase block">CPR Beat Metronome</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">{selectedGuide.cprMetronomeBpm} BPM Rhythm</span>
              </div>
              <button
                onClick={() => setCprActive(!cprActive)}
                className={`p-2.5 rounded-xl text-white font-bold transition-all ${
                  cprActive ? 'bg-rose-600 animate-pulse' : 'bg-rose-500 hover:bg-rose-600'
                }`}
              >
                {cprActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Visual Pulse Heart for CPR Metronome */}
        {cprActive && (
          <div className="p-6 bg-slate-900 rounded-3xl text-center space-y-3 animate-in fade-in">
            <HeartPulse className={`w-16 h-16 mx-auto text-rose-500 transition-transform duration-100 ${cprBeat ? 'scale-125' : 'scale-100'}`} />
            <span className="text-xs font-extrabold text-white uppercase tracking-widest block">
              PUSH HARD & FAST TO THIS BEAT (100 - 120 COMPRESSIONS/MIN)
            </span>
          </div>
        )}

        {/* Step-by-Step Procedure */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sequential Emergency Actions</h4>
          <div className="grid grid-cols-1 gap-4">
            {selectedGuide.steps.map(step => (
              <div key={step.stepNumber} className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 flex items-start space-x-4">
                <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <div className="space-y-1">
                  <h5 className="text-base font-extrabold text-slate-900 dark:text-white">{step.title}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                  {step.warning && (
                    <span className="text-[11px] font-bold text-rose-500 block pt-1">
                      ⚠️ WARNING: {step.warning}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Do and Don't Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>DO THIS (Recommended)</span>
            </h5>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
              {selectedGuide.doList.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-2">
            <h5 className="font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>DO NOT DO THIS (Harmful)</span>
            </h5>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
              {selectedGuide.dontList.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
