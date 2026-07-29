import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { CanvasBackground } from './components/animations/CanvasBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { HeroSection } from './components/hero/HeroSection';
import { SymptomChecker } from './components/ai/SymptomChecker';
import { AIChatbot } from './components/ai/AIChatbot';
import { MealPlanner } from './components/ai/MealPlanner';
import { FitnessCoach } from './components/ai/FitnessCoach';
import { DiseasesHub } from './components/hub/DiseasesHub';
import { MedicinesHub } from './components/hub/MedicinesHub';
import { LabTestsHub } from './components/hub/LabTestsHub';
import { DemographicHubs } from './components/hub/DemographicHubs';
import { HealthCalculators } from './components/interactive/HealthCalculators';
import { FirstAidGuideComponent } from './components/interactive/FirstAidGuide';
import { MentalHealthSanctuary } from './components/interactive/MentalHealthSanctuary';
import { HealthArticles } from './components/content/HealthArticles';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { 
  Stethoscope, 
  BookOpen, 
  Calculator, 
  AlertCircle, 
  Sparkles, 
  HelpCircle,
  MessageSquareQuote,
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useHealth();

  return (
    <main className="relative z-10 min-h-screen">
      {activeTab === 'home' && (
        <div className="space-y-16">
          <HeroSection />

          {/* Quick AI Diagnostic Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl border border-brand-blue/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan text-xs font-bold uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" />
                  <span>Interactive AI Triage</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Feeling unwell? Get preliminary AI symptom guidance in <span className="text-gradient">60 seconds</span>.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our neural network analyzes your symptom combinations, age factors, and severity level to provide instant triage recommendations.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('symptom-checker')}
                className="px-8 py-4 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-emerald text-white text-sm font-black rounded-2xl shadow-glow-blue hover:opacity-95 transition-all shrink-0 flex items-center gap-2"
              >
                <span>Launch Symptom Checker</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* Featured Sections Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Comprehensive <span className="text-gradient">Clinical Modules</span>
              </h2>
              <p className="text-sm text-slate-500">Everything you need for personal, family, and emergency healthcare.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Disease Encyclopedia', desc: 'Detailed guides on 100+ conditions with symptoms & home care.', tab: 'diseases', icon: BookOpen, color: 'text-brand-blue' },
                { title: '7 Health Calculators', desc: 'Instant BMI, Daily Calories, Hydration, & Target Heart Rate.', tab: 'calculators', icon: Calculator, color: 'text-brand-cyan' },
                { title: 'Emergency First Aid', desc: 'CPR beat metronome, choking Heimlich maneuver, & burn care.', tab: 'first-aid', icon: AlertCircle, color: 'text-rose-500' },
              ].map((card, i) => {
                const CardIcon = card.icon;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveTab(card.tab as any)}
                    className="glass-card rounded-3xl p-8 cursor-pointer space-y-4 group hover:border-brand-blue transition-all"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${card.color}`}>
                      <CardIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{card.desc}</p>
                    <div className="pt-2 flex items-center text-xs font-bold text-brand-blue dark:text-brand-cyan gap-1">
                      <span>Explore Module</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Testimonials & FAQs Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Trusted by <span className="text-gradient">Patients & Physicians</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-3xl space-y-3">
                <MessageSquareQuote className="w-8 h-8 text-brand-cyan" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "HealthGuide AI’s symptom checker provided clear triage guidance when my daughter developed a high fever at night. The CPR metronome tool is phenomenal."
                </p>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block">- Maria S., Registered Nurse</span>
              </div>

              <div className="glass-card p-6 rounded-3xl space-y-3">
                <MessageSquareQuote className="w-8 h-8 text-brand-emerald" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "The interactive drug directory and lab test normal range interpreter save me hours of explaining complex lab values to patients."
                </p>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block">- Dr. David Sterling, Internal Medicine</span>
              </div>
            </div>
          </section>

        </div>
      )}

      {activeTab === 'symptom-checker' && <SymptomChecker />}
      {activeTab === 'diseases' && <DiseasesHub />}
      {activeTab === 'medicines' && <MedicinesHub />}
      {activeTab === 'calculators' && <HealthCalculators />}
      {activeTab === 'first-aid' && <FirstAidGuideComponent />}
      {activeTab === 'demographics' && <DemographicHubs />}
      {activeTab === 'mental-health' && <MentalHealthSanctuary />}
      {activeTab === 'lab-tests' && <LabTestsHub />}
      {activeTab === 'ai-tools' && (
        <div className="space-y-12">
          <AIChatbot />
          <MealPlanner />
          <FitnessCoach />
        </div>
      )}
      {activeTab === 'articles' && <HealthArticles />}
      {activeTab === 'dashboard' && <UserDashboard />}
      {activeTab === 'admin' && <AdminDashboard />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <HealthProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300">
        <CanvasBackground />
        <Navbar />
        <SearchModal />
        <MainContent />
        <Footer />
      </div>
    </HealthProvider>
  );
};

export default App;
