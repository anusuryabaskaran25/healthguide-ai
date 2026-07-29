import React, { createContext, useContext, useState, useEffect } from 'react';

export type NavTab = 
  | 'home'
  | 'symptom-checker'
  | 'diseases'
  | 'medicines'
  | 'calculators'
  | 'first-aid'
  | 'demographics'
  | 'mental-health'
  | 'lab-tests'
  | 'ai-tools'
  | 'articles'
  | 'dashboard'
  | 'admin';

export interface PillReminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  takenToday: boolean;
}

export interface UserHealthMetrics {
  healthScore: number;
  weight: number;
  height: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  waterIntakeMl: number;
  dailySteps: number;
}

interface HealthContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  reminders: PillReminder[];
  addReminder: (reminder: Omit<PillReminder, 'id' | 'takenToday'>) => void;
  toggleReminderTaken: (id: string) => void;
  deleteReminder: (id: string) => void;
  userMetrics: UserHealthMetrics;
  updateUserMetrics: (metrics: Partial<UserHealthMetrics>) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  notifications: { id: string; title: string; message: string; time: string; read: boolean }[];
  markNotificationRead: (id: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(['hypertension', 'amoxicillin', 'cpr-adult']);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  // Medicine Reminders
  const [reminders, setReminders] = useState<PillReminder[]>([
    { id: '1', medicineName: 'Amoxicillin 500mg', dosage: '1 Capsule', time: '08:00 AM', takenToday: true },
    { id: '2', medicineName: 'Metformin 850mg', dosage: '1 Tablet with lunch', time: '01:30 PM', takenToday: false },
    { id: '3', medicineName: 'Omega-3 Fish Oil', dosage: '2 Softgels', time: '08:00 PM', takenToday: false },
  ]);

  const addReminder = (reminderData: Omit<PillReminder, 'id' | 'takenToday'>) => {
    const newReminder: PillReminder = {
      ...reminderData,
      id: Date.now().toString(),
      takenToday: false,
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const toggleReminderTaken = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, takenToday: !r.takenToday } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  // User Health Profile Metrics
  const [userMetrics, setUserMetrics] = useState<UserHealthMetrics>({
    healthScore: 92,
    weight: 72,
    height: 175,
    bloodPressureSys: 118,
    bloodPressureDia: 78,
    waterIntakeMl: 2400,
    dailySteps: 8450,
  });

  const updateUserMetrics = (newMetrics: Partial<UserHealthMetrics>) => {
    setUserMetrics(prev => ({ ...prev, ...newMetrics }));
  };

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Medicine Reminder', message: 'Time to take Metformin 850mg', time: '10m ago', read: false },
    { id: '2', title: 'Daily Health Tip', message: 'Remember to drink 250ml water now!', time: '1h ago', read: false },
    { id: '3', title: 'Lab Results Ready', message: 'Your CBC blood panel summary is available.', time: '1d ago', read: true }
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <HealthContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        searchOpen,
        setSearchOpen,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        reminders,
        addReminder,
        toggleReminderTaken,
        deleteReminder,
        userMetrics,
        updateUserMetrics,
        soundEnabled,
        toggleSound,
        notifications,
        markNotificationRead,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
