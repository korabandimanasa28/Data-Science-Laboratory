import React, { useRef, useState } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  ExternalLink,
  Github,
  BookOpen,
  Edit2,
  Trash2,
  Upload,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code,
  Tag,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { ProjectItem } from '../../types/lab';

const CATEGORIES = [
  'All',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Data Engineering',
  'Computer Vision',
];

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    setProjectImage,
    isAdmin,
  } = useLab();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State for Add or Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [techStackInput, setTechStackInput] = useState('');

  // Modal for Viewing Full Project Details (accessible to both users and admins)
  const [viewingProject, setViewingProject] = useState<ProjectItem | null>(null);

  // Hidden Image File Input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetProjectIdForUpload, setTargetProjectIdForUpload] = useState<string | null>(null);

  const handleStartAdd = () => {
    setIsNew(true);
    setEditingProject({
      title: '',
      category: 'Machine Learning',
      description: '',
      status: 'Completed',
      techStack: ['Python 3.11', 'Pandas'],
      imageUrl: '',
      githubUrl: 'https://github.com/dslab/',
      notebookUrl: 'https://colab.research.google.com/dslab/',
      author: 'Student Researcher',
      metrics: '92.5% Accuracy',
    });
    setTechStackInput('Python 3.11, Pandas');
    setIsEditModalOpen(true);
  };

  const handleStartEdit = (proj: ProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNew(false);
    setEditingProject({ ...proj });
    setTechStackInput((proj.techStack || []).join(', '));
    setIsEditModalOpen(true);
  };

  const handleDelete = (proj: ProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete project "${proj.title}"?`)) {
      deleteProject(proj.id);
    }
  };

  const handleTriggerUpload = (projId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetProjectIdForUpload(projId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetProjectIdForUpload) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Project image must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProjectImage(targetProjectIdForUpload, reader.result);
      }
      setTargetProjectIdForUpload(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (projId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove image from this project?')) {
      updateProject(projId, { imageUrl: '' });
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    const parsedTechStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (isNew) {
      addProject({
        title: editingProject.title.trim(),
        category: editingProject.category || 'Machine Learning',
        description: editingProject.description?.trim() || '',
        status: editingProject.status || 'Completed',
        techStack: parsedTechStack.length > 0 ? parsedTechStack : ['Python 3.11'],
        imageUrl: editingProject.imageUrl?.trim() || '',
        githubUrl: editingProject.githubUrl?.trim() || undefined,
        notebookUrl: editingProject.notebookUrl?.trim() || undefined,
        demoUrl: editingProject.demoUrl?.trim() || undefined,
        author: editingProject.author?.trim() || 'Laboratory Cohort',
        metrics: editingProject.metrics?.trim() || undefined,
      });
    } else if (editingProject.id) {
      updateProject(editingProject.id, {
        title: editingProject.title.trim(),
        category: editingProject.category,
        description: editingProject.description?.trim(),
        status: editingProject.status,
        techStack: parsedTechStack,
        imageUrl: editingProject.imageUrl?.trim() || '',
        githubUrl: editingProject.githubUrl?.trim() || undefined,
        notebookUrl: editingProject.notebookUrl?.trim() || undefined,
        demoUrl: editingProject.demoUrl?.trim() || undefined,
        author: editingProject.author?.trim(),
        metrics: editingProject.metrics?.trim(),
        updatedAt: new Date().toISOString(),
      });
    }

    setIsEditModalOpen(false);
    setEditingProject(null);
  };

  // Filter projects by category and search
  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.techStack || []).some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      proj.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 w-full text-black">
      {/* Hidden file input for project image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4 w-full">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
              Projects
            </h1>
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border border-black/15 bg-[#FCE4EC] text-black">
              {projects.length} Published
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-black/60 mt-0.5">
            Academic data science research implementations, predictive modeling pipelines, and exploratory projects.
          </p>
        </div>

        {/* Admin only "Add Project" button */}
        {isAdmin ? (
          <button
            type="button"
            onClick={handleStartAdd}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add Project</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/15 bg-white text-xs font-semibold text-black/70 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E91E63]" />
            <span>Student Exploration Portal</span>
          </div>
        )}
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E91E63] text-white shadow-xs'
                  : 'bg-white border border-black/15 text-black hover:border-[#E91E63] hover:text-[#E91E63]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px] max-w-md w-full md:w-auto">
          <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, stack, or authors..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-black/15 bg-white text-black text-xs sm:text-sm font-medium focus:outline-none focus:border-[#E91E63]"
          />
        </div>
      </div>

      {/* Projects Grid (Full Width, 3 columns on large screens) */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl p-12 border border-zinc-800 bg-black text-white text-center shadow-xl">
          <FolderGit2 className="w-10 h-10 text-[#E91E63] mx-auto mb-2.5" />
          <h3 className="text-base font-bold text-white">No projects found</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Try adjusting your search query or selected category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setViewingProject(proj)}
              className="rounded-2xl border border-zinc-800 bg-black text-white shadow-xl hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div>
                {/* Project Image Banner */}
                {proj.imageUrl ? (
                  <div className="relative w-full h-44 bg-zinc-950 overflow-hidden border-b border-zinc-800 group/img">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        <button
                          type="button"
                          onClick={(e) => handleTriggerUpload(proj.id, e)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#E91E63] text-white hover:bg-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Change</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveImage(proj.id, e)}
                          className="px-2.5 py-1.5 rounded-lg bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3 text-[#E91E63]" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-zinc-700 bg-black/85 backdrop-blur-xs text-white">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-950 border-b border-zinc-800">
                    {isAdmin ? (
                      <button
                        type="button"
                        onClick={(e) => handleTriggerUpload(proj.id, e)}
                        className="w-full h-36 rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#E91E63] bg-zinc-900 hover:bg-zinc-800 flex flex-col items-center justify-center gap-1 text-white transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-[#E91E63]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          [ Upload Project Image ]
                        </span>
                        <span className="text-[10px] text-zinc-400">PNG or JPG up to 5MB</span>
                      </button>
                    ) : (
                      <div className="w-full h-24 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <FolderGit2 className="w-8 h-8 text-[#E91E63]" />
                      </div>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#E91E63] font-bold uppercase">
                      {proj.status}
                    </span>
                    {proj.metrics && (
                      <span className="text-[11px] font-mono font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md truncate max-w-[160px]">
                        {proj.metrics}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-2 hover:text-[#E91E63] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs font-normal text-zinc-300 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(proj.techStack || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {(proj.techStack || []).length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-400">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer with Actions */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-400 font-medium truncate">
                  By {proj.author}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-[#E91E63] transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {proj.notebookUrl && (
                    <a
                      href={proj.notebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-[#E91E63] transition-colors"
                      title="Open Jupyter / Colab Notebook"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#E91E63]" />
                    </a>
                  )}

                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleStartEdit(proj, e)}
                        className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-[#E91E63] hover:border-[#E91E63] transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(proj, e)}
                        className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-[#E91E63] transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Modal (Available to both Users & Admins) */}
      {viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-black text-white rounded-3xl border border-zinc-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {viewingProject.imageUrl && (
              <div className="w-full h-56 bg-zinc-900 overflow-hidden relative border-b border-zinc-800">
                <img
                  src={viewingProject.imageUrl}
                  alt={viewingProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setViewingProject(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-5">
              {!viewingProject.imageUrl && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setViewingProject(null)}
                    className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold border border-zinc-700 bg-zinc-900 text-white">
                    {viewingProject.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E91E63]">
                    {viewingProject.status}
                  </span>
                  {viewingProject.metrics && (
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-200">
                      {viewingProject.metrics}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {viewingProject.title}
                </h2>
                <div className="text-xs text-zinc-400 mt-1">
                  Author: <span className="text-white font-semibold">{viewingProject.author}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Project Architecture &amp; Methodology
                </h4>
                <p className="text-sm font-normal text-zinc-200 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  {viewingProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Computational Stack &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(viewingProject.techStack || []).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-zinc-900 text-white border border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {viewingProject.githubUrl && (
                    <a
                      href={viewingProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs font-bold hover:border-[#E91E63] transition-colors flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                  {viewingProject.notebookUrl && (
                    <a
                      href={viewingProject.notebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-bold transition-colors flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                      <span>Jupyter Notebook</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setViewingProject(null)}
                  className="px-4 py-2 rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add / Edit Modal */}
      {isAdmin && isEditModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-black text-white rounded-3xl border border-zinc-800 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">
                {isNew ? 'Publish New Research Project' : 'Edit Project Details'}
              </h2>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  placeholder="e.g. Real-Time Churn Analytics Pipeline"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    Category
                  </label>
                  <select
                    value={editingProject.category || 'Machine Learning'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    Status
                  </label>
                  <select
                    value={editingProject.status || 'Completed'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                  Description &amp; Research Methodology *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  placeholder="Describe the algorithms, data pipeline, and problem statement..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Python 3.11, PyTorch, Pandas, Scikit-Learn"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    Lead Author / Researchers
                  </label>
                  <input
                    type="text"
                    value={editingProject.author || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, author: e.target.value })
                    }
                    placeholder="e.g. K. Mansa (Lead)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    Key Performance Metrics
                  </label>
                  <input
                    type="text"
                    value={editingProject.metrics || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, metrics: e.target.value })
                    }
                    placeholder="e.g. 94.2% ROC-AUC · 0.89 F1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/dslab/project"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    Notebook URL (optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.notebookUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, notebookUrl: e.target.value })
                    }
                    placeholder="https://colab.research.google.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={editingProject.imageUrl || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  {isNew ? 'Publish Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
