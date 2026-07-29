import React, { useState } from 'react';
import { Utensils, Flame, Sparkles, CheckCircle2, HeartPulse } from 'lucide-react';

export const MealPlanner: React.FC = () => {
  const [dietType, setDietType] = useState('Balanced Mediterranean');
  const [targetCalories, setTargetCalories] = useState(2000);
  const [generated, setGenerated] = useState(false);

  const mealPlan = {
    breakfast: { title: 'Avocado & Whole-Grain Toast with Poached Eggs', cals: 420, protein: '22g', carbs: '38g', fat: '18g' },
    lunch: { title: 'Grilled Salmon Quinoa Bowl with Steamed Broccoli', cals: 580, protein: '42g', carbs: '45g', fat: '20g' },
    snack: { title: 'Greek Yogurt with Mixed Berries & Chia Seeds', cals: 210, protein: '15g', carbs: '20g', fat: '5g' },
    dinner: { title: 'Herb-Roasted Chicken Breast with Sweet Potato Mash', cals: 610, protein: '48g', carbs: '50g', fat: '16g' },
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-bold uppercase tracking-wider">
          <Utensils className="w-4 h-4" />
          <span>AI Nutrition & Meal Engine</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          AI Meal & <span className="text-gradient">Diet Generator</span>
        </h2>
      </div>

      <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Dietary Preference
            </label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
            >
              <option>Balanced Mediterranean</option>
              <option>High Protein Muscle Building</option>
              <option>Low Carb Keto</option>
              <option>Plant-Based Vegan</option>
              <option>Diabetic-Friendly Glycemic Control</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex justify-between">
              <span>Daily Calorie Target</span>
              <span className="text-brand-emerald font-extrabold">{targetCalories} kcal</span>
            </label>
            <input
              type="range"
              min="1200"
              max="3500"
              step="50"
              value={targetCalories}
              onChange={(e) => setTargetCalories(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
            />
          </div>
        </div>

        <button
          onClick={() => setGenerated(true)}
          className="w-full py-3.5 bg-gradient-to-r from-brand-emerald to-brand-cyan text-white text-xs sm:text-sm font-black rounded-2xl shadow-glow-emerald hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Customized Weekly AI Meal Plan</span>
        </button>

        {/* Generated Meal Cards */}
        {generated && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-300">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Recommended Daily Menu ({dietType})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(mealPlan).map(([mealKey, data]) => (
                <div key={mealKey} className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-brand-emerald tracking-wider">{mealKey}</span>
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {data.cals} kcal
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{data.title}</h5>
                  <div className="flex space-x-3 text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                    <span>Protein: {data.protein}</span>
                    <span>Carbs: {data.carbs}</span>
                    <span>Fat: {data.fat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
