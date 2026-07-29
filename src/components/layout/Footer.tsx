import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Send, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram 
} from 'lucide-react';
import { useHealth, NavTab } from '../../context/HealthContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useHealth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Background Animated Gradient Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-emerald p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                HealthGuide <span className="text-gradient">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering global healthcare with next-generation artificial intelligence, real-time diagnostic guidance, evidence-based medical encyclopedias, and preventive wellness tracking.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Join HealthGuide AI Dispatch
              </span>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-medium p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for weekly AI health digests.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-l-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-r-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Hub Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-blue pl-2">
              Diagnostic & AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'symptom-checker', label: 'AI Symptom Checker' },
                { id: 'calculators', label: '7 Health Calculators' },
                { id: 'ai-tools', label: 'AI Meal & Fitness Coach' },
                { id: 'lab-tests', label: 'Lab Results Interpreter' },
                { id: 'dashboard', label: 'Personal Health Score' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveTab(link.id as NavTab)}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Encyclopedias */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-cyan pl-2">
              Medical Directory
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'diseases', label: 'Diseases & Conditions' },
                { id: 'medicines', label: 'Drugs & Prescription Guide' },
                { id: 'first-aid', label: 'Emergency First Aid' },
                { id: 'demographics', label: 'Women & Child Health' },
                { id: 'mental-health', label: 'Mental Health Sanctuary' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveTab(link.id as NavTab)}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              <span>Emergency Hotlines</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-rose-950/40 border border-rose-800/40 rounded-xl">
                <span className="text-[10px] text-rose-300 font-semibold block">US / International Emergency</span>
                <a href="tel:911" className="text-sm font-extrabold text-white hover:text-rose-400">
                  Call 911 / 112
                </a>
              </div>
              <div className="p-2.5 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
                <span className="text-[10px] text-indigo-300 font-semibold block">Suicide & Crisis Helpline</span>
                <a href="tel:988" className="text-sm font-extrabold text-white hover:text-indigo-400">
                  Call or Text 988
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer Banner */}
        <div className="my-8 p-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl flex items-start space-x-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-slate-200">Important Medical Disclaimer: </span>
            HealthGuide AI provides informational healthcare resources and AI-assisted preliminary triage insights. Content on this platform does not constitute professional medical diagnosis, treatment, or advice. Always consult a qualified physician or healthcare provider regarding any medical symptoms or condition.
          </div>
        </div>

        {/* Bottom Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">HealthGuide AI</span>. Designed with futuristic healthcare aesthetics. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-brand-cyan transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-cyan transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-cyan transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-cyan transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};
