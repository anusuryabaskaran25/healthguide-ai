import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  Menu, 
  X, 
  Stethoscope, 
  Pill, 
  Calculator, 
  AlertCircle, 
  Heart, 
  Brain, 
  FileText, 
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useHealth, NavTab } from '../../context/HealthContext';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    activeTab, 
    setActiveTab, 
    setSearchOpen,
    userMetrics,
    notifications,
    markNotificationRead,
    soundEnabled,
    toggleSound
  } = useHealth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const navLinks: { id: NavTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Activity },
    { id: 'symptom-checker', label: 'AI Symptom Checker', icon: Stethoscope },
    { id: 'diseases', label: 'Diseases Guide', icon: Heart },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'calculators', label: 'Health Calculators', icon: Calculator },
    { id: 'first-aid', label: 'First Aid', icon: AlertCircle },
    { id: 'mental-health', label: 'Mental Health', icon: Brain },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-emerald p-[2px] shadow-glow-blue transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-brand-darkNavy rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-brand-blue dark:text-brand-cyan animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                HealthGuide <span className="text-gradient">AI</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
                Futuristic Care
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.slice(0, 5).map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-cyan border border-brand-blue/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-blue dark:text-brand-cyan' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Dropdown Menu for More Sections */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <span>More Hubs</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1.5 tracking-wider">
                    Specialty Hubs
                  </div>
                  {[
                    { id: 'first-aid', label: 'Emergency First Aid', icon: AlertCircle, color: 'text-rose-500' },
                    { id: 'mental-health', label: 'Mental Health Sanctuary', icon: Brain, color: 'text-indigo-500' },
                    { id: 'demographics', label: 'Women, Men & Child Health', icon: Heart, color: 'text-pink-500' },
                    { id: 'lab-tests', label: 'Lab Tests & Imaging', icon: ShieldCheck, color: 'text-emerald-500' },
                    { id: 'articles', label: 'Articles & Blogs', icon: FileText, color: 'text-amber-500' },
                    { id: 'admin', label: 'Doctor / Admin Portal', icon: LayoutDashboard, color: 'text-cyan-500' },
                  ].map(item => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as NavTab);
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all text-left"
                      >
                        <ItemIcon className={`w-4 h-4 ${item.color}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Live Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 transition-all"
              title="Search Diseases, Drugs, Calculator (Cmd+K)"
            >
              <Search className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
              <span className="hidden md:inline">Search AI Guide...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 rounded shadow-xs border border-slate-200 dark:border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Sound Ambient Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title={soundEnabled ? 'Disable Audio Chimes' : 'Enable Audio Chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-brand-cyan" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative overflow-hidden group"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              {/* Notifications Drawer */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-3 shadow-2xl border border-slate-200 dark:border-slate-800 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Health Alerts
                    </span>
                    <span className="text-[10px] font-semibold bg-brand-blue/10 dark:bg-brand-cyan/20 text-brand-blue dark:text-brand-cyan px-2 py-0.5 rounded-full">
                      {unreadNotifCount} New
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                          n.read
                            ? 'bg-slate-50 dark:bg-slate-900/40 text-slate-500'
                            : 'bg-brand-blue/5 dark:bg-brand-cyan/10 border border-brand-blue/10 text-slate-800 dark:text-slate-200 font-medium'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-brand-blue dark:text-brand-cyan">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] leading-tight">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Health Score Badge */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full bg-gradient-to-r from-brand-blue/10 via-brand-cyan/10 to-brand-emerald/10 border border-brand-blue/20 hover:border-brand-cyan/40 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold shadow-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Score {userMetrics.healthScore}
                </span>
                <span className="text-[9px] text-emerald-500 font-semibold leading-tight">Optimal</span>
              </div>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
