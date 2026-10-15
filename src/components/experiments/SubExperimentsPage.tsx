import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Layers,
  FileText,
  Upload,
  Image as ImageIcon,
  Camera,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { SubExperimentCategory, SubExperimentItem } from '../../types/lab';

const CATEGORIES: SubExperimentCategory[] = [
  'All',
  'Python',
  'Pandas',
  'NumPy',
  'PySpark',
  'SQL',
  'SQL + Python',
  'Other',
];

export const SubExperimentsPage: React.FC = () => {
  const {
    selectedExperiment,
    experiments,
    selectSubExperiment,
    addSubExperiment,
    updateSubExperiment,
    deleteSubExperiment,
    setSubExperimentImage,
    setCurrentPage,
  } = useLab();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubExperimentCategory>('All');

  // Sub-experiment image upload handling
  const subFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingSubId, setUploadingSubId] = useState<string | null>(null);

  const handleTriggerSubUpload = (subId: string) => {
    setUploadingSubId(subId);
    subFileInputRef.current?.click();
  };

  const handleSubImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingSubId || !exp) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSubExperimentImage(exp.id, uploadingSubId, reader.result);
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
    setUploadingSubId(null);
  };

  const handleRemoveSubImage = (subId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (exp) {
      updateSubExperiment(exp.id, subId, { imageUrl: '' });
    }
  };

  // Modal State for Add or Edit Sub-Experiment
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Partial<SubExperimentItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const exp = selectedExperiment || experiments[0];
  if (!exp) {
    return (
      <div className="p-8 text-center rounded-2xl border border-zinc-800 bg-black text-white shadow-xl">
        <p className="text-sm font-bold text-white">No experiment selected.</p>
        <button
          onClick={() => setCurrentPage('experiments')}
          className="mt-3 px-4 py-2 text-xs font-bold rounded-xl bg-[#E91E63] text-white hover:bg-[#D81B60] transition-colors cursor-pointer"
        >
          View Experiments
        </button>
      </div>
    );
  }

  const subExperiments = exp.subExperiments || [];
  const filteredSubs = subExperiments.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || sub.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleStartAdd = () => {
    setIsNew(true);
    setEditingSub({
      name: '',
      description: '',
      category: selectedCategory !== 'All' ? selectedCategory : 'Python',
      status: 'Not Started',
      progress: 0,
      language: 'Python 3.11',
    });
    setIsModalOpen(true);
  };

  const handleStartEdit = (sub: SubExperimentItem) => {
    setIsNew(false);
    setEditingSub({ ...sub });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub || !editingSub.name) return;
    if (isNew) {
      addSubExperiment(exp.id, {
        name: editingSub.name.trim(),
        description: editingSub.description?.trim() || '',
        category: editingSub.category || 'Python',
        status: editingSub.status || 'Not Started',
        progress: Number(editingSub.progress) || 0,
        language: editingSub.language || 'Python 3.11',
      });
    } else if (editingSub.id) {
      updateSubExperiment(exp.id, editingSub.id, {
        name: editingSub.name.trim(),
        description: editingSub.description?.trim(),
        category: editingSub.category,
        status: editingSub.status,
        progress: Number(editingSub.progress) || 0,
        language: editingSub.language,
      });
    }
    setIsModalOpen(false);
    setEditingSub(null);
  };

  return (
    <div className="space-y-6 pb-16 w-full text-black dark:text-white">
      {/* Hidden file input for uploading/replacing sub-experiment images */}
      <input
        type="file"
        ref={subFileInputRef}
        onChange={handleSubImageFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Header Card (BLACK with WHITE text) */}
      <div className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-zinc-800 mb-4">
          <button
            onClick={() => setCurrentPage('experiments')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-[#E91E63] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#E91E63]" />
            <span>Back to All Experiments</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-400">
              Experiment Status:
            </span>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full border border-zinc-700 text-white bg-zinc-900">
              {exp.progress}% ({exp.status})
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
              <FlaskConical className="w-4 h-4 text-[#E91E63]" />
              <span>Experiment: {exp.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              Sub-Experiments ({subExperiments.length})
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed text-zinc-300">
              {exp.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setCurrentPage('lab-record')}
              className="px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#E91E63]" />
              <span>View Lab Record</span>
            </button>
            <button
              onClick={handleStartAdd}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Add Sub-Experiment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filters (BLACK CARD with WHITE text) */}
      <div className="border border-zinc-800 rounded-2xl p-5 bg-black text-white shadow-xl space-y-4 w-full">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search sub-experiments by algorithm name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E91E63] text-white shadow-xs'
                  : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-[#E91E63] hover:text-[#E91E63]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Experiments Cards Grid (Full Width, 3 columns on desktop, BLACK CARDS) */}
      {filteredSubs.length === 0 ? (
        <div className="border border-zinc-800 rounded-2xl p-12 text-center bg-black text-white shadow-xl w-full">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">
            No Sub-Experiments Found
          </h3>
          <p className="text-xs font-normal max-w-sm mx-auto mt-1 mb-5 text-zinc-400">
            {searchQuery || selectedCategory !== 'All'
              ? 'No matching sub-experiments for your filter.'
              : 'Add unlimited sub-experiments to this experiment module.'}
          </p>
          <button
            onClick={handleStartAdd}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#E91E63] text-white hover:bg-[#D81B60] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add Sub-Experiment</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredSubs.map((sub) => {
            return (
              <div
                key={sub.id}
                className="rounded-2xl border border-zinc-800 bg-black text-white shadow-xl hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* [Relevant Image]: Each sub-experiment has its OWN dedicated topic image */}
                  {sub.imageUrl ? (
                    <div className="relative w-full h-44 bg-zinc-900 overflow-hidden border-b border-zinc-800 group/img">
                      <img
                        src={sub.imageUrl}
                        alt={sub.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTriggerSubUpload(sub.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#E91E63] text-white hover:bg-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveSubImage(sub.id, e)}
                          className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[#E91E63]" />
                          <span>Remove</span>
                        </button>
                      </div>
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded text-[10px] font-semibold border border-zinc-800">
                        <ImageIcon className="w-3 h-3 text-[#E91E63]" />
                        <span>Topic Visual</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-950 border-b border-zinc-800">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTriggerSubUpload(sub.id);
                        }}
                        className="w-full h-36 rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#E91E63] bg-zinc-900 hover:bg-zinc-800 flex flex-col items-center justify-center gap-2 text-white transition-colors cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                          <Upload className="w-4 h-4 text-[#E91E63]" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          [ Upload Sub-Experiment Image ]
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          PNG, JPG, or WEBP up to 5MB
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-700 text-zinc-300 bg-zinc-900">
                        {sub.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-700 flex items-center gap-1 text-white bg-zinc-900">
                          {sub.status === 'Completed' && <CheckCircle2 className="w-3 h-3 text-[#E91E63]" />}
                          {sub.status === 'In Progress' && <Clock className="w-3 h-3 text-[#E91E63]" />}
                          {sub.status === 'Not Started' && <AlertCircle className="w-3 h-3 text-zinc-500" />}
                          <span>{sub.status}</span>
                        </span>
                        <button
                          onClick={() => handleStartEdit(sub)}
                          className="p-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] hover:text-[#E91E63] transition-colors cursor-pointer"
                          title="Edit Sub-Experiment"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${sub.name}"?`)) {
                              deleteSubExperiment(exp.id, sub.id);
                            }
                          }}
                          className="p-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-black hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
                          title="Delete Sub-Experiment"
                        >
                          <Trash2 className="w-3 h-3 text-[#E91E63]" />
                        </button>
                      </div>
                    </div>

                    <h3
                      onClick={() => selectSubExperiment(exp.id, sub.id)}
                      className="text-base sm:text-lg font-bold cursor-pointer hover:text-[#E91E63] transition-colors text-white"
                    >
                      {sub.name}
                    </h3>
                    <p className="text-xs line-clamp-2 leading-relaxed font-normal text-zinc-300">
                      {sub.description || 'Click Open to write code and execute outputs.'}
                    </p>

                    <div className="pt-2 border-t border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                        <span>Execution</span>
                        <span className="font-mono tabular-nums text-white">
                          {sub.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 border border-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E91E63] rounded-full transition-all duration-300"
                          style={{ width: `${sub.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-zinc-400">
                      {sub.language}
                    </span>
                    <button
                      onClick={() => selectSubExperiment(exp.id, sub.id)}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Open Code Lab</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Sub-Experiment Modal (BLACK with WHITE text) */}
      {isModalOpen && editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-700 bg-black text-white overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Create Sub-Experiment' : 'Edit Sub-Experiment'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingSub(null);
                }}
                className="p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Sub-Experiment Name
                </label>
                <input
                  type="text"
                  required
                  value={editingSub.name || ''}
                  onChange={(e) => setEditingSub({ ...editingSub, name: e.target.value })}
                  placeholder="e.g. Distributed K-Means Clustering on PySpark"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingSub.description || ''}
                  onChange={(e) => setEditingSub({ ...editingSub, description: e.target.value })}
                  placeholder="Learning targets and problem statements..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Category
                  </label>
                  <select
                    value={editingSub.category || 'Python'}
                    onChange={(e) => setEditingSub({ ...editingSub, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  >
                    <option value="Python">Python</option>
                    <option value="Pandas">Pandas</option>
                    <option value="NumPy">NumPy</option>
                    <option value="PySpark">PySpark</option>
                    <option value="SQL">SQL</option>
                    <option value="SQL + Python">SQL + Python</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Language
                  </label>
                  <select
                    value={editingSub.language || 'Python 3.11'}
                    onChange={(e) => setEditingSub({ ...editingSub, language: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  >
                    <option value="Python 3.11">Python 3.11</option>
                    <option value="PySpark">PySpark</option>
                    <option value="SQL">SQL</option>
                    <option value="SQL + Python">SQL + Python</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Status
                  </label>
                  <select
                    value={editingSub.status || 'Not Started'}
                    onChange={(e) => setEditingSub({ ...editingSub, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingSub.progress || 0}
                    onChange={(e) => setEditingSub({ ...editingSub, progress: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  {isNew ? 'Add Sub-Experiment' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingSub(null);
                  }}
                  className="py-2.5 px-4 rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
