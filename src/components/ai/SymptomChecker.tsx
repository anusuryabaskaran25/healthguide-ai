import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Download, 
  ShieldAlert, 
  Mic, 
  Sparkles, 
  Activity,
  Heart,
  HelpCircle
} from 'lucide-react';
import { DISEASES } from '../../data/diseasesData';

export const SymptomChecker: React.FC = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [selectedArea, setSelectedArea] = useState<string>('Head & Neck');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>('1-3 Days');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Moderate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);

  const bodyAreas = [
    { id: 'Head & Neck', icon: '🧠', symptoms: ['Headache', 'Dizziness', 'Sore Throat', 'Blurred Vision', 'Nosebleed'] },
    { id: 'Chest & Respiration', icon: '🫁', symptoms: ['Shortness of breath', 'Chest Pain', 'Coughing', 'Wheezing', 'Palpitations'] },
    { id: 'Abdomen & Digest', icon: '🫀', symptoms: ['Heartburn', 'Nausea', 'Abdominal Cramps', 'Diarrhea', 'Loss of Appetite'] },
    { id: 'Limbs & Joints', icon: '🦴', symptoms: ['Joint Pain', 'Muscle Aches', 'Swelling', 'Numbness', 'Back Stiffness'] },
    { id: 'Systemic / Whole Body', icon: '🌡️', symptoms: ['Fever', 'Fatigue', 'Night Sweats', 'Unexplained Weight Loss', 'Chills'] },
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSimulateVoiceInput = () => {
    setVoiceListening(true);
    setTimeout(() => {
      setVoiceListening(false);
      setSelectedSymptoms(['Headache', 'Nausea', 'Dizziness']);
    }, 2500);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setAnalyzed(false);
  };

  // Matched Conditions Calculation
  const matchedDiseases = DISEASES.filter(d => 
    d.symptoms.some(s => selectedSymptoms.some(userS => s.toLowerCase().includes(userS.toLowerCase())))
  ).slice(0, 3);

  const urgencyBadge = severity === 'Severe'
    ? { level: 'EMERGENCY TRIAGE', color: 'bg-rose-500 text-white', advice: 'Seek immediate evaluation at an Urgent Care or ER.' }
    : severity === 'Moderate'
    ? { level: 'MODERATE CARE', color: 'bg-amber-500 text-white', advice: 'Schedule an appointment with a primary physician within 24-48 hours.' }
    : { level: 'LOW URGENCY', color: 'bg-emerald-500 text-white', advice: 'Monitor symptoms with home care; consult a doctor if condition worsens.' };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4" />
          <span>Interactive Clinical AI Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          AI Symptom <span className="text-gradient">Diagnostic Triage</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Answer a few quick questions about your symptoms to receive an instant preliminary diagnostic probability breakdown and home-care guidance.
        </p>
      </div>

      {/* Main Glass Card Wrapper */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        
        {/* Step Indicator Bar */}
        {!analyzed && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-brand-blue dark:text-brand-cyan uppercase tracking-wider">Step {step} of 3</span>
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-8 h-2 rounded-full transition-all ${
                    i <= step ? 'bg-gradient-to-r from-brand-blue to-brand-cyan' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Basic Profile (Age, Gender, Body Area) */}
        {step === 1 && !analyzed && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>1. Basic Profile & Primary Affected Area</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age Slider */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex justify-between">
                  <span>Your Age</span>
                  <span className="text-brand-blue dark:text-brand-cyan text-sm">{age} Years Old</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>

              {/* Gender Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Biological Gender
                </label>
                <div className="flex space-x-2">
                  {(['female', 'male', 'other'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                        gender === g
                          ? 'bg-brand-blue text-white shadow-glow-blue'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Select Affected Body Region */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Select Body System
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {bodyAreas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                      selectedArea === area.id
                        ? 'border-brand-blue bg-brand-blue/10 text-brand-blue dark:text-brand-cyan shadow-glow-blue'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl">{area.icon}</span>
                    <span className="text-xs font-bold">{area.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs sm:text-sm font-bold rounded-xl shadow-glow-blue hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span>Continue to Symptoms</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Symptoms Selection & Voice Simulation */}
        {step === 2 && !analyzed && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                2. Select Symptoms for <span className="text-brand-blue dark:text-brand-cyan">{selectedArea}</span>
              </h3>
              
              {/* Simulated Voice Input Button */}
              <button
                onClick={handleSimulateVoiceInput}
                disabled={voiceListening}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  voiceListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{voiceListening ? 'Listening to voice...' : 'Dictate Symptoms by Voice'}</span>
              </button>
            </div>

            {/* Checklist Chips */}
            <div className="flex flex-wrap gap-2.5">
              {bodyAreas.find(a => a.id === selectedArea)?.symptoms.map(s => {
                const isSelected = selectedSymptoms.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => handleSymptomToggle(s)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-glow-blue'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-blue/50'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-30'}`} />
                    <span>{s}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-200 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                disabled={selectedSymptoms.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs sm:text-sm font-bold rounded-xl shadow-glow-blue hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <span>Continue to Duration & Severity</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Duration & Severity */}
        {step === 3 && !analyzed && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              3. Duration & Pain / Discomfort Severity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Duration */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Symptom Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['< 24 Hours', '1-3 Days', '4-7 Days', 'More than 1 Week'].map(d => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                        duration === d
                          ? 'bg-brand-blue text-white shadow-glow-blue'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Severity Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mild', 'Moderate', 'Severe'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                        severity === s
                          ? s === 'Severe' ? 'bg-rose-500 text-white' : s === 'Moderate' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Summary Chips */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Summary of Selected Inputs:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue dark:text-brand-cyan rounded-lg font-semibold">
                  {age} y/o {gender}
                </span>
                <span className="px-2.5 py-1 bg-brand-cyan/10 text-brand-cyan rounded-lg font-semibold">
                  {selectedArea}
                </span>
                {selectedSymptoms.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-200 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="px-8 py-3.5 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-emerald text-white text-sm font-black rounded-2xl shadow-glow-blue hover:opacity-95 transition-all flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Neural Medical Graph...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    <span>Generate AI Diagnostic Triage</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* RESULTS REPORT CARD */}
        {analyzed && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                  AI Triage Report Generated
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Diagnostic Breakdown & Care Plan
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start New Scan</span>
                </button>
                <button
                  onClick={() => alert('Medical Triage PDF report download initiated!')}
                  className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-xl shadow-glow-blue hover:bg-brand-darkBlue flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Urgency Badge Alert */}
            <div className={`p-4 rounded-2xl flex items-center justify-between ${urgencyBadge.color} shadow-lg`}>
              <div className="flex items-center space-x-3">
                <ShieldAlert className="w-6 h-6 shrink-0" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider">{urgencyBadge.level}</div>
                  <div className="text-xs font-semibold">{urgencyBadge.advice}</div>
                </div>
              </div>
            </div>

            {/* Condition Match List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Top Probable Medical Conditions ({matchedDiseases.length} Matches)
              </h4>

              <div className="grid grid-cols-1 gap-4">
                {matchedDiseases.map((d, index) => (
                  <div key={d.id} className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-extrabold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">{d.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300">
                          {d.category}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-500">
                        {95 - index * 12}% AI Confidence Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{d.summary}</p>
                    <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="font-bold text-slate-500">Matching Symptoms:</span>
                      {d.symptoms.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded font-semibold">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Advice & Next Steps */}
            <div className="p-4 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-2xl border border-brand-blue/30 text-xs space-y-1">
              <span className="font-extrabold text-brand-blue dark:text-brand-cyan block uppercase">
                Clinical Recommendation:
              </span>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                Consult with a qualified internal medicine specialist or neurologist. Keep a log of symptom onset times, temperature readings, and dietary factors prior to your appointment.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
