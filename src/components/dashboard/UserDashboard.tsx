import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Activity, 
  Pill, 
  Plus, 
  Check, 
  Trash2, 
  Bookmark, 
  Heart, 
  Droplets, 
  Flame, 
  Award,
  Download
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { DISEASES } from '../../data/diseasesData';

export const UserDashboard: React.FC = () => {
  const { 
    userMetrics, 
    updateUserMetrics, 
    reminders, 
    addReminder, 
    toggleReminderTaken, 
    deleteReminder,
    bookmarks,
    setActiveTab
  } = useHealth();

  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (medName.trim() && dosage.trim()) {
      addReminder({ medicineName: medName, dosage, time });
      setMedName('');
      setDosage('');
      setShowAddForm(false);
    }
  };

  const bookmarkedDiseases = DISEASES.filter(d => bookmarks.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Dashboard Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            <span>Personal Health Telemetry Center</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            User <span className="text-gradient">Health Dashboard</span>
          </h2>
        </div>

        <button
          onClick={() => alert('Full Health Metrics Summary Report downloaded!')}
          className="px-5 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-extrabold rounded-2xl shadow-glow-blue hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Medical Summary</span>
        </button>
      </div>

      {/* Top Telemetry Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Overall Score</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{userMetrics.healthScore} / 100</div>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Optimal Range</span>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Blood Pressure</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {userMetrics.bloodPressureSys}/{userMetrics.bloodPressureDia}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">mmHg Normal</span>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Hydration Log</span>
            <Droplets className="w-4 h-4 text-brand-cyan" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{userMetrics.waterIntakeMl} ml</div>
          <span className="text-[10px] text-brand-cyan font-bold">Goal: 2,500 ml</span>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Daily Steps</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{userMetrics.dailySteps}</div>
          <span className="text-[10px] text-amber-500 font-bold">84% of Goal</span>
        </div>

      </div>

      {/* Main Grid: Medicine Reminders + Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Pill Reminders */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">Active Reminders</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Medication Schedule</h3>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-2 bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Pill Alarm</span>
            </button>
          </div>

          {/* Add Reminder Form */}
          {showAddForm && (
            <form onSubmit={handleAddMed} className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in">
              <input
                type="text"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                placeholder="Medicine Name (e.g. Omeprazole 20mg)"
                required
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="Dosage (e.g. 1 Capsule)"
                  required
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Time (e.g. 08:00 AM)"
                  required
                  className="w-28 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-brand-cyan text-white text-xs font-bold rounded-xl shadow-glow-cyan"
              >
                Save Pill Schedule
              </button>
            </form>
          )}

          {/* Reminders List */}
          <div className="space-y-3">
            {reminders.map(rem => (
              <div
                key={rem.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  rem.takenToday
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-500'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleReminderTaken(rem.id)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      rem.takenToday ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {rem.takenToday && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <h4 className={`text-sm font-bold ${rem.takenToday ? 'line-through opacity-70' : ''}`}>
                      {rem.medicineName}
                    </h4>
                    <span className="text-xs text-slate-400">{rem.dosage} • {rem.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Bookmarks */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Saved Reading</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Bookmarked Guides</h3>
          </div>

          <div className="space-y-3">
            {bookmarkedDiseases.map(d => (
              <div
                key={d.id}
                onClick={() => setActiveTab('diseases')}
                className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center cursor-pointer hover:border-brand-blue transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{d.name}</h4>
                  <span className="text-[10px] text-slate-400">{d.category}</span>
                </div>
                <Bookmark className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
