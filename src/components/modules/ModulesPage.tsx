import React, { useRef, useState } from 'react';
import {
  BookOpen,
  Upload,
  Download,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  X,
  ArrowRight,
  Save,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Copy,
  MessageSquare,
  FileCheck,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { ModuleItem } from '../../types/lab';

export const ModulesPage: React.FC = () => {
  const {
    modules,
    addModule,
    updateModule,
    deleteModule,
    setModuleImage,
    setCurrentPage,
    selectExperiment,
    experiments,
  } = useLab();

  // Mode: 'overview' (Clean list with only Image, Name, Open Module)
  // or 'curriculum' (The full Data Science Curriculum Modules Portal)
  const [viewMode, setViewMode] = useState<'overview' | 'curriculum'>('overview');

  // Currently focused module ID in curriculum portal (defaults to 'M1')
  const [activeModuleCode, setActiveModuleCode] = useState<string>('M1');

  // Expansion states for each module in curriculum view (Module 1 expanded by default)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': false,
    'mod-3': false,
    'mod-4': false,
    'mod-5': false,
  });

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [copyToast, setCopyToast] = useState(false);
  const [instructorModalOpen, setInstructorModalOpen] = useState(false);
  const [pdfFullscreen, setPdfFullscreen] = useState(false);
  const [pdfViewMode, setPdfViewMode] = useState<'text' | 'notes'>('text');

  // Hidden image upload input
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [targetModuleIdForUpload, setTargetModuleIdForUpload] = useState<string | null>(null);

  // Modal State for Add or Edit Module
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMod, setEditingMod] = useState<Partial<ModuleItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Handle image upload per module
  const handleTriggerImageUpload = (moduleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTargetModuleIdForUpload(moduleId);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
      imageInputRef.current.click();
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetModuleIdForUpload) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Module image must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setModuleImage(targetModuleIdForUpload, reader.result);
      }
      setTargetModuleIdForUpload(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (moduleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove image from this module?')) {
      updateModule(moduleId, { imageUrl: '' });
    }
  };

  const handleOpenModule = (moduleId: string) => {
    const mod = modules.find((m) => m.id === moduleId);
    if (mod) {
      setActiveModuleCode(mod.code || 'M1');
      setExpandedModules((prev) => ({
        ...prev,
        [mod.id]: true,
      }));
    }
    setViewMode('curriculum');
  };

  const toggleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    modules.forEach((m) => {
      allExpanded[m.id] = true;
    });
    setExpandedModules(allExpanded);
  };

  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    modules.forEach((m) => {
      allCollapsed[m.id] = false;
    });
    setExpandedModules(allCollapsed);
  };

  const handleCopySyllabus = () => {
    const text = modules
      .map(
        (m) =>
          `${m.name} (${m.periods || 9} Periods)\n${m.processingOverview || m.description}\n`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  // Add / Edit Modal handlers
  const handleStartAdd = () => {
    setIsNew(true);
    setEditingMod({
      code: `M${modules.length + 1}`,
      name: `MODULE ${modules.length + 1}: `,
      shortTitle: `Module ${modules.length + 1}`,
      description: '',
      periods: 9,
      topicsCount: 6,
      status: 'Not Started',
      progress: 0,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleStartEdit = (mod: ModuleItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsNew(false);
    setEditingMod({ ...mod });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMod || !editingMod.name) return;
    if (isNew) {
      addModule({
        code: editingMod.code || `M${modules.length + 1}`,
        name: editingMod.name.trim(),
        shortTitle: editingMod.shortTitle || editingMod.name.trim(),
        description: editingMod.description?.trim() || '',
        periods: Number(editingMod.periods) || 9,
        topicsCount: Number(editingMod.topicsCount) || 6,
        status: editingMod.status || 'Not Started',
        progress: Number(editingMod.progress) || 0,
        imageUrl: editingMod.imageUrl,
        processingOverview: editingMod.processingOverview,
      });
    } else if (editingMod.id) {
      updateModule(editingMod.id, {
        code: editingMod.code,
        name: editingMod.name.trim(),
        shortTitle: editingMod.shortTitle,
        description: editingMod.description?.trim(),
        periods: Number(editingMod.periods) || 9,
        topicsCount: Number(editingMod.topicsCount) || 6,
        status: editingMod.status,
        progress: Number(editingMod.progress) || 0,
        imageUrl: editingMod.imageUrl,
      });
    }
    setIsModalOpen(false);
    setEditingMod(null);
  };

  // Filter modules in curriculum view
  const filteredModules = modules.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.processingOverview?.toLowerCase().includes(q) ||
      m.coreConcepts?.some(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.items.some((it) => it.toLowerCase().includes(q))
      )
    );
  });

  return (
    <div className="space-y-6 pb-16 w-full text-black dark:text-white">
      {/* Hidden file input for module image uploads */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* VIEW MODE 1: CLEAN MAIN LEARNING MODULES PAGE */}
      {viewMode === 'overview' ? (
        <div className="space-y-6 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4 w-full">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                Learning Modules
              </h1>
              <p className="text-xs sm:text-sm font-medium text-black/60 mt-0.5">
                Curriculum modules. Click "Open Module" to view complete lectures, syllabus notes, and materials.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('curriculum')}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-white text-black border border-[#E91E63] hover:bg-[#FCE4EC] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#E91E63]" />
                <span>Curriculum Portal</span>
              </button>
              <button
                onClick={handleStartAdd}
                className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Add Module</span>
              </button>
            </div>
          </div>

          {/* Clean Module Cards Grid (Full Width, 3 columns on desktop):
              Before opening a module, shows ONLY:
              [ Module Image ]
              Module Name
              [ Open Module ]
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl border border-zinc-800 bg-black text-white shadow-xl hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* [ Module Image ]: professional image box */}
                  <div className="p-4 bg-zinc-950 border-b border-zinc-800">
                    {mod.imageUrl ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 group/img">
                        <img
                          src={mod.imageUrl}
                          alt={mod.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <button
                            type="button"
                            onClick={(e) => handleTriggerImageUpload(mod.id, e)}
                            className="px-2.5 py-1 rounded-lg bg-[#E91E63] text-white hover:bg-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Change</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveImage(mod.id, e)}
                            className="px-2.5 py-1 rounded-lg bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3 text-[#E91E63]" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleTriggerImageUpload(mod.id, e)}
                        className="w-full h-40 rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#E91E63] bg-zinc-900 hover:bg-zinc-800 flex flex-col items-center justify-center gap-1.5 text-white transition-colors cursor-pointer p-3"
                      >
                        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                          <Upload className="w-4 h-4 text-[#E91E63]" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          [ UPLOAD MODULE IMAGE ]
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Small image upload
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Module Name */}
                  <div className="p-5">
                    <div className="text-xs font-mono font-bold text-zinc-400 mb-1">
                      {mod.code || 'M'} · {mod.periods || 9} Periods
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-2">
                      {mod.name}
                    </h3>
                  </div>
                </div>

                {/* Bottom Action: [ Open Module ] */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModule(mod.id)}
                    className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleStartEdit(mod, e)}
                    className="p-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] hover:text-[#E91E63] transition-colors cursor-pointer"
                    title="Edit Module"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete "${mod.name}"?`)) deleteModule(mod.id);
                    }}
                    className="p-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
                    title="Remove Module"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[#E91E63]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: HIGH-FIDELITY "DATA SCIENCE CURRICULUM MODULES" PORTAL */
        <div className="space-y-6 w-full animate-in fade-in duration-200">
          {/* Top Switcher Bar */}
          <div className="flex items-center justify-between border-b border-black/10 pb-3 w-full">
            <button
              onClick={() => setViewMode('overview')}
              className="px-3.5 py-2 rounded-xl border border-[#E91E63] text-xs sm:text-sm font-bold text-black hover:bg-[#FCE4EC] transition-colors flex items-center gap-2 cursor-pointer bg-white"
            >
              <ArrowLeft className="w-4 h-4 text-[#E91E63]" />
              <span>Back to Modules Overview</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
              Curriculum Portal View
            </span>
          </div>

          {/* 1. TOP HEADER (BLACK CARD with WHITE text) */}
          <div className="rounded-2xl border border-zinc-800 bg-black text-white p-6 sm:p-8 shadow-xl space-y-4 w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Data Science Curriculum Modules
                </h1>
                <p className="text-xs sm:text-sm font-normal text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                  Comprehensive academic curriculum modules containing foundational principles, computational pipelines, algorithmic taxonomy, and laboratory practicals.
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 border border-zinc-700 text-white">
                    Course Code: 22DS1006
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 border border-zinc-700 text-white">
                    Academic Year: 2024 - 2025
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 border border-zinc-700 text-white">
                    Total Modules: {modules.length}
                  </span>
                </div>
              </div>

              {/* Right Side Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopySyllabus}
                  className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border border-[#E91E63] hover:bg-[#FCE4EC] transition-colors flex items-center gap-1.5 cursor-pointer bg-white text-black"
                >
                  {copyToast ? <Check className="w-4 h-4 text-[#E91E63]" /> : <Copy className="w-4 h-4 text-[#E91E63]" />}
                  <span>{copyToast ? 'Copied!' : 'Copy Syllabus'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInstructorModalOpen(true)}
                  className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Ask Instructor</span>
                </button>
              </div>
            </div>

            {/* Search Field */}
            <div className="relative pt-2">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics, concepts, algorithms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
              />
            </div>
          </div>

          {/* 2. MODULE NAVIGATION BAR (BLACK CARD with WHITE text) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-zinc-800 rounded-xl p-2 bg-black text-white w-full">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => {
                  setActiveModuleCode('Overview');
                  handleExpandAll();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeModuleCode === 'Overview'
                    ? 'bg-[#E91E63] text-white shadow-xs'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                Overview
              </button>
              {modules.map((m) => {
                const isActive = activeModuleCode === m.code;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveModuleCode(m.code);
                      setExpandedModules((prev) => ({
                        ...prev,
                        [m.id]: true,
                      }));
                      const el = document.getElementById(m.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#E91E63] text-white shadow-xs'
                        : 'text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <span>{m.code}: {m.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <button
                onClick={handleExpandAll}
                className="px-3 py-1 text-xs font-semibold rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3 py-1 text-xs font-semibold rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* MODULES STACKED VERTICALLY (Full Width) */}
          <div className="space-y-6 w-full">
            {filteredModules.map((mod) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  id={mod.id}
                  className={`rounded-2xl border transition-all overflow-hidden w-full ${
                    isExpanded
                      ? 'border-zinc-700 bg-black text-white shadow-xl'
                      : 'border-zinc-800 bg-black text-white hover:border-[#E91E63]'
                  }`}
                >
                  {/* Module Card Header */}
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {mod.code}
                      </div>
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                          {mod.code} · {mod.periods || 9} PERIODS · {mod.topicsCount || 6} TOPICS
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {mod.name}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleTriggerImageUpload(mod.id)}
                        className="px-3 py-1.5 rounded-lg border border-zinc-700 text-xs font-semibold text-white hover:border-[#E91E63] flex items-center gap-1.5 cursor-pointer bg-zinc-900"
                        title="Upload/Change Image"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#E91E63]" />
                        <span>{mod.imageUrl ? 'Edit Image' : 'Upload Image'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleExpand(mod.id)}
                        className="px-4 py-1.5 rounded-xl bg-[#E91E63] text-white hover:bg-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className="p-5 sm:p-8 space-y-7 animate-in fade-in duration-150">
                      {/* Optional Module Cover Image Banner */}
                      {mod.imageUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-zinc-700 h-52 group">
                          <img
                            src={mod.imageUrl}
                            alt={mod.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleTriggerImageUpload(mod.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#E91E63] text-white text-xs font-bold hover:bg-[#D81B60] transition-colors"
                            >
                              Change Image
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleRemoveImage(mod.id, e)}
                              className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-[#FCE4EC] transition-colors"
                            >
                              Remove Image
                            </button>
                          </div>
                        </div>
                      )}

                      {/* A. PROCESSING OVERVIEW */}
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                        <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-4 h-4 text-[#E91E63]" />
                          <span>1. PROCESSING OVERVIEW</span>
                        </div>
                        <p className="text-xs sm:text-sm font-normal text-zinc-300 leading-relaxed">
                          {mod.processingOverview || mod.description}
                        </p>
                      </div>

                      {/* B. CORE CONCEPTS (Three side-by-side cards) */}
                      {mod.coreConcepts && mod.coreConcepts.length > 0 && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                            2. CORE CONCEPTS &amp; TAXONOMY
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {mod.coreConcepts.map((card, idx) => (
                              <div
                                key={idx}
                                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-xs flex flex-col justify-between"
                              >
                                <div>
                                  <div className="text-sm font-bold text-white pb-2.5 border-b border-zinc-800 mb-3">
                                    {card.title}
                                  </div>
                                  <ul className="space-y-2.5 text-xs text-zinc-300">
                                    {card.items.map((it, i) => (
                                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#E91E63] mt-2 shrink-0" />
                                        <span>{it}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* C. LEARNING OBJECTIVES */}
                      {mod.learningObjectives && mod.learningObjectives.length > 0 && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
                          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-800">
                            LEARNING OBJECTIVES
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-zinc-300">
                            {mod.learningObjectives.map((obj, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-[#E91E63] shrink-0 mt-0.5" />
                                <span>{obj}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* D. LAB PRACTICALS */}
                      {mod.labPracticals && mod.labPracticals.length > 0 && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                            LAB PRACTICALS
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {mod.labPracticals.map((prac, i) => (
                              <div
                                key={i}
                                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-xs flex flex-col justify-between group hover:border-[#E91E63] transition-colors"
                              >
                                <div>
                                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded border border-zinc-700 text-zinc-300 bg-zinc-950">
                                    {prac.code}
                                  </span>
                                  <h4 className="text-sm sm:text-base font-bold text-white mt-2.5">
                                    {prac.title}
                                  </h4>
                                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                                    {prac.description}
                                  </p>
                                </div>
                                <div className="pt-3.5 mt-3.5 border-t border-zinc-800 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const matchedExp = experiments.find((e) =>
                                        e.title.toLowerCase().includes(prac.title.toLowerCase().slice(0, 15))
                                      ) || experiments[0];
                                      if (matchedExp) {
                                        selectExperiment(matchedExp.id);
                                      } else {
                                        setCurrentPage('experiments');
                                      }
                                    }}
                                    className="text-xs sm:text-sm font-bold text-white hover:text-[#E91E63] flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    <span>Practice Lab →</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* E. COURSE MATERIAL / PDF READER */}
                      {mod.lectureNotesText && (
                        <div className="rounded-2xl border border-zinc-800 bg-black overflow-hidden shadow-xl">
                          {/* Official Lecture Notes Header: Light Pink with Pink and Black accents */}
                          <div className="p-4 bg-[#FCE4EC] text-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E91E63]/25">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                                <FileCheck className="w-4 h-4 text-[#E91E63]" />
                              </div>
                              <div>
                                <span className="text-xs sm:text-sm font-bold tracking-tight text-black block">
                                  Official Lecture Notes &amp; Textbook Reading
                                </span>
                                <span className="text-[11px] font-medium text-black/60 block">
                                  Verified Curriculum Syllabus Text
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <button
                                type="button"
                                onClick={() => setPdfViewMode('text')}
                                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                                  pdfViewMode === 'text'
                                    ? 'bg-[#E91E63] text-white shadow-xs'
                                    : 'bg-white text-black border border-[#E91E63]/30 hover:bg-[#FCE4EC]'
                                }`}
                              >
                                Text (Original)
                              </button>
                              <button
                                type="button"
                                onClick={() => setPdfViewMode('notes')}
                                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                                  pdfViewMode === 'notes'
                                    ? 'bg-[#E91E63] text-white shadow-xs'
                                    : 'bg-white text-black border border-[#E91E63]/30 hover:bg-[#FCE4EC]'
                                }`}
                              >
                                View Notes
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const blob = new Blob([mod.lectureNotesText || ''], { type: 'text/plain' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `${mod.name.replace(/[^a-z0-9]/gi, '_')}_notes.txt`;
                                  a.click();
                                  URL.revokeObjectURL(url);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white text-black border border-[#E91E63] hover:bg-[#FCE4EC] font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                              >
                                <Download className="w-3.5 h-3.5 text-[#E91E63]" />
                                <span>Download</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setPdfFullscreen(!pdfFullscreen)}
                                className="p-1.5 rounded-lg border border-black/20 dark:border-zinc-700 bg-white text-black hover:border-[#E91E63] cursor-pointer"
                                title="Toggle Fullscreen"
                              >
                                {pdfFullscreen ? <Minimize2 className="w-4 h-4 text-[#E91E63]" /> : <Maximize2 className="w-4 h-4 text-[#E91E63]" />}
                              </button>
                            </div>
                          </div>

                          {/* Reading Canvas: Clean White, High Contrast Black Text */}
                          <div
                            className={`p-6 sm:p-10 bg-white overflow-y-auto ${
                              pdfFullscreen ? 'fixed inset-0 z-50 p-8 bg-white' : 'max-h-[500px]'
                            }`}
                          >
                            {pdfFullscreen && (
                              <div className="flex justify-end max-w-4xl mx-auto mb-4">
                                <button
                                  onClick={() => setPdfFullscreen(false)}
                                  className="px-4 py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                  <X className="w-4 h-4 text-white" />
                                  <span>Close Fullscreen</span>
                                </button>
                              </div>
                            )}

                            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-black/15 p-8 sm:p-12 text-black font-sans">
                              <div className="text-center pb-6 border-b border-black/10 mb-6 bg-[#FCE4EC]/40 p-5 rounded-2xl">
                                <div className="text-xs uppercase tracking-widest text-[#E91E63] font-bold">
                                  SPECIALIZATION ELECTIVE
                                </div>
                                <div className="text-sm font-bold tracking-wider text-black mt-1">
                                  DATA SCIENCE (22DS1006)
                                </div>
                                <div className="text-base sm:text-xl font-extrabold text-black mt-2">
                                  {mod.name}
                                </div>
                              </div>

                              <div className="text-sm sm:text-base leading-relaxed text-black whitespace-pre-line font-normal space-y-4">
                                {mod.lectureNotesText}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 10. BOTTOM MODULE NAVIGATION: INSTRUCTIONAL PERIODS DISTRIBUTION (45 PERIODS) */}
          <div className="rounded-2xl border border-zinc-800 bg-black text-white p-6 shadow-xl space-y-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                INSTRUCTIONAL PERIODS DISTRIBUTION (45 PERIODS)
              </h3>
              <span className="text-xs font-mono font-bold text-zinc-400">
                Total: 45 Contact Periods · Theory &amp; Lab
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
              {modules.slice(0, 5).map((m, idx) => {
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setActiveModuleCode(m.code);
                      setExpandedModules((prev) => ({
                        ...prev,
                        [m.id]: true,
                      }));
                      const el = document.getElementById(m.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-4 rounded-xl border border-zinc-700 bg-zinc-900 text-white hover:border-[#E91E63] cursor-pointer transition-all flex flex-col justify-between group shadow-xs"
                  >
                    <div>
                      <div className="h-1 w-full rounded-full bg-zinc-700 mb-3 group-hover:bg-[#E91E63] transition-colors" />
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                        {m.code} · {m.periods || 9} PERIODS
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-2">
                        {m.shortTitle}
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-3 flex items-center justify-between">
                      <span>Unit {idx + 1}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E91E63] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Ask Instructor Modal (BLACK CARD with WHITE text) */}
      {instructorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-black border border-zinc-700 p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#E91E63]" />
                <h3 className="text-sm font-bold text-white">Inquire with Faculty</h3>
              </div>
              <button
                onClick={() => setInstructorModalOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-300">
              Submit your curriculum, algorithm, or laboratory inquiry directly to faculty advisor Dr. R. V. Raman.
            </p>
            <textarea
              rows={4}
              placeholder="Type your question regarding Data Science Module contents..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setInstructorModalOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Inquiry dispatched to Faculty In-Charge.');
                  setInstructorModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#E91E63] text-white text-xs font-bold hover:bg-[#D81B60] transition-colors cursor-pointer shadow-xs"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Module Modal (BLACK CARD with WHITE text) */}
      {isModalOpen && editingMod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-700 bg-black text-white overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Create New Module' : 'Edit Module'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingMod(null);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Module Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={editingMod.name || ''}
                  onChange={(e) => setEditingMod({ ...editingMod, name: e.target.value })}
                  placeholder="e.g. MODULE 1: INTRODUCTION"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Code (e.g. M1, M2)
                  </label>
                  <input
                    type="text"
                    value={editingMod.code || ''}
                    onChange={(e) => setEditingMod({ ...editingMod, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Periods
                  </label>
                  <input
                    type="number"
                    value={editingMod.periods || 9}
                    onChange={(e) => setEditingMod({ ...editingMod, periods: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Processing Overview &amp; Description
                </label>
                <textarea
                  rows={3}
                  value={editingMod.description || ''}
                  onChange={(e) => setEditingMod({ ...editingMod, description: e.target.value })}
                  placeholder="Module objectives and algorithmic foundations..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Module Image URL
                </label>
                <input
                  type="url"
                  value={editingMod.imageUrl || ''}
                  onChange={(e) => setEditingMod({ ...editingMod, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload directly from card"
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingMod(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>{isNew ? 'Create Module' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
