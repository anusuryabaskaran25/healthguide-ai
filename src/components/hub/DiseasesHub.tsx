import React, { useState } from 'react';
import { Heart, Search, Filter, Bookmark, Check, ShieldAlert, X, ChevronRight, HelpCircle } from 'lucide-react';
import { DISEASES, Disease } from '../../data/diseasesData';
import { useHealth } from '../../context/HealthContext';

export const DiseasesHub: React.FC = () => {
  const { isBookmarked, toggleBookmark } = useHealth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalDisease, setActiveModalDisease] = useState<Disease | null>(null);

  const categories = ['All', 'Cardiology', 'Endocrinology', 'Pulmonology', 'Neurology', 'Gastroenterology', 'Mental Health'];

  const filteredDiseases = DISEASES.filter(d => {
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4" />
          <span>Verified Clinical Knowledge Directory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Diseases & <span className="text-gradient">Medical Conditions</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Explore evidence-based medical summaries, symptoms, diagnostic protocols, treatments, and home care recommendations.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by disease name, symptom, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-glow-blue'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map(disease => {
          const bookmarked = isBookmarked(disease.id);
          return (
            <div
              key={disease.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={disease.image}
                  alt={disease.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <button
                  onClick={() => toggleBookmark(disease.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    bookmarked ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs font-bold text-white">
                  <span className="px-2.5 py-1 rounded-full bg-brand-blue/80 backdrop-blur-md">
                    {disease.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/80 backdrop-blur-md">
                    {disease.severity}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                    {disease.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {disease.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {disease.symptoms.length} Symptoms Listed
                  </span>
                  <button
                    onClick={() => setActiveModalDisease(disease)}
                    className="px-4 py-2 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-cyan font-bold text-xs rounded-xl hover:bg-brand-blue hover:text-white transition-all flex items-center gap-1"
                  >
                    <span>View Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal View */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                  {activeModalDisease.category} • {activeModalDisease.severity} Severity
                </span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{activeModalDisease.name}</h3>
              </div>
              <button
                onClick={() => setActiveModalDisease(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{activeModalDisease.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-brand-blue">Key Symptoms</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {activeModalDisease.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-brand-cyan">Causes & Risk Factors</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {activeModalDisease.causes.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-brand-emerald">Medical Treatments</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {activeModalDisease.treatment.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-amber-500">Home Care & Prevention</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {activeModalDisease.homeCare.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Doctor Consultation Advice:</span>
                {activeModalDisease.doctorAdvice}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
