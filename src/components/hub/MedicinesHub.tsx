import React, { useState } from 'react';
import { Pill, Search, ShieldAlert, AlertCircle, X, Bookmark, ChevronRight } from 'lucide-react';
import { MEDICINES, Medicine } from '../../data/medicinesData';
import { useHealth } from '../../context/HealthContext';

export const MedicinesHub: React.FC = () => {
  const { isBookmarked, toggleBookmark } = useHealth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalMed, setActiveModalMed] = useState<Medicine | null>(null);

  const filteredMedicines = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Pill className="w-4 h-4" />
          <span>Pharmaceutical Index & Prescription Guide</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Medicines & <span className="text-gradient">Drug Directory</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Comprehensive medication guide showing therapeutic uses, age-specific dosages, side effects, drug interactions, and pregnancy safety.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medications by brand name, generic ingredient, or medical class..."
            className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map(med => {
          const bookmarked = isBookmarked(med.id);
          return (
            <div key={med.id} className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-brand-cyan uppercase tracking-wider block">
                      {med.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors">
                      {med.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold italic block">
                      ({med.genericName})
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(med.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      bookmarked ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-extrabold">
                  <span className={`px-2.5 py-1 rounded-full ${med.prescriptionRequired ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {med.prescriptionRequired ? 'Rx Prescription Required' : 'OTC Over The Counter'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {med.pregnancySafety}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Indicated for: </span>
                  {med.uses.join(', ')}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold">Dosage & Safety Specs</span>
                <button
                  onClick={() => setActiveModalMed(med)}
                  className="px-4 py-2 bg-brand-cyan/10 text-brand-cyan font-bold text-xs rounded-xl hover:bg-brand-cyan hover:text-white transition-all flex items-center gap-1"
                >
                  <span>Full Drug Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal View */}
      {activeModalMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">{activeModalMed.category}</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{activeModalMed.name}</h3>
                <span className="text-xs text-slate-400 font-semibold">{activeModalMed.genericName}</span>
              </div>
              <button onClick={() => setActiveModalMed(null)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-brand-blue uppercase">Adult Dosage</span>
                <p className="text-slate-800 dark:text-slate-200">{activeModalMed.dosage.adults}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-brand-cyan uppercase">Pediatric Dosage</span>
                <p className="text-slate-800 dark:text-slate-200">{activeModalMed.dosage.children}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-rose-500 uppercase block">Common Side Effects</span>
              <div className="flex flex-wrap gap-2">
                {activeModalMed.sideEffects.common.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-amber-500 block uppercase">Critical Warnings & Interactions:</span>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
                {activeModalMed.warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
