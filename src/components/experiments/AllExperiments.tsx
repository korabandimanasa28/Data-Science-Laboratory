import React, { useRef, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Upload,
  Image as ImageIcon,
  Save,
  FileText,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { ExperimentItem } from '../../types/lab';

export const AllExperiments: React.FC = () => {
  const {
    experiments,
    addExperiment,
    updateExperiment,
    deleteExperiment,
    selectExperiment,
    setExperimentImage,
    setCurrentPage,
    isAdmin,
  } = useLab();

  // Modal State for Add or Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Partial<ExperimentItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Hidden file input for uploading an image to an experiment
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetExpIdForUpload, setTargetExpIdForUpload] = useState<string | null>(null);

  const handleStartAdd = () => {
    setIsNew(true);
    setEditingExp({
      title: '',
      description: '',
      status: 'Not Started',
      progress: 0,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleStartEdit = (exp: ExperimentItem) => {
    setIsNew(false);
    setEditingExp({ ...exp });
    setIsModalOpen(true);
  };

  const handleTriggerUpload = (expId: string) => {
    setTargetExpIdForUpload(expId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetExpIdForUpload) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Experiment image must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setExperimentImage(targetExpIdForUpload, reader.result);
      }
      setTargetExpIdForUpload(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (expId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove image from this experiment?')) {
      updateExperiment(expId, { imageUrl: '' });
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.title) return;
    if (isNew) {
      addExperiment(
        editingExp.title,
        editingExp.description,
        editingExp.imageUrl
      );
    } else if (editingExp.id) {
      updateExperiment(editingExp.id, {
        title: editingExp.title,
        description: editingExp.description,
        status: editingExp.status,
        progress: Number(editingExp.progress) || 0,
        imageUrl: editingExp.imageUrl,
      });
    }
    setIsModalOpen(false);
    setEditingExp(null);
  };

  return (
    <div className="space-y-6 pb-16 w-full text-black dark:text-white">
      {/* Hidden file input for uploading experiment image */}
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            Experiments
          </h1>
          <p className="text-xs sm:text-sm font-medium text-black/60 mt-0.5">
            Total {experiments.length} research curricula. Each experiment has its own dedicated image, sub-tasks, and code workspace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setCurrentPage('lab-record')}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-black shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#E91E63]" />
            <span>Official Lab Record Document</span>
          </button>
          {isAdmin && (
            <button
              onClick={handleStartAdd}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Add Experiment</span>
            </button>
          )}
        </div>
      </div>

      {/* Experiment Cards Grid (Spans full available width, BLACK CARDS with WHITE TEXT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {experiments.map((exp, index) => {
          const subCount = exp.subExperiments?.length || 0;
          return (
            <div
              key={exp.id}
              className="rounded-2xl border border-zinc-800 bg-black text-white shadow-xl hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* 1. TOP PROMINENT IMAGE SECTION: Each experiment has its OWN image */}
                {exp.imageUrl ? (
                  <div className="relative w-full h-52 bg-zinc-900 overflow-hidden border-b border-zinc-800 group/img">
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleTriggerUpload(exp.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#E91E63] text-white hover:bg-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveImage(exp.id, e)}
                          className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[#E91E63]" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded text-[11px] font-semibold border border-zinc-800">
                      <ImageIcon className="w-3 h-3 text-[#E91E63]" />
                      <span>Custom Image</span>
                    </div>
                  </div>
                ) : (
                  isAdmin && (
                    <div className="p-4 bg-zinc-950 border-b border-zinc-800">
                      <button
                        type="button"
                        onClick={() => handleTriggerUpload(exp.id)}
                        className="w-full h-44 rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#E91E63] bg-zinc-900 hover:bg-zinc-800 flex flex-col items-center justify-center gap-2 text-white transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                          <Upload className="w-4 h-4 text-[#E91E63]" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          [ Upload Experiment Image ]
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          PNG, JPG, or WEBP up to 5MB
                        </span>
                      </button>
                    </div>
                  )
                )}

                {/* Card Content Area (WHITE text inside BLACK card) */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-xs">
                        <FlaskConical className="w-3.5 h-3.5 text-[#E91E63]" />
                      </div>
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400">
                        Experiment {index + 101}
                      </span>
                    </div>

                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-zinc-700 flex items-center gap-1 text-white bg-zinc-900">
                      {exp.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 text-[#E91E63]" />}
                      {exp.status === 'In Progress' && <Clock className="w-3.5 h-3.5 text-[#E91E63]" />}
                      {exp.status === 'Not Started' && <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />}
                      <span>{exp.status}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => selectExperiment(exp.id)}
                    className="text-base sm:text-lg font-bold cursor-pointer hover:text-[#E91E63] transition-colors text-white"
                  >
                    {exp.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs font-normal line-clamp-3 leading-relaxed text-zinc-300">
                    {exp.description}
                  </p>

                  {/* Progress & Sub-Tasks indicator */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1.5">
                      <span>Sub-Tasks ({subCount})</span>
                      <span className="font-mono tabular-nums text-white font-bold">{exp.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 border border-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E91E63] rounded-full transition-all duration-300"
                        style={{ width: `${exp.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: [ Open Sub-Experiments ] and [ Edit ] [ Remove ] */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => selectExperiment(exp.id)}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Sub-Experiments</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('lab-record')}
                    className="px-2.5 py-2 text-xs font-semibold rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] transition-colors cursor-pointer flex items-center gap-1"
                    title="View in Lab Record Document"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#E91E63]" />
                    <span className="hidden sm:inline">Record</span>
                  </button>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(exp)}
                      className="px-2.5 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white hover:border-[#E91E63] hover:text-[#E91E63] transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                      title="Edit Experiment"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-white" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete "${exp.title}"?`)) deleteExperiment(exp.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-black hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                      title="Remove Experiment"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#E91E63]" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Experiment Modal (BLACK with WHITE text) */}
      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-700 bg-black text-white overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Create New Experiment' : 'Edit Experiment'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingExp(null);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Experiment Title
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.title || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  placeholder="e.g. Experiment 101: PySpark Data Pipelines"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  placeholder="Overview of algorithms, dataset, and laboratory requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Experiment Image URL
                </label>
                <input
                  type="url"
                  value={editingExp.imageUrl || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload directly from card"
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Status
                  </label>
                  <select
                    value={editingExp.status || 'Not Started'}
                    onChange={(e) => setEditingExp({ ...editingExp, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Progress %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingExp.progress ?? 0}
                    onChange={(e) => setEditingExp({ ...editingExp, progress: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingExp(null);
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
                  <span>{isNew ? 'Create' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
