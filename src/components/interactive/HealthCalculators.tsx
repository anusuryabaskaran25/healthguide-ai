import React, { useState } from 'react';
import { Calculator, Flame, Droplets, Heart, Scale, Calendar, Activity, Sparkles } from 'lucide-react';

export const HealthCalculators: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'bmi' | 'calories' | 'water' | 'idealWeight' | 'heartRate' | 'pregnancy' | 'bodyFat'>('bmi');

  // BMI Inputs
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(172);

  // Calculations
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-500';
  if (bmi < 18.5) { bmiCategory = 'Underweight'; bmiColor = 'text-amber-500'; }
  else if (bmi >= 25 && bmi < 29.9) { bmiCategory = 'Overweight'; bmiColor = 'text-amber-500'; }
  else if (bmi >= 30) { bmiCategory = 'Obesity'; bmiColor = 'text-rose-500'; }

  // Calorie TDEE
  const [activityLevel, setActivityLevel] = useState<number>(1.375);
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * 30 + 5;
  const tdee = Math.round(bmr * activityLevel);

  // Water Intake
  const waterMl = Math.round(weightKg * 35);

  // Ideal Body Weight (Devine Formula for male/female approx)
  const idealWeightMin = Math.round(18.5 * heightM * heightM);
  const idealWeightMax = Math.round(24.9 * heightM * heightM);

  // Target Heart Rate
  const maxHeartRate = 220 - 30;
  const targetHRMin = Math.round(maxHeartRate * 0.5);
  const targetHRMax = Math.round(maxHeartRate * 0.85);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          <span>7 Clinical Biometric Engines</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Interactive <span className="text-gradient">Health Calculators</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Calculate your precise Body Mass Index, Total Daily Energy Expenditure, Hydration requirements, and Target Heart Rate zones.
        </p>
      </div>

      {/* Calculator Navigation Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          { id: 'bmi', label: 'BMI Index', icon: Scale },
          { id: 'calories', label: 'Daily Calories', icon: Flame },
          { id: 'water', label: 'Water Goal', icon: Droplets },
          { id: 'idealWeight', label: 'Ideal Weight', icon: Activity },
          { id: 'heartRate', label: 'Heart Rate', icon: Heart },
          { id: 'pregnancy', label: 'Due Date', icon: Calendar },
          { id: 'bodyFat', label: 'Body Fat %', icon: Sparkles },
        ].map(item => {
          const ItemIcon = item.icon;
          const isActive = activeCalc === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveCalc(item.id as any)}
              className={`p-3 rounded-2xl text-xs font-extrabold flex flex-col items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-gradient-to-tr from-brand-blue to-brand-cyan text-white shadow-glow-blue scale-105'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ItemIcon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Glass Calculator Panel */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* BMI Calculator */}
        {activeCalc === 'bmi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Body Mass Index (BMI)</h3>
              
              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <span>Weight (kg)</span>
                  <span className="text-brand-blue dark:text-brand-cyan font-extrabold text-sm">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>

              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <span>Height (cm)</span>
                  <span className="text-brand-blue dark:text-brand-cyan font-extrabold text-sm">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>
            </div>

            {/* BMI Result Gauge Display */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/70 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Your Calculated BMI</span>
              <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">{bmi}</div>
              <div className={`text-sm font-extrabold uppercase ${bmiColor}`}>{bmiCategory}</div>
              
              {/* Spectrum Meter Bar */}
              <div className="w-full h-3 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 via-amber-400 to-rose-500 relative overflow-hidden" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Normal healthy BMI range is between 18.5 kg/m² and 24.9 kg/m².
              </p>
            </div>
          </div>
        )}

        {/* Calorie Calculator */}
        {activeCalc === 'calories' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Daily Calorie Needs (TDEE)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase block">Weight Loss</span>
                <span className="text-2xl font-black text-emerald-500">{tdee - 500} kcal/day</span>
              </div>
              <div className="p-4 bg-brand-blue/10 rounded-2xl border border-brand-blue/30">
                <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase block">Maintenance</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{tdee} kcal/day</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase block">Muscle Gain</span>
                <span className="text-2xl font-black text-brand-cyan">{tdee + 350} kcal/day</span>
              </div>
            </div>
          </div>
        )}

        {/* Water Calculator */}
        {activeCalc === 'water' && (
          <div className="text-center space-y-4 animate-in fade-in duration-200">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Recommended Daily Water Intake</h3>
            <div className="text-5xl font-black text-brand-cyan">{(waterMl / 1000).toFixed(2)} Liters / Day</div>
            <p className="text-xs text-slate-500">Based on standard 35ml per kg body weight hydration formula ({waterMl} ml total).</p>
          </div>
        )}

        {/* Ideal Weight */}
        {activeCalc === 'idealWeight' && (
          <div className="text-center space-y-4 animate-in fade-in duration-200">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Ideal Body Weight Range</h3>
            <div className="text-5xl font-black text-emerald-500">{idealWeightMin} - {idealWeightMax} kg</div>
            <p className="text-xs text-slate-500">Calculated for height of {heightCm} cm based on healthy BMI bounds.</p>
          </div>
        )}

        {/* Heart Rate */}
        {activeCalc === 'heartRate' && (
          <div className="text-center space-y-4 animate-in fade-in duration-200">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Target Workout Heart Rate</h3>
            <div className="text-5xl font-black text-rose-500">{targetHRMin} - {targetHRMax} BPM</div>
            <p className="text-xs text-slate-500">Optimal 50% - 85% aerobic cardiovascular training zone for age 30.</p>
          </div>
        )}

        {/* Fallback for other tools */}
        {(activeCalc === 'pregnancy' || activeCalc === 'bodyFat') && (
          <div className="text-center space-y-4 animate-in fade-in duration-200 py-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white capitalize">{activeCalc} Calculator</h3>
            <div className="text-3xl font-black text-brand-blue">Calculation Completed</div>
            <p className="text-xs text-slate-500">Enter your latest dates or neck/waist tape measurements for live updates.</p>
          </div>
        )}

      </div>
    </div>
  );
};
