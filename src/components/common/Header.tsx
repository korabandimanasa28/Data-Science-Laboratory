import React from 'react';
import {
  Menu,
  Bell,
  Check,
  Trash2,
  X,
  User,
  FlaskConical,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    studentProfile,
    currentUser,
    isAdmin,
    setIsMobileNavOpen,
    selectedExperiment,
    selectedSubExperiment,
    notifications,
    isNotificationPanelOpen,
    setIsNotificationPanelOpen,
    markAllNotificationsAsRead,
    clearAllNotifications,
    unreadNotificationsCount,
    logout,
    settings,
    updateSettings,
  } = useLab();

  const isDark = settings.theme === 'dark';

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? 'light' : 'dark' });
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Home';
      case 'profile':
        return 'Student Profile';
      case 'experiments':
        return 'Experiments';
      case 'sub-experiments':
        return selectedExperiment ? selectedExperiment.title : 'Sub-Experiments';
      case 'sub-experiment-workspace':
        return selectedSubExperiment ? selectedSubExperiment.name : 'Workspace';
      case 'lab-record':
        return 'Data Science Laboratory Record';
      case 'tools':
        return 'Tools';
      case 'modules':
        return 'Learning Modules';
      case 'projects':
        return 'Projects';
      case 'resume':
        return 'Resume';
      case 'settings':
        return 'Settings';
      default:
        return 'Home';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 px-6 sm:px-8 flex items-center justify-between bg-white text-black border-b border-black/10 shadow-xs print:hidden">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-2 rounded-lg text-black hover:text-[#E91E63] hover:bg-[#FCE4EC] transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-sm min-w-0">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 font-bold transition-opacity hover:opacity-90 shrink-0 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#E91E63] text-white flex items-center justify-center text-xs shadow-xs">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight text-black hidden sm:inline">
              DS Lab
            </span>
          </button>
          <ChevronRight className="w-4 h-4 text-black/40 shrink-0" />
          <span className="font-semibold text-black truncate max-w-[220px] sm:max-w-lg text-sm sm:text-base">
            {getPageTitle()}
          </span>
        </div>
      </div>

      {/* Right: Theme Toggle + Notifications + Student Profile + Logout */}
      <div className="flex items-center gap-2.5 shrink-0 relative">
        {/* Global Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-black/15 text-black hover:text-[#E91E63] hover:border-[#E91E63] hover:bg-[#FCE4EC] transition-colors cursor-pointer"
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#E91E63]" />
          ) : (
            <Moon className="w-4 h-4 text-[#E91E63]" />
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
            className="p-2 rounded-lg border border-black/15 text-black hover:text-[#E91E63] hover:border-[#E91E63] hover:bg-[#FCE4EC] transition-colors relative cursor-pointer"
            title="Notifications"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4 text-[#E91E63]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E91E63] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {isNotificationPanelOpen && (
            <div className="absolute right-0 top-12 w-84 sm:w-92 rounded-2xl shadow-2xl border border-black/15 bg-white text-black z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="p-4 border-b border-black/10 flex items-center justify-between bg-[#FCE4EC]/50">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#E91E63]" />
                  <span className="text-xs font-bold text-black uppercase tracking-wider">
                    Notifications ({notifications.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-[#E91E63] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-black/60 hover:text-black font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsNotificationPanelOpen(false)}
                    className="p-1 rounded text-black/60 hover:text-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-black/10 p-2">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-black/60 text-xs">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl transition-colors ${
                        n.read ? 'bg-transparent' : 'bg-[#FCE4EC]/40 border border-[#E91E63]/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-bold text-black">
                          {n.title}
                        </div>
                        <span className="text-[10px] font-mono text-black/60 shrink-0">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-black/80 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Student Profile Quick Nav */}
        <button
          onClick={() => setCurrentPage('profile')}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-black/15 hover:border-[#E91E63] hover:bg-[#FCE4EC] transition-colors cursor-pointer text-black"
        >
          {studentProfile.avatarUrl ? (
            <img
              src={studentProfile.avatarUrl}
              alt={studentProfile.name}
              className="w-6 h-6 rounded-full object-cover border border-[#E91E63]"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#FCE4EC] border border-[#E91E63] text-[#E91E63] flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5 text-[#E91E63]" />
            </div>
          )}
          <div className="hidden md:flex items-center gap-1.5 truncate max-w-[170px]">
            <span className="text-xs font-semibold truncate text-black">
              {currentUser?.name || studentProfile.name || 'User'}
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase shrink-0 ${
                isAdmin
                  ? 'bg-[#E91E63] text-white border-[#E91E63]'
                  : 'bg-[#FCE4EC] text-black border-[#E91E63]/30'
              }`}
            >
              {isAdmin ? 'ADMIN' : 'STUDENT'}
            </span>
          </div>
        </button>

        {/* Logout Quick Button */}
        <button
          onClick={logout}
          className="p-2 rounded-lg border border-black/15 text-black hover:text-[#E91E63] hover:border-[#E91E63] hover:bg-[#FCE4EC] transition-colors cursor-pointer"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 text-[#E91E63]" />
        </button>
      </div>
    </header>
  );
};
