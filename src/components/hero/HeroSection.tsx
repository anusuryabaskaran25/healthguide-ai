import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Stethoscope, 
  Activity, 
  Bot, 
  BookOpen, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Heart,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setSearchOpen } = useHealth();
  const [quickQuery, setQuickQuery] = useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      setActiveTab('symptom-checker');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Mesh Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-blue/20 via-brand-cyan/20 to-brand-emerald/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glass Content & Quick Search */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top AI Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-panel border border-brand-blue/30 shadow-glow-blue animate-bounce-slow">
              <Sparkles className="w-4 h-4 text-brand-cyan animate-spin-slow" />
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                Next-Gen AI Healthcare Engine 3.0
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Your Trusted <span className="text-gradient">AI Health</span> Companion for Better Living.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                Experience instant preliminary symptom analysis, medical encyclopedias, interactive drug guides, personalized nutrition, and emergency first-aid protocols—powered by cutting-edge medical artificial intelligence.
              </p>
            </div>

            {/* AI Search Bar */}
            <form onSubmit={handleQuickSearchSubmit} className="relative max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-emerald rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-300" />
              <div className="relative glass-panel rounded-2xl p-2 flex items-center shadow-2xl border border-white/40 dark:border-slate-800">
                <Search className="w-6 h-6 text-brand-blue dark:text-brand-cyan ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Describe your symptoms (e.g. throbbing headache, chest tightness)..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>AI Diagnose</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Navigation Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('symptom-checker')}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-brand-blue text-white font-bold text-xs sm:text-sm shadow-glow-blue hover:bg-brand-darkBlue transition-all hover:scale-105"
              >
                <Stethoscope className="w-4 h-4" />
                <span>AI Symptom Checker</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-tools')}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl glass-card text-slate-800 dark:text-white font-bold text-xs sm:text-sm hover:border-brand-cyan/40 transition-all hover:scale-105"
              >
                <Bot className="w-4 h-4 text-brand-cyan" />
                <span>AI Health Assistant</span>
              </button>

              <button
                onClick={() => setActiveTab('diseases')}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl glass-card text-slate-800 dark:text-white font-bold text-xs sm:text-sm hover:border-brand-emerald/40 transition-all hover:scale-105"
              >
                <BookOpen className="w-4 h-4 text-brand-emerald" />
                <span>Explore Diseases</span>
              </button>

              <button
                onClick={() => setActiveTab('first-aid')}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs sm:text-sm hover:bg-rose-500 hover:text-white transition-all"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Emergency Help</span>
              </button>
            </div>

            {/* Animated Live Stats Counter */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/60 dark:border-slate-800/60">
              {[
                { label: 'Health Articles', value: '1,000+', icon: BookOpen, color: 'text-brand-blue' },
                { label: 'Medicines Listed', value: '500+', icon: Zap, color: 'text-brand-cyan' },
                { label: 'Diseases Index', value: '100+', icon: ShieldCheck, color: 'text-brand-emerald' },
                { label: 'AI Availability', value: '24/7 Live', icon: Heart, color: 'text-rose-500' },
              ].map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div key={idx} className="glass-card p-3 rounded-2xl flex items-center space-x-3">
                    <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                      <StatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Animated Futuristic Doctor Illustration & ECG Waveform */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Glowing Outer Backdrop Ring */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-emerald p-[3px] shadow-glow-blue animate-pulse-glow">
              <div className="w-full h-full bg-slate-900 rounded-full overflow-hidden relative flex items-center justify-center p-6">
                
                {/* Doctors & Futuristic AI Graphics SVG */}
                <svg className="w-full h-full text-brand-cyan" viewBox="0 0 200 200" fill="none">
                  {/* Outer Orbit Rings */}
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-spin-slow" />
                  <circle cx="100" cy="100" r="70" stroke="#10B981" strokeWidth="1" opacity="0.4" />
                  
                  {/* Central Futuristic Medical Shield & AI Brain Node */}
                  <path d="M100 30L150 55V100C150 135 125 160 100 170C75 160 50 135 50 100V55L100 30Z" fill="url(#heroShieldGrad)" opacity="0.85" />

                  {/* Pulsing Cross */}
                  <path d="M100 70V120M75 95H125" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />

                  <defs>
                    <linearGradient id="heroShieldGrad" x1="50" y1="30" x2="150" y2="170" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" />
                      <stop offset="0.5" stopColor="#06B6D4" />
                      <stop offset="1" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating DNA Helix Tag */}
                <div className="absolute top-6 right-4 glass-panel px-3 py-1.5 rounded-full border border-white/30 text-[11px] font-extrabold text-brand-cyan flex items-center gap-1 shadow-lg animate-float-slow">
                  <Activity className="w-3.5 h-3.5" />
                  <span>DNA Sequence Ready</span>
                </div>

                {/* Floating AI Triage Badge */}
                <div className="absolute bottom-6 left-4 glass-panel px-3 py-1.5 rounded-full border border-white/30 text-[11px] font-extrabold text-emerald-400 flex items-center gap-1 shadow-lg animate-float-medium">
                  <Award className="w-3.5 h-3.5" />
                  <span>99.4% Diagnostic Precision</span>
                </div>

              </div>
            </div>

            {/* Animated ECG Pulse Wave Banner below Illustration */}
            <div className="absolute -bottom-8 w-full glass-panel rounded-2xl p-3 border border-brand-cyan/30 shadow-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                <Heart className="w-4 h-4 text-rose-500 animate-ping" />
                <span>Live Cardiac ECG Waveform</span>
              </div>
              <svg className="w-36 h-8 text-brand-cyan" viewBox="0 0 150 40">
                <path
                  d="M0,20 L30,20 L40,5 L50,35 L60,10 L70,25 L80,20 L150,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="ecg-line"
                />
              </svg>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
