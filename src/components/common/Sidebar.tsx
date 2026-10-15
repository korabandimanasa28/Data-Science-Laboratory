import React from 'react';
import {
  Home,
  User,
  FlaskConical,
  Wrench,
  BookOpen,
  FolderGit2,
  FileText,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { NavigationPage } from '../../types/lab';

interface NavItemConfig {
  id: NavigationPage;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    isMobileNavOpen,
    setIsMobileNavOpen,
    totalExperiments,
    tools,
    totalModules,
    projects,
    studentProfile,
    currentUser,
    isAdmin,
    logout,
  } = useLab();

  // Exactly as requested in Requirement 5:
  // Learning Modules -> Projects -> Resume -> Student Profile -> Settings
  const navItems: NavItemConfig[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'experiments',
      label: 'Experiments',
      icon: FlaskConical,
      badge: totalExperiments,
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: Wrench,
      badge: tools.length,
    },
    {
      id: 'modules',
      label: 'Learning Modules',
      icon: BookOpen,
      badge: totalModules,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderGit2,
      badge: projects.length,
    },
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
    },
    {
      id: 'profile',
      label: 'Student Profile',
      icon: User,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    setIsMobileNavOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white text-black select-none border-r border-black/10">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-black/10 bg-white">
        <button
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E91E63] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <FlaskConical className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-black flex items-center gap-1.5">
              <span>DS Lab</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" />
            </div>
            <div className="text-[11px] text-black/60 font-medium">
              Data Science Lab
            </div>
          </div>
        </button>

        {/* Mobile close */}
        <button
          onClick={() => setIsMobileNavOpen(false)}
          className="lg:hidden p-1.5 rounded-md text-black/60 hover:text-black hover:bg-[#FCE4EC] cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation items */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-black/60">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPage === item.id ||
            (item.id === 'experiments' &&
              (currentPage === 'sub-experiments' ||
                currentPage === 'sub-experiment-workspace' ||
                currentPage === 'lab-record'));

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E91E63] text-white shadow-xs font-bold'
                  : 'text-black hover:bg-[#FCE4EC] hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#E91E63]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`font-mono text-[11px] px-2 py-0.5 rounded font-bold tabular-nums ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : 'bg-[#FCE4EC] text-[#E91E63] border border-[#E91E63]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom: Student Profile preview & Logout */}
      <div className="p-3.5 border-t border-black/10 bg-white space-y-2.5">
        <button
          onClick={() => handleNavigate('profile')}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#FCE4EC] transition-colors text-left cursor-pointer border border-transparent hover:border-black/10"
        >
          {studentProfile.avatarUrl ? (
            <img
              src={studentProfile.avatarUrl}
              alt={studentProfile.name}
              className="w-8 h-8 rounded-full object-cover border border-[#E91E63] shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#FCE4EC] border border-[#E91E63] text-[#E91E63] flex items-center justify-center font-bold text-xs shrink-0">
              {studentProfile.name ? studentProfile.name.charAt(0).toUpperCase() : 'S'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-black truncate flex items-center justify-between">
              <span>{currentUser?.name || studentProfile.name || 'User'}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded border ${
                  isAdmin
                    ? 'bg-[#E91E63] text-white border-[#E91E63]'
                    : 'bg-[#FCE4EC] text-black border-[#E91E63]/30'
                }`}
              >
                {isAdmin ? 'ADMIN' : 'STUDENT'}
              </span>
              <span className="text-[10px] font-mono text-black/60 truncate">
                {studentProfile.rollNumber}
              </span>
            </div>
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-black/15 text-black hover:text-[#E91E63] hover:border-[#E91E63] hover:bg-[#FCE4EC] transition-colors text-xs font-semibold cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-[#E91E63]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar - compact width */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-0 h-screen z-20 print:hidden">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
