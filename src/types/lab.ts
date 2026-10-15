export type ExperimentStatus = 'Not Started' | 'In Progress' | 'Completed';
export type CodeLanguage = 'Python 3.11' | 'PySpark' | 'SQL' | 'SQL + Python';

export type SubExperimentCategory =
  | 'All'
  | 'Python'
  | 'Pandas'
  | 'NumPy'
  | 'PySpark'
  | 'SQL'
  | 'SQL + Python'
  | 'Other';

export interface StudentProfile {
  name: string;
  rollNumber: string;
  branch: string;
  department: string;
  section: string;
  facultyName: string;
  facultyDesignation: string;
  academicYear: string;
  university: string;
  email: string;
  avatarUrl: string;
  idCardPhotoUrl?: string;
}

export interface ExperimentFile {
  id: string;
  name: string;
  size?: string;
  type?: string;
  dataUrl?: string;
}

export interface SubExperimentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: ExperimentStatus;
  progress: number; // 0 to 100
  language: CodeLanguage;
  code: string;
  output: string;
  imageUrl?: string;
  outputImageUrl?: string;
  aim?: string;
  requirements?: string;
  result?: string;
  explanation: string;
  keyPoints: string[];
  demoVideoUrl?: string;
  demoVideoName?: string;
  files: ExperimentFile[];
  updatedAt: string;
}

export interface ExperimentItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: ExperimentStatus;
  progress: number; // 0 to 100
  subExperiments: SubExperimentItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl?: string;
  link?: string;
}

export interface CoreConceptCard {
  title: string;
  items: string[];
}

export interface LabPractical {
  code: string;
  title: string;
  description: string;
}

export interface ModuleItem {
  id: string;
  code: string; // e.g. "M1", "M2"
  name: string; // Full title, e.g. "Module 1: Introduction"
  shortTitle: string; // e.g. "Introduction"
  description: string;
  imageUrl?: string;
  periods?: number;
  topicsCount?: number;
  status: ExperimentStatus;
  progress: number;
  videoUrl?: string;
  videoName?: string;
  pdfUrl?: string;
  pdfName?: string;
  pdfSize?: string;
  processingOverview?: string;
  coreConcepts?: CoreConceptCard[];
  learningObjectives?: string[];
  labPracticals?: LabPractical[];
  lectureNotesText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeDocument {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  dataUrl?: string;
  status: 'Verified' | 'Pending Review';
  notes?: string;
}

export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Machine Learning' | 'Deep Learning' | 'NLP' | 'Data Engineering' | 'Computer Vision' | string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Published';
  techStack: string[];
  imageUrl?: string;
  githubUrl?: string;
  notebookUrl?: string;
  demoUrl?: string;
  author: string;
  metrics?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'experiment' | 'sub-experiment' | 'module' | 'pdf' | 'video' | 'profile' | 'system' | 'resume' | 'project';
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export type NavigationPage =
  | 'home'
  | 'profile'
  | 'experiments'
  | 'sub-experiments'
  | 'sub-experiment-workspace'
  | 'lab-record'
  | 'tools'
  | 'modules'
  | 'projects'
  | 'resume'
  | 'settings';
