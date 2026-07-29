import React from 'react';
import { LayoutDashboard, Users, Activity, ShieldCheck, CheckCircle2, AlertTriangle, FileText, BarChart3 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            <span>Clinical Platform Administration</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Admin & <span className="text-gradient">Medical Analytics</span>
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Platform Systems 99.99% Operational</span>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Monthly Patients', value: '142,850', icon: Users, color: 'text-brand-blue' },
          { label: 'AI Diagnostic Scans', value: '89,400', icon: Activity, color: 'text-brand-cyan' },
          { label: 'Verified Medical Articles', value: '1,024', icon: FileText, color: 'text-brand-emerald' },
          { label: 'Diagnostic Precision', value: '99.4%', icon: ShieldCheck, color: 'text-indigo-400' },
        ].map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <div key={i} className="glass-card p-5 rounded-3xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>{stat.label}</span>
                <StatIcon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Pending Medical Approvals */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-cyan" />
          <span>Pending Medical Advisory Board Review</span>
        </h3>

        <div className="space-y-3 text-xs">
          {[
            { title: 'GLP-1 Weight Loss Efficacy Meta-Analysis 2026', author: 'Dr. Sarah Jenkins', status: 'Pending Review' },
            { title: 'Pediatric Asthma Inhaler Dosage Protocol Update', author: 'Dr. Robert Vance', status: 'Approved by Advisory' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                <span className="text-slate-400">{item.author}</span>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 font-bold rounded-full">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
