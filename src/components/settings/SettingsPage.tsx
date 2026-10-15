import React, { useRef, useState } from 'react';
import {
  Palette,
  User,
  Database,
  Save,
  Check,
  Download,
  Upload,
  RotateCcw,
  Camera,
  ShieldCheck,
  Sun,
  Moon,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    studentProfile,
    updateStudentProfile,
    setStudentAvatar,
    exportData,
    importData,
    resetData,
  } = useLab();

  const [activeTab, setActiveTab] = useState<'theme' | 'profile' | 'data'>('theme');
  const [studentForm, setStudentForm] = useState(studentProfile);
  const [dataMessage, setDataMessage] = useState<string | null>(null);
  const [profileToast, setProfileToast] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile(studentForm);
    setProfileToast(true);
    setTimeout(() => setProfileToast(false), 2500);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const success = importData(reader.result);
        if (success) setDataMessage('Backup restored successfully!');
        else setDataMessage('Invalid JSON backup file.');
        setTimeout(() => setDataMessage(null), 3000);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  return (
    <div className="space-y-6 pb-16 w-full text-black">
      <input
        type="file"
        ref={importFileRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') setStudentAvatar(reader.result);
          };
          reader.readAsDataURL(file);
        }}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="border-b border-black/10 pb-4 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
          Settings
        </h1>
        <p className="text-xs sm:text-sm font-medium mt-0.5 text-black/60">
          Configure application appearance, student records, and laboratory data persistence.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl overflow-x-auto text-xs sm:text-sm font-semibold border border-black/15 bg-white w-full">
        <button
          onClick={() => setActiveTab('theme')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'theme'
              ? 'bg-[#E91E63] text-white shadow-xs font-bold'
              : 'text-black hover:bg-[#FCE4EC] hover:text-[#E91E63]'
          }`}
        >
          <Palette className={`w-4 h-4 ${activeTab === 'theme' ? 'text-white' : 'text-[#E91E63]'}`} />
          <span>Theme Switching</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#E91E63] text-white shadow-xs font-bold'
              : 'text-black hover:bg-[#FCE4EC] hover:text-[#E91E63]'
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-white' : 'text-[#E91E63]'}`} />
          <span>Profile &amp; Faculty</span>
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'data'
              ? 'bg-[#E91E63] text-white shadow-xs font-bold'
              : 'text-black hover:bg-[#FCE4EC] hover:text-[#E91E63]'
          }`}
        >
          <Database className={`w-4 h-4 ${activeTab === 'data' ? 'text-white' : 'text-[#E91E63]'}`} />
          <span>Storage &amp; Backup</span>
        </button>
      </div>

      {/* 1. THEME SWITCHING (BLACK CARD with WHITE TEXT) */}
      {activeTab === 'theme' && (
        <div className="border border-zinc-800 rounded-2xl p-6 sm:p-8 bg-black text-white shadow-xl space-y-6 w-full">
          <div className="pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">
              Theme Selection
            </h2>
            <p className="text-xs sm:text-sm font-normal text-zinc-400 mt-1">
              Choose your preferred appearance. Both themes strictly adhere to the professional Black + Pink + White palette.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* Light Theme Card */}
            <div
              onClick={() => updateSettings({ theme: 'light' })}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                settings.theme === 'light'
                  ? 'border-[#E91E63] bg-zinc-950 shadow-md ring-2 ring-[#E91E63]/20'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
                    <Sun className="w-5 h-5 text-[#E91E63]" />
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      settings.theme === 'light'
                        ? 'bg-[#E91E63] text-white'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {settings.theme === 'light' ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">
                  LIGHT THEME
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                  Clean crisp white background, dark readable typography, pink primary buttons, and baby-pink accents.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-zinc-700" />
                <span className="w-4 h-4 rounded-full bg-[#000000] border border-zinc-700" />
                <span className="w-4 h-4 rounded-full bg-[#E91E63]" />
                <span className="w-4 h-4 rounded-full bg-[#FCE4EC] border border-zinc-700" />
                <span className="text-xs font-mono text-zinc-400 ml-auto">White + Pink</span>
              </div>
            </div>

            {/* Dark Theme Card */}
            <div
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                settings.theme === 'dark'
                  ? 'border-[#E91E63] bg-zinc-950 shadow-md ring-2 ring-[#E91E63]/20 text-white'
                  : 'border-zinc-800 bg-zinc-950 text-white hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
                    <Moon className="w-5 h-5 text-[#E91E63]" />
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      settings.theme === 'dark'
                        ? 'bg-[#E91E63] text-white'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {settings.theme === 'dark' ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">
                  DARK THEME
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                  Predominantly black deep background, clear white text, dark card containers, and glowing pink highlights.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#000000] border border-zinc-700" />
                <span className="w-4 h-4 rounded-full bg-[#FFFFFF]" />
                <span className="w-4 h-4 rounded-full bg-[#E91E63]" />
                <span className="w-4 h-4 rounded-full bg-[#FCE4EC]" />
                <span className="text-xs font-mono text-zinc-400 ml-auto">Black + Pink</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROFILE SETTINGS (BLACK CARD with WHITE TEXT) */}
      {activeTab === 'profile' && (
        <div className="border border-zinc-800 rounded-2xl p-6 sm:p-8 bg-black text-white shadow-xl space-y-6 w-full">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-white">
                Student Profile &amp; Faculty Settings
              </h2>
              <p className="text-xs sm:text-sm font-normal text-zinc-400 mt-1">
                Update verified student records and faculty mentor details.
              </p>
            </div>
            {profileToast && (
              <span className="text-xs font-bold text-white bg-[#E91E63] px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs">
                <Check className="w-3.5 h-3.5 text-white" /> Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E91E63] bg-zinc-900 flex items-center justify-center shrink-0">
                {studentProfile.avatarUrl ? (
                  <img
                    src={studentProfile.avatarUrl}
                    alt={studentProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {studentProfile.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E91E63] text-white hover:bg-[#D81B60] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <span>Change Profile Photo</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-400">Student Name</label>
                <input
                  type="text"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-400">Roll Number</label>
                <input
                  type="text"
                  value={studentForm.rollNumber}
                  onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-mono font-semibold text-xs sm:text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-400">Faculty Name</label>
                <input
                  type="text"
                  value={studentForm.facultyName}
                  onChange={(e) => setStudentForm({ ...studentForm, facultyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-400">Faculty Designation</label>
                <input
                  type="text"
                  value={studentForm.facultyDesignation}
                  onChange={(e) => setStudentForm({ ...studentForm, facultyDesignation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm focus:outline-none focus:border-[#E91E63]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. DATA STORAGE & BACKUP (BLACK CARD with WHITE TEXT) */}
      {activeTab === 'data' && (
        <div className="border border-zinc-800 rounded-2xl p-6 sm:p-8 bg-black text-white shadow-xl space-y-6 w-full">
          <div className="pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">
              Data Storage &amp; Persistence
            </h2>
            <p className="text-xs sm:text-sm font-normal text-zinc-400 mt-1">
              Export and restore all laboratory state as a JSON backup package.
            </p>
          </div>
          {dataMessage && (
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E91E63] shrink-0" />
              <span>{dataMessage}</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between">
              <div>
                <Download className="w-6 h-6 text-[#E91E63] mb-2" />
                <h3 className="text-sm font-bold text-white">Export JSON</h3>
                <p className="text-xs mt-1 font-normal text-zinc-400">
                  Download full laboratory state as a .json backup file.
                </p>
              </div>
              <button
                type="button"
                onClick={exportData}
                className="mt-4 w-full py-2.5 text-xs font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white cursor-pointer transition-colors shadow-xs"
              >
                Download Backup
              </button>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between">
              <div>
                <Upload className="w-6 h-6 text-[#E91E63] mb-2" />
                <h3 className="text-sm font-bold text-white">Import JSON</h3>
                <p className="text-xs mt-1 font-normal text-zinc-400">
                  Restore an exported .json laboratory state backup.
                </p>
              </div>
              <button
                type="button"
                onClick={() => importFileRef.current?.click()}
                className="mt-4 w-full py-2.5 text-xs font-bold rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] transition-colors cursor-pointer"
              >
                Upload Backup
              </button>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between">
              <div>
                <RotateCcw className="w-6 h-6 text-[#E91E63] mb-2" />
                <h3 className="text-sm font-bold text-white">Reset Defaults</h3>
                <p className="text-xs mt-1 font-normal text-zinc-400">
                  Reset all experiments, tools, modules, and profile to institutional baseline.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data to default laboratory values?')) {
                    resetData();
                    setDataMessage('All laboratory data has been reset to defaults.');
                    setTimeout(() => setDataMessage(null), 3000);
                  }
                }}
                className="mt-4 w-full py-2.5 text-xs font-bold rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
