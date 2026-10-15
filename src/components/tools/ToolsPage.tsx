import React, { useRef, useState } from 'react';
import {
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Save,
  Info,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { ToolItem } from '../../types/lab';

export const ToolsPage: React.FC = () => {
  const { tools, addTool, updateTool, deleteTool, setToolImage } = useLab();

  // Hidden file input for uploading tool images
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetToolIdForUpload, setTargetToolIdForUpload] = useState<string | null>(null);

  // Modal State for Add or Edit Tool
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Partial<ToolItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Detail Modal for viewing full description when user clicks tool
  const [viewingTool, setViewingTool] = useState<ToolItem | null>(null);

  const handleStartAdd = () => {
    setIsNew(true);
    setEditingTool({
      name: '',
      description: '',
      icon: 'terminal',
      imageUrl: '',
      link: 'https://',
    });
    setIsModalOpen(true);
  };

  const handleStartEdit = (tool: ToolItem) => {
    setIsNew(false);
    setEditingTool({ ...tool });
    setIsModalOpen(true);
  };

  const handleTriggerUpload = (toolId: string) => {
    setTargetToolIdForUpload(toolId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetToolIdForUpload) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Tool image must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setToolImage(targetToolIdForUpload, reader.result);
      }
      setTargetToolIdForUpload(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (toolId: string) => {
    if (confirm('Remove image from this tool?')) {
      updateTool(toolId, { imageUrl: '' });
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool || !editingTool.name) return;
    if (isNew) {
      addTool({
        name: editingTool.name.trim(),
        description: editingTool.description?.trim() || '',
        icon: editingTool.icon || 'terminal',
        imageUrl: editingTool.imageUrl?.trim() || undefined,
        link: editingTool.link?.trim() || undefined,
      });
    } else if (editingTool.id) {
      updateTool(editingTool.id, {
        name: editingTool.name.trim(),
        description: editingTool.description?.trim(),
        icon: editingTool.icon,
        imageUrl: editingTool.imageUrl?.trim() || undefined,
        link: editingTool.link?.trim() || undefined,
      });
    }
    setIsModalOpen(false);
    setEditingTool(null);
  };

  return (
    <div className="space-y-6 pb-16 w-full text-black dark:text-white">
      {/* Hidden file input for uploading tool images */}
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
            Tools
          </h1>
          <p className="text-xs sm:text-sm font-medium text-black/60 mt-0.5">
            Computational frameworks, interactive environments, and statistical toolchains.
          </p>
        </div>
        <button
          onClick={handleStartAdd}
          className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Tool</span>
        </button>
      </div>

      {/* 3-Column Desktop Grid that spans full available width (BLACK CARDS with WHITE TEXT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {tools.map((tool) => {
          return (
            <div
              key={tool.id}
              className="rounded-2xl border border-zinc-800 bg-black text-white shadow-xl hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* 1. LARGE PROFESSIONAL IMAGE AREA (Consistent dimensions across all tools) */}
                {tool.imageUrl ? (
                  <div className="relative w-full h-52 bg-zinc-900 overflow-hidden border-b border-zinc-800 group/img">
                    <img
                      src={tool.imageUrl}
                      alt={tool.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTriggerUpload(tool.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#E91E63] text-white hover:bg-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(tool.id)}
                        className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#E91E63]" />
                        <span>Remove</span>
                      </button>
                    </div>
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded text-[11px] font-semibold border border-zinc-800">
                      <ImageIcon className="w-3 h-3 text-[#E91E63]" />
                      <span>Tool Asset</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-950 border-b border-zinc-800">
                    <button
                      type="button"
                      onClick={() => handleTriggerUpload(tool.id)}
                      className="w-full h-44 rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#E91E63] bg-zinc-900 hover:bg-zinc-800 flex flex-col items-center justify-center gap-2 text-white transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                        <Upload className="w-4 h-4 text-[#E91E63]" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        [ Upload Tool Image ]
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        High-resolution screenshot or banner
                      </span>
                    </button>
                  </div>
                )}

                {/* 2. TOOL BODY: Name + Quick Controls */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3
                      onClick={() => setViewingTool(tool)}
                      className="text-lg font-bold text-white hover:text-[#E91E63] transition-colors cursor-pointer tracking-tight"
                      title="Click to view full description"
                    >
                      {tool.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setViewingTool(tool)}
                        className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] hover:text-[#E91E63] transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Info className="w-4 h-4 text-[#E91E63]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(tool)}
                        className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] hover:text-[#E91E63] transition-colors cursor-pointer"
                        title="Edit Tool"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${tool.name}"?`)) deleteTool(tool.id);
                        }}
                        className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
                        title="Delete Tool"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#E91E63]" />
                      </button>
                    </div>
                  </div>

                  {/* Image Edit & Remove Buttons directly on card */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleTriggerUpload(tool.id)}
                      className="flex-1 py-1.5 px-3 rounded-lg border border-zinc-700 bg-zinc-900 text-white hover:border-[#E91E63] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3 h-3 text-[#E91E63]" />
                      <span>{tool.imageUrl ? 'Edit Image' : 'Upload Image'}</span>
                    </button>
                    {tool.imageUrl && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(tool.id)}
                        className="py-1.5 px-3 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E91E63] hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3 text-[#E91E63]" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. [ Launch Platform ] Action Button */}
              <div className="p-5 pt-0">
                {tool.link ? (
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Launch Platform</span>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setViewingTool(tool)}
                    className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Platform Details</span>
                    <ExternalLink className="w-4 h-4 text-[#E91E63]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tool Details Modal (BLACK CARD with WHITE text) */}
      {viewingTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-700 bg-black text-white overflow-hidden">
            {viewingTool.imageUrl && (
              <div className="w-full h-48 bg-zinc-900 overflow-hidden border-b border-zinc-800">
                <img
                  src={viewingTool.imageUrl}
                  alt={viewingTool.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    {viewingTool.name}
                  </h2>
                  <span className="text-xs font-mono text-zinc-400">
                    Data Science Toolchain
                  </span>
                </div>
                <button
                  onClick={() => setViewingTool(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Description &amp; Capabilities
                </h4>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {viewingTool.description || 'Core computational laboratory framework for data science research, mathematical analytics, and modeling pipelines.'}
                </p>
              </div>

              {viewingTool.link && (
                <div className="pt-2">
                  <a
                    href={viewingTool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Open Documentation &amp; Platform</span>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Tool Modal (BLACK CARD with WHITE text) */}
      {isModalOpen && editingTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl shadow-xl border border-zinc-700 bg-black text-white overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Add Data Science Tool' : 'Edit Tool'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTool(null);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Tool Name
                </label>
                <input
                  type="text"
                  required
                  value={editingTool.name || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                  placeholder="e.g. Pandas, PySpark, PyTorch"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Tool Image URL
                </label>
                <input
                  type="url"
                  value={editingTool.imageUrl || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload directly from card"
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingTool.description || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  placeholder="Toolchain capabilities, version, and usage..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  External URL / Docs
                </label>
                <input
                  type="url"
                  value={editingTool.link || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-xs font-medium focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTool(null);
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
                  <span>{isNew ? 'Create Tool' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
