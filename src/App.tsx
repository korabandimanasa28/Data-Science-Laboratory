import React from 'react';
import { LabProvider, useLab } from './context/LabContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { HomeDashboard } from './components/home/HomeDashboard';
import { AllExperiments } from './components/experiments/AllExperiments';
import { SubExperimentsPage } from './components/experiments/SubExperimentsPage';
import { SubExperimentWorkspace } from './components/experiments/SubExperimentWorkspace';
import { ToolsPage } from './components/tools/ToolsPage';
import { ModulesPage } from './components/modules/ModulesPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { ResumePage } from './components/resume/ResumePage';
import { ProfilePage } from './components/profile/ProfilePage';
import { SettingsPage } from './components/settings/SettingsPage';
import { AuthPage } from './components/auth/AuthPage';
import { LabRecordDocument } from './components/experiments/LabRecordDocument';

const MainContent: React.FC = () => {
  const { currentPage } = useLab();

  return (
    <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-white text-black transition-colors duration-200">
      <Header />
      {/* Full-width responsive container using available browser width without restrictive max-width */}
      <main className="flex-1 w-full max-w-none m-0 py-6 px-6 sm:px-8 box-border bg-white text-black">
        {currentPage === 'home' && <HomeDashboard />}
        {currentPage === 'experiments' && <AllExperiments />}
        {currentPage === 'sub-experiments' && <SubExperimentsPage />}
        {currentPage === 'sub-experiment-workspace' && <SubExperimentWorkspace />}
        {currentPage === 'lab-record' && <LabRecordDocument />}
        {currentPage === 'tools' && <ToolsPage />}
        {currentPage === 'modules' && <ModulesPage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'resume' && <ResumePage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
};

const MainAppLayout: React.FC = () => {
  const { isAuthenticated, settings } = useLab();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const isDark = settings.theme === 'dark';

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark ' : ''}bg-white text-black selection:bg-[#E91E63] selection:text-white transition-colors duration-200`}>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default function App() {
  return (
    <LabProvider>
      <MainAppLayout />
    </LabProvider>
  );
}
