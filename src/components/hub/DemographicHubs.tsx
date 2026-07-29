import React, { useState } from 'react';
import { Heart, ShieldCheck, UserCheck, Baby, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

export const DemographicHubs: React.FC = () => {
  const [activeDemographic, setActiveDemographic] = useState<'women' | 'men' | 'child' | 'senior'>('women');

  const vaccinationSchedule = [
    { age: 'Birth', vaccine: 'HepB (Dose 1), BCG, OPV 0' },
    { age: '6 Weeks', vaccine: 'DTaP-1, IPV-1, Hib-1, PCV-1, Rotavirus-1' },
    { age: '10 Weeks', vaccine: 'DTaP-2, IPV-2, Hib-2, PCV-2, Rotavirus-2' },
    { age: '14 Weeks', vaccine: 'DTaP-3, IPV-3, Hib-3, PCV-3' },
    { age: '9-12 Months', vaccine: 'MMR-1, Typhoid Conjugate' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Demographic & Life-Stage Healthcare</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Specialty <span className="text-gradient">Demographic Hubs</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Tailored clinical guidance for Women’s Health, Men’s Health, Child & Pediatric Development, and Senior Wellness.
        </p>
      </div>

      {/* Demographic Tabs Selector */}
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'women', label: "Women's Health", icon: Heart, color: 'text-pink-500' },
          { id: 'men', label: "Men's Health", icon: UserCheck, color: 'text-blue-500' },
          { id: 'child', label: 'Child & Pediatrics', icon: Baby, color: 'text-amber-500' },
          { id: 'senior', label: 'Senior & Aging', icon: ShieldCheck, color: 'text-emerald-500' },
        ].map(tab => {
          const TabIcon = tab.icon;
          const isActive = activeDemographic === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDemographic(tab.id as any)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl scale-105'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <TabIcon className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Women's Health Content */}
      {activeDemographic === 'women' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {[
            { title: 'Pregnancy & Prenatal Milestones', desc: 'Trimester-by-trimester fetal growth tracking, essential folic acid supplementation, and gestational diabetes screening.' },
            { title: 'PCOS & Hormonal Wellness', desc: 'Managing insulin resistance, regulating menstrual cycles, and dietary strategies for Polycystic Ovary Syndrome.' },
            { title: 'Breast Health & Mammography', desc: 'Monthly self-examination steps and recommended screening guidelines for women over 40.' },
            { title: 'Menopause & Bone Density', desc: 'Hormone replacement therapy options, calcium + D3 bone defense, and hot flash management.' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-3xl p-6 space-y-3">
              <span className="text-xs font-black text-pink-500 uppercase tracking-wider">Module {i + 1}</span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Men's Health Content */}
      {activeDemographic === 'men' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {[
            { title: 'Prostate Health & PSA Screenings', desc: 'Understanding Prostate-Specific Antigen blood test scores, BPH symptom relief, and preventative checkups.' },
            { title: 'Cardiovascular Strength & BP', desc: 'Managing arterial elasticity, lowering LDL cholesterol, and high-intensity aerobic exercise.' },
            { title: 'Hair Loss & Androgenetic Alopecia', desc: 'Evidence-based protocols for Minoxidil, Finasteride, and DHT blocker nutrition.' },
            { title: 'Testosterone & Hormonal Health', desc: 'Natural testosterone optimization through deep stage-3 sleep, heavy resistance training, and zinc.' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-3xl p-6 space-y-3">
              <span className="text-xs font-black text-blue-500 uppercase tracking-wider">Module {i + 1}</span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Child & Pediatric Content with Vaccination Chart */}
      {activeDemographic === 'child' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>Interactive Pediatric Vaccination Schedule</span>
            </h3>
            <div className="space-y-2">
              {vaccinationSchedule.map((v, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-amber-500 w-28">{v.age}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex-1">{v.vaccine}</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-1 rounded">Recommended</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Senior Health Content */}
      {activeDemographic === 'senior' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {[
            { title: 'Arthritis & Joint Flexibility', desc: 'Managing Osteoarthritis and Rheumatoid pain through low-impact aquatic therapy and anti-inflammatory diets.' },
            { title: 'Memory Care & Brain Neuroplasticity', desc: 'Cognitive brain training puzzles, Mediterranean diet, and early signs of Mild Cognitive Impairment (MCI).' },
            { title: 'Bone Density & DEXA Scans', desc: 'Osteopenia and Osteoporosis prevention through resistance loading and Vit D3 + K2.' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-3xl p-6 space-y-3">
              <span className="text-xs font-black text-emerald-500 uppercase tracking-wider">Module {i + 1}</span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
