import React from 'react';
import { ShieldCheck, Activity, FileText, ChevronRight } from 'lucide-react';
import { LAB_TESTS } from '../../data/labTestsData';

export const LabTestsHub: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Clinical Diagnostics & Laboratory Reference</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Laboratory Tests & <span className="text-gradient">Normal Ranges Guide</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Understand your pathology report values (CBC, Lipid Panel, Thyroid TSH, ECG) with normal ranges and clinical interpretation keys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LAB_TESTS.map(test => (
          <div key={test.id} className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider">{test.code} • {test.category}</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{test.name}</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg">
                Report Time: {test.duration}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{test.summary}</p>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                Standard Reference Ranges:
              </span>
              <div className="space-y-2">
                {test.normalRanges.map((nr, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{nr.parameter}</span>
                      <span className="text-[10px] text-slate-400">{nr.description}</span>
                    </div>
                    <span className="font-mono font-bold text-brand-emerald bg-emerald-500/10 px-2 py-1 rounded">
                      {nr.range} {nr.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-xl border border-brand-blue/20 text-xs space-y-1">
              <span className="font-bold text-brand-blue dark:text-brand-cyan block">Pathology Interpretation:</span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px]">{test.interpretation.high}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
