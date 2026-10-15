import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  AppNotification,
  AppSettings,
  AuthUser,
  ExperimentFile,
  ExperimentItem,
  ExperimentStatus,
  ModuleItem,
  NavigationPage,
  ProjectItem,
  ResumeDocument,
  StudentProfile,
  SubExperimentItem,
  ToolItem,
  UserRole,
} from '../types/lab';
import {
  ADMIN_SECURITY_PASSCODE,
  DEFAULT_AUTH_USER,
  DEFAULT_EXPERIMENTS,
  DEFAULT_MODULES,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_PROJECTS,
  DEFAULT_RESUME,
  DEFAULT_SETTINGS,
  DEFAULT_STUDENT,
  DEFAULT_TOOLS,
  DEFAULT_USERS_DB,
  loadFromStorage,
  saveToStorage,
  STORAGE_KEYS,
  StoredUserAccount,
} from '../utils/storage';

interface LabContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedExperimentId: string | null;
  setSelectedExperimentId: (id: string | null) => void;
  selectedSubExperimentId: string | null;
  setSelectedSubExperimentId: (id: string | null) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;

  // Authentication & Role Permissions
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  isAdmin: boolean;
  login: (
    email: string,
    password: string,
    roleMode?: 'admin' | 'user'
  ) => { success: boolean; error?: string };
  signup: (
    email: string,
    password: string,
    name?: string,
    role?: 'admin' | 'user',
    adminPasscode?: string
  ) => { success: boolean; error?: string };
  logout: () => void;

  // Resume Document (Personal User Management)
  resume: ResumeDocument | null;
  uploadResume: (doc: Omit<ResumeDocument, 'id' | 'uploadDate'>) => void;
  deleteResume: () => void;

  // Notifications
  notifications: AppNotification[];
  isNotificationPanelOpen: boolean;
  setIsNotificationPanelOpen: (open: boolean) => void;
  addNotification: (title: string, message: string, type: AppNotification['type']) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  unreadNotificationsCount: number;

  // Student Profile (Personal User Information)
  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  setStudentAvatar: (dataUrl: string) => void;
  removeStudentAvatar: () => void;

  // Experiments (Admin Managed)
  experiments: ExperimentItem[];
  selectedExperiment: ExperimentItem | null;
  selectedSubExperiment: SubExperimentItem | null;
  addExperiment: (title?: string, description?: string, imageUrl?: string) => ExperimentItem | null;
  updateExperiment: (id: string, updates: Partial<ExperimentItem>) => void;
  deleteExperiment: (id: string) => void;
  selectExperiment: (id: string) => void;
  setExperimentImage: (expId: string, imageUrl: string) => void;

  // Sub-Experiments (Admin Managed)
  addSubExperiment: (expId: string, data?: Partial<SubExperimentItem>) => SubExperimentItem | null;
  updateSubExperiment: (expId: string, subId: string, updates: Partial<SubExperimentItem>) => void;
  deleteSubExperiment: (expId: string, subId: string) => void;
  selectSubExperiment: (expId: string, subId: string) => void;
  setSubExperimentImage: (expId: string, subId: string, imageUrl: string) => void;
  addSubExperimentFile: (expId: string, subId: string, file: Omit<ExperimentFile, 'id'>) => void;
  deleteSubExperimentFile: (expId: string, subId: string, fileId: string) => void;

  // Tools (Admin Managed)
  tools: ToolItem[];
  addTool: (tool: Omit<ToolItem, 'id'>) => ToolItem | null;
  updateTool: (id: string, updates: Partial<ToolItem>) => void;
  deleteTool: (id: string) => void;
  setToolImage: (toolId: string, imageUrl: string) => void;

  // Modules (Admin Managed)
  modules: ModuleItem[];
  addModule: (mod: Omit<ModuleItem, 'id' | 'createdAt' | 'updatedAt'>) => ModuleItem | null;
  updateModule: (id: string, updates: Partial<ModuleItem>) => void;
  deleteModule: (id: string) => void;
  setModuleImage: (moduleId: string, imageUrl: string) => void;
  setModuleVideo: (moduleId: string, videoUrl: string, videoName: string) => void;
  setModulePdf: (moduleId: string, pdfUrl: string, pdfName: string, pdfSize: string) => void;

  // Projects (Admin Managed Content & User Exploratory Portal)
  projects: ProjectItem[];
  addProject: (proj: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>) => ProjectItem | null;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  setProjectImage: (id: string, imageUrl: string) => void;

  // Settings & Storage (Admin Protected)
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  exportData: () => void;
  importData: (jsonData: string) => boolean;
  resetData: () => void;

  // Metrics
  totalExperiments: number;
  completedExperiments: number;
  inProgressExperiments: number;
  notStartedExperiments: number;
  experimentProgressPercent: number;
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  notStartedModules: number;
  moduleProgressPercent: number;
  overallProgressPercent: number;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

