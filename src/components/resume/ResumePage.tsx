import React, { useRef, useState } from 'react';
import {
  FileText,
  Upload,
  Trash2,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  X,
  FileCheck2,
  FileCode,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const ResumePage: React.FC = () => {
  const { resume, uploadResume, deleteResume } = useLab();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorToast(null);

    // Validate type (PDF, DOC, DOCX)
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setErrorToast('Please select a valid PDF, DOC, or DOCX document.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorToast('File size exceeds the 10MB limit.');
      return;
    }

    setUploadProgress(25);
    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 25;
      });
    }, 100);

    const reader = new FileReader();
    reader.onload = () => {
      clearInterval(progressTimer);
      setUploadProgress(100);
      setTimeout(() => {
        uploadResume({
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          fileType: file.type || 'application/pdf',
          status: 'Verified',
          dataUrl: typeof reader.result === 'string' ? reader.result : undefined,
          notes: 'Uploaded for academic Data Science lab evaluations and faculty verification.',
        });
        setUploadProgress(null);
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 3000);
      }, 250);
    };
    reader.readAsDataURL(file);

    if (e.target) e.target.value = '';
  };

  return (
    <div className="space-y-6 pb-16 w-full text-black">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
      />

      {/* Header Banner - BLACK CARD with WHITE TEXT */}
      <div className="rounded-2xl p-6 sm:p-8 border border-zinc-800 bg-black text-white shadow-xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-xs font-bold uppercase tracking-wider text-white">
              <span className="w-2 h-2 rounded-full bg-[#E91E63]" />
              <span>Career &amp; Credential Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Resume
            </h1>
            <p className="text-xs sm:text-sm font-normal text-zinc-300 max-w-2xl leading-relaxed">
              Upload, preview, replace, or download your personal curriculum vitae or resume document for academic evaluations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>{resume ? 'Upload New Version' : 'Upload Resume'}</span>
          </button>
        </div>

        {/* Upload Progress Bar */}
        {uploadProgress !== null && (
          <div className="mt-6 pt-5 border-t border-zinc-800 space-y-2">
            <div className="flex justify-between text-xs font-bold text-white">
              <span>Uploading document...</span>
              <span className="font-mono">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-700 overflow-hidden">
              <div
                className="h-full bg-[#E91E63] rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Toast Feedback */}
      {successToast && (
        <div className="p-4 rounded-xl border border-zinc-800 bg-black text-white text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in shadow-md">
          <CheckCircle2 className="w-4 h-4 text-[#E91E63] shrink-0" />
          <span>Resume successfully updated and synchronized with your Data Science profile!</span>
        </div>
      )}

      {errorToast && (
        <div className="p-4 rounded-xl border border-zinc-800 bg-black text-white text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in shadow-md">
          <AlertCircle className="w-4 h-4 text-[#E91E63] shrink-0" />
          <span>{errorToast}</span>
        </div>
      )}

      {/* Personal Resume File Management & Preview (Active Academic Resume section removed completely) */}
      {resume ? (
        <div className="rounded-2xl p-6 sm:p-8 border border-zinc-800 bg-black text-white shadow-xl w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center border border-zinc-800 shrink-0">
                <FileCheck2 className="w-6 h-6 text-[#E91E63]" />
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-bold text-white truncate">
                  {resume.fileName}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mt-0.5">
                  <span>Uploaded {resume.uploadDate}</span>
                  <span>•</span>
                  <span className="font-mono">{resume.fileSize}</span>
                  <span>•</span>
                  <span className="text-[#E91E63] font-semibold">{resume.status}</span>
                </div>
              </div>
            </div>

            {/* File Management Action Controls: Preview, Download, Replace, Remove */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white hover:border-[#E91E63] hover:text-[#E91E63] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Preview document details"
              >
                <Eye className="w-3.5 h-3.5 text-[#E91E63]" />
                <span>Preview</span>
              </button>

              {resume.dataUrl && (
                <a
                  href={resume.dataUrl}
                  download={resume.fileName}
                  className="px-3.5 py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Replace with another document"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E91E63]" />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to remove your resume?')) {
                    deleteResume();
                  }
                }}
                className="p-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
                title="Remove resume document"
              >
                <Trash2 className="w-4 h-4 text-[#E91E63] hover:text-white" />
              </button>
            </div>
          </div>

          {/* Document Overview Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                File Type &amp; Encoding
              </span>
              <span className="text-xs font-mono font-semibold text-white">
                {resume.fileType || 'application/pdf'}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Evaluation Verification
              </span>
              <span className="text-xs font-semibold text-[#E91E63] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified by DS Laboratory Faculty</span>
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Storage Allocation
              </span>
              <span className="text-xs font-mono font-semibold text-zinc-300">
                {resume.fileSize} / 10MB Max
              </span>
            </div>
          </div>

          {resume.notes && (
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Academic Resume Description
              </span>
              <p className="text-xs font-normal text-zinc-300 leading-relaxed">
                {resume.notes}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="rounded-2xl p-14 border border-zinc-800 bg-black text-white text-center cursor-pointer hover:border-[#E91E63] transition-colors w-full shadow-xl"
        >
          <Upload className="w-12 h-12 text-[#E91E63] mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            No Resume Document Attached
          </h3>
          <p className="text-xs sm:text-sm font-normal text-zinc-300 max-w-sm mx-auto mt-1 mb-5">
            Click here to select and upload your academic resume in PDF, DOC, or DOCX format (up to 10MB).
          </p>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 pointer-events-none shadow-xs"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>Select Document to Upload</span>
          </button>
        </div>
      )}

      {/* Resume Document Preview Modal */}
      {isPreviewOpen && resume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-black text-white rounded-3xl border border-zinc-800 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#E91E63]" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Document Preview: {resume.fileName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">File Name:</span>
                <span className="font-semibold text-white">{resume.fileName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">File Size:</span>
                <span className="font-mono text-zinc-300">{resume.fileSize}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Upload Date:</span>
                <span className="text-zinc-300">{resume.uploadDate}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Evaluation Status:</span>
                <span className="font-bold text-[#E91E63]">{resume.status}</span>
              </div>
            </div>

            {resume.dataUrl ? (
              <div className="h-64 rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900 flex items-center justify-center">
                {resume.fileType?.includes('pdf') ? (
                  <iframe
                    src={resume.dataUrl}
                    title="PDF Preview"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <FileCode className="w-10 h-10 text-[#E91E63] mx-auto" />
                    <p className="text-xs text-zinc-300">
                      Binary Word Document ({resume.fileName}) loaded.
                    </p>
                    <a
                      href={resume.dataUrl}
                      download={resume.fileName}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E91E63] text-white text-xs font-bold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File to View</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center border border-zinc-800 rounded-xl bg-zinc-950">
                <p className="text-xs text-zinc-400">Document ready in local storage.</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
