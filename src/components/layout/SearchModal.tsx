import React, { useState, useEffect } from 'react';
import { Search, X, Heart, Pill, Calculator, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useHealth, NavTab } from '../../context/HealthContext';
import { DISEASES } from '../../data/diseasesData';
import { MEDICINES } from '../../data/medicinesData';
import { LAB_TESTS } from '../../data/labTestsData';
import { FIRST_AID_GUIDES } from '../../data/firstAidData';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setActiveTab } = useHealth();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const filteredDiseases = query.trim()
    ? DISEASES.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.category.toLowerCase().includes(query.toLowerCase()))
    : DISEASES.slice(0, 3);

  const filteredMedicines = query.trim()
    ? MEDICINES.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.genericName.toLowerCase().includes(query.toLowerCase()))
    : MEDICINES.slice(0, 3);

  const filteredLabTests = query.trim()
    ? LAB_TESTS.filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
    : LAB_TESTS.slice(0, 2);

  const filteredFirstAid = query.trim()
    ? FIRST_AID_GUIDES.filter(f => f.title.toLowerCase().includes(query.toLowerCase()))
    : FIRST_AID_GUIDES.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] flex flex-col">
        
        {/* Search Header */}
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-6 h-6 text-brand-blue dark:text-brand-cyan shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diseases, medicines, lab tests, first aid..."
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-lg font-medium focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          
          {/* Diseases */}
          {filteredDiseases.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Diseases & Conditions</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredDiseases.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setActiveTab('diseases');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 transition-all text-left group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan">
                        {d.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{d.category} • {d.severity} Severity</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Medicines */}
          {filteredMedicines.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Pill className="w-4 h-4 text-cyan-500" />
                <span>Medicines & Prescription Guide</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredMedicines.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveTab('medicines');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-brand-cyan/10 dark:hover:bg-brand-cyan/20 transition-all text-left group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-cyan">
                        {m.name} ({m.genericName})
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{m.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lab Tests */}
          {filteredLabTests.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Laboratory Tests & Diagnostics</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredLabTests.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab('lab-tests');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-brand-emerald/10 dark:hover:bg-brand-emerald/20 transition-all text-left group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-emerald">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{t.code} • {t.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emergency First Aid */}
          {filteredFirstAid.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Emergency First Aid</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredFirstAid.map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setActiveTab('first-aid');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-rose-500/10 transition-all text-left group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-500">
                        {f.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{f.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Hint */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[11px] text-slate-400">
          <span>Press <kbd className="font-mono bg-slate-200 dark:bg-slate-800 px-1 rounded">ESC</kbd> to close</span>
          <span>Powered by HealthGuide AI Indexing</span>
        </div>

      </div>
    </div>
  );
};