export const LabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [selectedSubExperimentId, setSelectedSubExperimentId] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  // Persistent States
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const loaded = loadFromStorage(STORAGE_KEYS.STUDENT, DEFAULT_STUDENT);
    return {
      ...DEFAULT_STUDENT,
      ...loaded,
      facultyName: loaded.facultyName || DEFAULT_STUDENT.facultyName,
      facultyDesignation: loaded.facultyDesignation || DEFAULT_STUDENT.facultyDesignation,
    };
  });

  const [experiments, setExperiments] = useState<ExperimentItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.EXPERIMENTS, DEFAULT_EXPERIMENTS)
  );

  const [tools, setTools] = useState<ToolItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.TOOLS, DEFAULT_TOOLS)
  );

  const [modules, setModules] = useState<ModuleItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.MODULES, DEFAULT_MODULES)
  );

  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS)
  );

  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS)
  );

  const [settings, setSettings] = useState<AppSettings>(() =>
    loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  const [usersDb, setUsersDb] = useState<StoredUserAccount[]>(() =>
    loadFromStorage(STORAGE_KEYS.USERS_DB, DEFAULT_USERS_DB)
  );

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() =>
    loadFromStorage<AuthUser | null>(STORAGE_KEYS.AUTH, DEFAULT_AUTH_USER)
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return loadFromStorage<AuthUser | null>(STORAGE_KEYS.AUTH, DEFAULT_AUTH_USER) !== null;
  });

  const [resume, setResume] = useState<ResumeDocument | null>(() =>
    loadFromStorage<ResumeDocument | null>(STORAGE_KEYS.RESUME, DEFAULT_RESUME)
  );

  // Computed Role Permissions
  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser]);

  // Storage synchronization
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.STUDENT, studentProfile);
  }, [studentProfile]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EXPERIMENTS, experiments);
  }, [experiments]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TOOLS, tools);
  }, [tools]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MODULES, modules);
  }, [modules]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USERS_DB, usersDb);
  }, [usersDb]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RESUME, resume);
  }, [resume]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Strict Role-Based Authentication Handlers
  const login = (
    email: string,
    password: string,
    roleMode?: 'admin' | 'user'
  ): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = usersDb.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      if (existing.passwordHash && existing.passwordHash !== password) {
        return { success: false, error: 'Incorrect password. Please verify your credentials.' };
      }
      // Security Enforcement: If user chose Admin Login, account must have admin role
      if (roleMode === 'admin' && existing.role !== 'admin') {
        return {
          success: false,
          error: 'Access Denied: This account is registered as a Student/User and lacks administrator privileges. Please use User Login.',
        };
      }

      const authUser: AuthUser = {
        id: existing.id,
        email: existing.email,
        name: existing.name,
        role: existing.role,
        createdAt: existing.createdAt,
      };

      setCurrentUser(authUser);
      setIsAuthenticated(true);
      saveToStorage(STORAGE_KEYS.AUTH, authUser);
      addNotification(
        'Login Successful',
        `Authenticated as ${authUser.name} (${authUser.role === 'admin' ? 'Administrator' : 'Student Researcher'})`,
        'system'
      );
      return { success: true };
    }

    // Account not yet found in database:
    if (roleMode === 'admin') {
      return {
        success: false,
        error: 'Administrator record not found. Please register via Admin Sign Up with valid institutional authorization.',
      };
    }

    // Default regular user login creates regular user account (NEVER ADMIN!)
    const newUser: StoredUserAccount = {
      id: `usr-${Date.now()}`,
      email: trimmedEmail,
      name: trimmedEmail.split('@')[0].toUpperCase(),
      role: 'user', // NEVER GRANT ADMIN ON PUBLIC LOGIN
      passwordHash: password,
      createdAt: new Date().toISOString(),
    };

    setUsersDb((prev) => [...prev, newUser]);

    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: 'user',
      createdAt: newUser.createdAt,
    };

    setCurrentUser(authUser);
    setIsAuthenticated(true);
    saveToStorage(STORAGE_KEYS.AUTH, authUser);
    addNotification('Login Successful', `Welcome to the Data Science Lab, ${authUser.name}`, 'system');
    return { success: true };
  };

  const signup = (
    email: string,
    password: string,
    name?: string,
    role: 'admin' | 'user' = 'user',
    adminPasscode?: string
  ): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = usersDb.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please log in.' };
    }

    // CRITICAL SECURITY ENFORCEMENT:
    // Public registration must never automatically grant admin privileges.
    // Admin accounts must be created or authorized securely via passcode.
    if (role === 'admin') {
      if (!adminPasscode || adminPasscode.trim() !== ADMIN_SECURITY_PASSCODE) {
        return {
          success: false,
          error: 'Security Authorization Failed: Invalid Administrator Passcode. Public registration cannot grant administrator privileges.',
        };
      }
    }

    const assignedRole: UserRole = role === 'admin' ? 'admin' : 'user';

    const newUser: StoredUserAccount = {
      id: `usr-${Date.now()}`,
      email: trimmedEmail,
      name: name.trim() || trimmedEmail.split('@')[0],
      role: assignedRole,
      passwordHash: password,
      createdAt: new Date().toISOString(),
    };

    setUsersDb((prev) => [...prev, newUser]);

    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: assignedRole,
      createdAt: newUser.createdAt,
    };

    setCurrentUser(authUser);
    setIsAuthenticated(true);
    saveToStorage(STORAGE_KEYS.AUTH, authUser);
    addNotification(
      'Account Created',
      `Registered as ${authUser.name} (${assignedRole === 'admin' ? 'Administrator' : 'Student Researcher'})`,
      'system'
    );
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    addNotification('Signed Out', 'You have securely signed out of your session.', 'system');
  };

  // Resume Handlers
  const uploadResume = (doc: Omit<ResumeDocument, 'id' | 'uploadDate'>) => {
    const newDoc: ResumeDocument = {
      id: `res-${Date.now()}`,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...doc,
    };
    setResume(newDoc);
    addNotification('Resume Uploaded', `Document "${doc.fileName}" saved to your profile.`, 'resume');
  };

  const deleteResume = () => {
    setResume(null);
    addNotification('Resume Removed', 'Your uploaded resume has been cleared.', 'resume');
  };

  // Notifications
  const addNotification = (title: string, message: string, type: AppNotification['type']) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Student Profile
  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudentProfile((prev) => ({ ...prev, ...updates }));
    addNotification('Profile Updated', 'Student credentials updated.', 'profile');
  };

  const setStudentAvatar = (dataUrl: string) => {
    setStudentProfile((prev) => ({
      ...prev,
      avatarUrl: dataUrl,
    }));
    addNotification('Profile Photo Changed', 'New avatar updated across your dashboard.', 'profile');
  };

  const removeStudentAvatar = () => {
    setStudentProfile((prev) => ({
      ...prev,
      avatarUrl: '',
    }));
  };

  // Helpers
  const calculateExperimentProgressFromSubs = (
    subs: SubExperimentItem[]
  ): { progress: number; status: ExperimentStatus } => {
    if (!subs || subs.length === 0) {
      return { progress: 0, status: 'Not Started' };
    }
    const total = subs.length;
    const completedCount = subs.filter((s) => s.status === 'Completed').length;
    const inProgressCount = subs.filter((s) => s.status === 'In Progress').length;
    const progress = Math.round((completedCount / total) * 100);
    let status: ExperimentStatus = 'Not Started';
    if (completedCount === total) {
      status = 'Completed';
    } else if (completedCount > 0 || inProgressCount > 0) {
      status = 'In Progress';
    }
    return { progress, status };
  };

  // Data-Layer Role Authorization Check
  const requireAdmin = (actionName: string): boolean => {
    if (!isAdmin) {
      console.warn(`Unauthorized attempt to perform admin action: ${actionName}`);
      addNotification(
        'Access Denied',
        `Administrator authorization required to ${actionName}. Regular users cannot modify shared curriculum or settings.`,
        'system'
      );
      return false;
    }
    return true;
  };

  // Experiment Handlers (Admin Protected)
  const addExperiment = (title?: string, description?: string, imageUrl?: string): ExperimentItem | null => {
    if (!requireAdmin('create new experiments')) return null;
    const newExp: ExperimentItem = {
      id: `exp-${Date.now()}`,
      title: title || `Experiment ${experiments.length + 101}: Advanced Data Science Model`,
      description: description || 'Click open to manage and configure sub-experiments, code, and outputs.',
      imageUrl: imageUrl || '',
      status: 'Not Started',
      progress: 0,
      subExperiments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setExperiments((prev) => [newExp, ...prev]);
    addNotification('Experiment Added', `Created experiment "${newExp.title}".`, 'experiment');
    return newExp;
  };

  const updateExperiment = (id: string, updates: Partial<ExperimentItem>) => {
    if (!requireAdmin('update experiment details')) return;
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id !== id) return exp;
        const merged = { ...exp, ...updates, updatedAt: new Date().toISOString() };
        if (merged.subExperiments && merged.subExperiments.length > 0) {
          const { progress, status } = calculateExperimentProgressFromSubs(merged.subExperiments);
          merged.progress = progress;
          merged.status = status;
        }
        return merged;
      })
    );
    addNotification('Experiment Updated', `Experiment changes saved.`, 'experiment');
  };

  const deleteExperiment = (id: string) => {
    if (!requireAdmin('delete experiments')) return;
    const target = experiments.find((e) => e.id === id);
    setExperiments((prev) => prev.filter((exp) => exp.id !== id));
    if (selectedExperimentId === id) {
      setSelectedExperimentId(null);
      setSelectedSubExperimentId(null);
      setCurrentPage('experiments');
    }
    if (target) {
      addNotification('Experiment Deleted', `Removed experiment "${target.title}".`, 'experiment');
    }
  };

  const setExperimentImage = (expId: string, imageUrl: string) => {
    if (!requireAdmin('upload experiment cover image')) return;
    updateExperiment(expId, { imageUrl });
    addNotification('Experiment Image Updated', 'Image saved for experiment.', 'experiment');
  };

  const selectExperiment = (id: string) => {
    setSelectedExperimentId(id);
    setSelectedSubExperimentId(null);
    setCurrentPage('sub-experiments');
  };

  // Sub-Experiment Handlers (Admin Protected)
  const addSubExperiment = (expId: string, data?: Partial<SubExperimentItem>): SubExperimentItem | null => {
    if (!requireAdmin('add sub-experiments')) return null;
    let createdSub!: SubExperimentItem;
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id !== expId) return exp;
        const currentSubs = exp.subExperiments || [];
        createdSub = {
          id: `sub-${Date.now()}`,
          name: data?.name || `Sub-Experiment ${currentSubs.length + 1}`,
          description: data?.description || 'Click to open code lab and execute algorithms.',
          category: data?.category || 'Python',
          status: data?.status || 'Not Started',
          progress: data?.progress || 0,
          language: data?.language || 'Python 3.11',
          code: data?.code || '',
          output: data?.output || '',
          outputImageUrl: data?.outputImageUrl || '',
          explanation: data?.explanation || '',
          keyPoints: data?.keyPoints || [],
          demoVideoUrl: data?.demoVideoUrl || '',
          demoVideoName: data?.demoVideoName || '',
          files: data?.files || [],
          updatedAt: new Date().toISOString(),
        };
        const updatedSubs = [...currentSubs, createdSub];
        const { progress, status } = calculateExperimentProgressFromSubs(updatedSubs);
        return {
          ...exp,
          subExperiments: updatedSubs,
          progress,
          status,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    addNotification('Sub-Experiment Added', `Added "${createdSub.name}".`, 'sub-experiment');
    return createdSub;
  };

  const updateSubExperiment = (expId: string, subId: string, updates: Partial<SubExperimentItem>) => {
    if (!requireAdmin('modify sub-experiment configurations')) return;
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id !== expId) return exp;
        const currentSubs = exp.subExperiments || [];
        const updatedSubs = currentSubs.map((sub) => {
          if (sub.id !== subId) return sub;
          return {
            ...sub,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        });
        const { progress, status } = calculateExperimentProgressFromSubs(updatedSubs);
        return {
          ...exp,
          subExperiments: updatedSubs,
          progress,
          status,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    addNotification('Sub-Experiment Updated', `Sub-experiment details updated.`, 'sub-experiment');
  };

  const deleteSubExperiment = (expId: string, subId: string) => {
    if (!requireAdmin('delete sub-experiments')) return;
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id !== expId) return exp;
        const filteredSubs = (exp.subExperiments || []).filter((s) => s.id !== subId);
        const { progress, status } = calculateExperimentProgressFromSubs(filteredSubs);
        return {
          ...exp,
          subExperiments: filteredSubs,
          progress,
          status,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    if (selectedSubExperimentId === subId) {
      setSelectedSubExperimentId(null);
      setCurrentPage('sub-experiments');
    }
    addNotification('Sub-Experiment Removed', `Deleted sub-experiment.`, 'sub-experiment');
  };

  const selectSubExperiment = (expId: string, subId: string) => {
    setSelectedExperimentId(expId);
    setSelectedSubExperimentId(subId);
    setCurrentPage('sub-experiment-workspace');
  };

  const setSubExperimentImage = (expId: string, subId: string, imageUrl: string) => {
    if (!requireAdmin('update sub-experiment visuals')) return;
    updateSubExperiment(expId, subId, { imageUrl });
    addNotification('Sub-Experiment Image Updated', 'Sub-experiment visual updated.', 'sub-experiment');
  };

  const addSubExperimentFile = (expId: string, subId: string, file: Omit<ExperimentFile, 'id'>) => {
    if (!requireAdmin('attach curriculum files to sub-experiment')) return;
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id !== expId) return exp;
        const updatedSubs = (exp.subExperiments || []).map((sub) => {
          if (sub.id !== subId) return sub;
          const newFile: ExperimentFile = { ...file, id: `f-${Date.now()}` };
          return { ...sub, files: [...(sub.files || []), newFile] };
        });
        return { ...exp, subExperiments: updatedSubs };
      })
    );
    addNotification('File Attached', `Attached file to sub-experiment.`, 'sub-experiment');
  };

  const deleteSubExperimentFile = (expId: string, subId: string, fileId: string) => {
    if (!requireAdmin('remove files from sub-experiment')) return;
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id !== expId) return exp;
        const updatedSubs = (exp.subExperiments || []).map((sub) => {
          if (sub.id !== subId) return sub;
          return { ...sub, files: (sub.files || []).filter((f) => f.id !== fileId) };
        });
        return { ...exp, subExperiments: updatedSubs };
      })
    );
  };

  // Tools Handlers (Admin Protected)
  const addTool = (tool: Omit<ToolItem, 'id'>): ToolItem | null => {
    if (!requireAdmin('add laboratory tools')) return null;
    const newTool: ToolItem = {
      ...tool,
      id: `tool-${Date.now()}`,
    };
    setTools((prev) => [...prev, newTool]);
    addNotification('Tool Added', `Added tool "${newTool.name}".`, 'system');
    return newTool;
  };

  const updateTool = (id: string, updates: Partial<ToolItem>) => {
    if (!requireAdmin('update tool details')) return;
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTool = (id: string) => {
    if (!requireAdmin('delete laboratory tools')) return;
    setTools((prev) => prev.filter((t) => t.id !== id));
  };

  const setToolImage = (toolId: string, imageUrl: string) => {
    if (!requireAdmin('update tool image')) return;
    updateTool(toolId, { imageUrl });
    addNotification('Tool Image Updated', 'Tool visual image updated.', 'system');
  };

  // Modules Handlers (Admin Protected)
  const addModule = (mod: Omit<ModuleItem, 'id' | 'createdAt' | 'updatedAt'>): ModuleItem | null => {
    if (!requireAdmin('create curriculum modules')) return null;
    const newModule: ModuleItem = {
      ...mod,
      id: `mod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setModules((prev) => [...prev, newModule]);
    addNotification('Module Added', `Created module "${newModule.name}".`, 'module');
    return newModule;
  };

  const updateModule = (id: string, updates: Partial<ModuleItem>) => {
    if (!requireAdmin('update curriculum modules')) return;
    setModules((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : m
      )
    );
    if (updates.pdfName) {
      addNotification('PDF Attached', `Updated PDF notes on module.`, 'pdf');
    }
    if (updates.videoName) {
      addNotification('Video Uploaded', `Video attached to module.`, 'video');
    }
  };

  const deleteModule = (id: string) => {
    if (!requireAdmin('delete curriculum modules')) return;
    setModules((prev) => prev.filter((m) => m.id !== id));
    addNotification('Module Deleted', `Module removed from curriculum.`, 'module');
  };

  const setModuleImage = (moduleId: string, imageUrl: string) => {
    if (!requireAdmin('change module cover image')) return;
    updateModule(moduleId, { imageUrl });
    addNotification('Module Image Updated', 'Module cover image updated.', 'module');
  };

  const setModuleVideo = (moduleId: string, videoUrl: string, videoName: string) => {
    if (!requireAdmin('update module lecture video')) return;
    updateModule(moduleId, { videoUrl, videoName });
    addNotification('Video Updated', `Video "${videoName}" linked to module.`, 'video');
  };

  const setModulePdf = (moduleId: string, pdfUrl: string, pdfName: string, pdfSize: string) => {
    if (!requireAdmin('update module lecture notes PDF')) return;
    updateModule(moduleId, { pdfUrl, pdfName, pdfSize });
    addNotification('PDF Attached', `Document "${pdfName}" attached to module.`, 'pdf');
  };

  // Projects Handlers (Admin Protected Management & Content)
  const addProject = (proj: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>): ProjectItem | null => {
    if (!requireAdmin('create projects')) return null;
    const newProj: ProjectItem = {
      ...proj,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [newProj, ...prev]);
    addNotification('Project Added', `Published project "${newProj.title}".`, 'project');
    return newProj;
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    if (!requireAdmin('modify projects')) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
    addNotification('Project Updated', `Project details saved.`, 'project');
  };

  const deleteProject = (id: string) => {
    if (!requireAdmin('delete projects')) return;
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      addNotification('Project Deleted', `Removed project "${target.title}".`, 'project');
    }
  };

  const setProjectImage = (id: string, imageUrl: string) => {
    if (!requireAdmin('update project image')) return;
    updateProject(id, { imageUrl });
  };

  // Settings & Backups
  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const exportData = () => {
    const payload = {
      exportDate: new Date().toISOString(),
      studentProfile,
      experiments,
      tools,
      modules,
      projects,
      notifications,
      settings,
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dslab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification('Backup Exported', 'Full JSON backup downloaded.', 'system');
  };

  const importData = (jsonData: string): boolean => {
    if (!requireAdmin('import and overwrite laboratory database')) return false;
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.studentProfile) setStudentProfile(parsed.studentProfile);
      if (Array.isArray(parsed.experiments)) setExperiments(parsed.experiments);
      if (Array.isArray(parsed.tools)) setTools(parsed.tools);
      if (Array.isArray(parsed.modules)) setModules(parsed.modules);
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.notifications)) setNotifications(parsed.notifications);
      if (parsed.settings) setSettings(parsed.settings);
      addNotification('Backup Restored', 'Laboratory records successfully restored.', 'system');
      return true;
    } catch (err) {
      console.error('Failed to parse imported json', err);
      return false;
    }
  };

  const resetData = () => {
    if (!requireAdmin('reset laboratory database')) return;
    setStudentProfile(DEFAULT_STUDENT);
    setExperiments(DEFAULT_EXPERIMENTS);
    setTools(DEFAULT_TOOLS);
    setModules(DEFAULT_MODULES);
    setProjects(DEFAULT_PROJECTS);
    setNotifications(DEFAULT_NOTIFICATIONS);
    setSettings(DEFAULT_SETTINGS);
  };

  // Active Selected Objects
  const selectedExperiment = useMemo(() => {
    if (!selectedExperimentId) return null;
    return experiments.find((e) => e.id === selectedExperimentId) || null;
  }, [experiments, selectedExperimentId]);

  const selectedSubExperiment = useMemo(() => {
    if (!selectedExperiment || !selectedSubExperimentId) return null;
    return (
      selectedExperiment.subExperiments?.find((s) => s.id === selectedSubExperimentId) || null
    );
  }, [selectedExperiment, selectedSubExperimentId]);

  // Metrics
  const totalExperiments = experiments.length;
  const completedExperiments = experiments.filter((e) => e.status === 'Completed').length;
  const inProgressExperiments = experiments.filter((e) => e.status === 'In Progress').length;
  const notStartedExperiments = experiments.filter((e) => e.status === 'Not Started').length;
  const experimentProgressPercent = useMemo(() => {
    if (totalExperiments === 0) return 0;
    const sum = experiments.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    return Math.round(sum / totalExperiments);
  }, [experiments, totalExperiments]);

  const totalModules = modules.length;
  const completedModules = modules.filter((m) => m.status === 'Completed').length;
  const inProgressModules = modules.filter((m) => m.status === 'In Progress').length;
  const notStartedModules = modules.filter((m) => m.status === 'Not Started').length;
  const moduleProgressPercent = useMemo(() => {
    if (totalModules === 0) return 0;
    const sum = modules.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    return Math.round(sum / totalModules);
  }, [modules, totalModules]);

  const overallProgressPercent = useMemo(() => {
    const totalItems = totalExperiments + totalModules;
    if (totalItems === 0) return 0;
    const sumExp = experiments.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    const sumMod = modules.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    return Math.round((sumExp + sumMod) / totalItems);
  }, [experiments, modules, totalExperiments, totalModules]);

  return (
    <LabContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedExperimentId,
        setSelectedExperimentId,
        selectedSubExperimentId,
        setSelectedSubExperimentId,
        isMobileNavOpen,
        setIsMobileNavOpen,
        isAuthenticated,
        currentUser,
        isAdmin,
        login,
        signup,
        logout,
        resume,
        uploadResume,
        deleteResume,
        notifications,
        isNotificationPanelOpen,
        setIsNotificationPanelOpen,
        addNotification,
        markAllNotificationsAsRead,
        clearAllNotifications,
        unreadNotificationsCount,
        studentProfile,
        updateStudentProfile,
        setStudentAvatar,
        removeStudentAvatar,
        experiments,
        selectedExperiment,
        selectedSubExperiment,
        addExperiment,
        updateExperiment,
        deleteExperiment,
        selectExperiment,
        setExperimentImage,
        addSubExperiment,
        updateSubExperiment,
        deleteSubExperiment,
        selectSubExperiment,
        setSubExperimentImage,
        addSubExperimentFile,
        deleteSubExperimentFile,
        tools,
        addTool,
        updateTool,
        deleteTool,
        setToolImage,
        modules,
        addModule,
        updateModule,
        deleteModule,
        setModuleImage,
        setModuleVideo,
        setModulePdf,
        projects,
        addProject,
        updateProject,
        deleteProject,
        setProjectImage,
        settings,
        updateSettings,
        exportData,
        importData,
        resetData,
        totalExperiments,
        completedExperiments,
        inProgressExperiments,
        notStartedExperiments,
        experimentProgressPercent,
        totalModules,
        completedModules,
        inProgressModules,
        notStartedModules,
        moduleProgressPercent,
        overallProgressPercent,
      }}
    >
      {children}
    </LabContext.Provider>
  );
};

export const useLab = () => {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
};
