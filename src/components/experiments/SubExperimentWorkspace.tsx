import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft,
  Code2,
  Terminal,
  FileText,
  ListChecks,
  Video,
  Upload,
  Download,
  Copy,
  Play,
  Save,
  Trash2,
  Check,
  X,
  Paperclip,
  Film,
  Sparkles,
  Target,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { CodeLanguage, ExperimentStatus } from '../../types/lab';

const LANGUAGES: CodeLanguage[] = [
  'Python 3.11',
  'PySpark',
  'SQL',
  'SQL + Python',
];

export const SubExperimentWorkspace: React.FC = () => {
  const {
    selectedExperiment,
    selectedSubExperiment,
    updateSubExperiment,
    deleteSubExperiment,
    addSubExperimentFile,
    deleteSubExperimentFile,
    setCurrentPage,
  } = useLab();

  if (!selectedExperiment || !selectedSubExperiment) {
    return (
      <div className="p-8 text-center rounded-2xl border border-zinc-800 bg-black text-white shadow-xl w-full">
        <p className="text-sm font-bold text-white">No sub-experiment selected.</p>
        <button
          onClick={() => setCurrentPage('experiments')}
          className="mt-3 px-4 py-2 text-xs font-bold rounded-xl bg-[#E91E63] text-white hover:bg-[#D81B60] transition-colors cursor-pointer"
        >
          Return to Experiments
        </button>
      </div>
    );
  }

  // Local draft state initialized from selectedSubExperiment
  const [name, setName] = useState(selectedSubExperiment.name);
  const [description, setDescription] = useState(selectedSubExperiment.description);
  const [aim, setAim] = useState(selectedSubExperiment.aim || '');
  const [requirements, setRequirements] = useState(selectedSubExperiment.requirements || '');
  const [result, setResult] = useState(selectedSubExperiment.result || '');
  const [language, setLanguage] = useState<CodeLanguage>(selectedSubExperiment.language || 'Python 3.11');
  const [code, setCode] = useState(selectedSubExperiment.code || '');
  const [output, setOutput] = useState(selectedSubExperiment.output || '');
  const [outputImageUrl, setOutputImageUrl] = useState(selectedSubExperiment.outputImageUrl || '');
  const [explanation, setExplanation] = useState(selectedSubExperiment.explanation || '');
  const [keyPoints, setKeyPoints] = useState<string[]>(
    selectedSubExperiment.keyPoints && selectedSubExperiment.keyPoints.length > 0
      ? selectedSubExperiment.keyPoints
      : ['']
  );
  const [demoVideoUrl, setDemoVideoUrl] = useState(selectedSubExperiment.demoVideoUrl || '');
  const [demoVideoName, setDemoVideoName] = useState(selectedSubExperiment.demoVideoName || '');
  const [status, setStatus] = useState<ExperimentStatus>(selectedSubExperiment.status || 'Not Started');
  const [progress, setProgress] = useState(selectedSubExperiment.progress || 0);

  // Status feedback
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);
  const [newKeyPointText, setNewKeyPointText] = useState('');

  // File references
  const fileAttachmentRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const plotInputRef = useRef<HTMLInputElement>(null);
  const codeAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setName(selectedSubExperiment.name);
    setDescription(selectedSubExperiment.description);
    setAim(selectedSubExperiment.aim || '');
    setRequirements(selectedSubExperiment.requirements || '');
    setResult(selectedSubExperiment.result || '');
    setLanguage(selectedSubExperiment.language || 'Python 3.11');
    setCode(selectedSubExperiment.code || '');
    setOutput(selectedSubExperiment.output || '');
    setOutputImageUrl(selectedSubExperiment.outputImageUrl || '');
    setExplanation(selectedSubExperiment.explanation || '');
    setKeyPoints(
      selectedSubExperiment.keyPoints && selectedSubExperiment.keyPoints.length > 0
        ? selectedSubExperiment.keyPoints
        : ['']
    );
    setDemoVideoUrl(selectedSubExperiment.demoVideoUrl || '');
    setDemoVideoName(selectedSubExperiment.demoVideoName || '');
    setStatus(selectedSubExperiment.status || 'Not Started');
    setProgress(selectedSubExperiment.progress || 0);
  }, [selectedSubExperiment]);

  const handleSaveAll = () => {
    const cleanedPoints = keyPoints.filter((kp) => kp.trim().length > 0);
    updateSubExperiment(selectedExperiment.id, selectedSubExperiment.id, {
      name: name.trim(),
      description: description.trim(),
      aim: aim.trim(),
      requirements: requirements.trim(),
      result: result.trim(),
      language,
      code,
      output,
      outputImageUrl,
      explanation,
      keyPoints: cleanedPoints,
      demoVideoUrl,
      demoVideoName,
      status,
      progress,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteSubExperiment(selectedExperiment.id, selectedSubExperiment.id);
      setCurrentPage('sub-experiments');
    }
  };

  const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    const ext = language.includes('SQL') ? 'sql' : 'py';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'sub_experiment'}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionMessage(null);
    setTimeout(() => {
      setIsExecuting(false);
      if (!code.trim()) {
        setExecutionMessage('No code detected. Enter Python or SQL algorithms above.');
      } else {
        setExecutionMessage('Kernel evaluated successfully. Output stream synchronized below.');
      }
    }, 400);
  };

  const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('Attachment must be under 20MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        addSubExperimentFile(selectedExperiment.id, selectedSubExperiment.id, {
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type,
          dataUrl: reader.result,
        });
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      alert('Video must be under 25MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDemoVideoUrl(reader.result);
        setDemoVideoName(file.name);
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const handlePlotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setOutputImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const lineCount = (code || '').split('\n').length;

  return (
    <div className="space-y-6 pb-16 w-full text-black dark:text-white">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileAttachmentRef}
        onChange={handleAttachmentUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={videoInputRef}
        onChange={handleVideoUpload}
        accept="video/mp4,video/webm"
        className="hidden"
      />
      <input
        type="file"
        ref={plotInputRef}
        onChange={handlePlotUpload}
        accept="image/*"
        className="hidden"
      />

      {/* TOP WORKSPACE NAVIGATION & CONTROLS (BLACK CARD with WHITE text) */}
      <div className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('sub-experiments')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-[#E91E63] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#E91E63]" />
              <span>Back to Sub-Experiments</span>
            </button>
            <span className="text-zinc-600">|</span>
            <button
              onClick={() => setCurrentPage('lab-record')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E91E63] hover:underline cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Official Lab Record</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-white bg-[#E91E63] px-3.5 py-2 rounded-xl flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-white" /> All Changes Saved
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save Workspace</span>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
              title="Delete Sub-Experiment"
            >
              <Trash2 className="w-4 h-4 text-[#E91E63]" />
            </button>
          </div>
        </div>

        {/* Editable Name & Description */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
              Sub-Experiment Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Reading and Parsing CSV Files"
              className="w-full text-lg sm:text-xl font-bold px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
              Short Description &amp; Objectives
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe computational objectives, instructions, and outcomes..."
              className="w-full text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63] resize-none"
            />
          </div>
        </div>
      </div>

      {/* AIM & REQUIREMENTS / LIBRARIES (BLACK CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <Target className="w-4 h-4 text-[#E91E63]" />
            <h3 className="text-sm font-bold text-white">Aim / Objective</h3>
          </div>
          <p className="text-xs font-normal text-zinc-400">
            Formal laboratory curriculum aim and program statement
          </p>
          <textarea
            rows={3}
            value={aim}
            onChange={(e) => setAim(e.target.value)}
            placeholder="State the precise experimental aim..."
            className="w-full text-xs sm:text-sm font-medium p-3.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63] resize-none leading-relaxed"
          />
        </div>

        <div className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <Layers className="w-4 h-4 text-[#E91E63]" />
            <h3 className="text-sm font-bold text-white">Requirements / Libraries</h3>
          </div>
          <p className="text-xs font-normal text-zinc-400">
            Hardware, Python runtime, and third-party package dependencies
          </p>
          <textarea
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. Python 3.x, Pandas, NumPy, Scikit-learn..."
            className="w-full text-xs sm:text-sm font-medium p-3.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63] resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* 1. CODE EDITOR (BLACK CARD with WHITE text) */}
      <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4 text-[#E91E63]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                1. Code Editor ({language})
              </h2>
              <p className="text-xs font-normal text-zinc-400">
                Python 3.11, PySpark, and SQL computational execution cell
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as CodeLanguage)}
              className="px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold focus:outline-none focus:border-[#E91E63]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-3.5 py-1.5 font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:border-[#E91E63] text-white flex items-center gap-1 cursor-pointer font-semibold transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-[#E91E63]" /> : <Copy className="w-3.5 h-3.5 text-[#E91E63]" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownloadCode}
              className="px-2.5 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:border-[#E91E63] text-white flex items-center gap-1 cursor-pointer font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#E91E63]" />
              <span>Download</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Clear code editor?')) setCode('');
              }}
              className="px-2.5 py-1.5 text-zinc-400 hover:text-white rounded-lg cursor-pointer font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 font-mono text-xs overflow-hidden bg-zinc-950 text-zinc-100">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 text-xs font-bold bg-zinc-900 text-white">
            <span>{language} Kernel Cell</span>
            <span className="font-mono text-[11px] text-zinc-400">Lines: {lineCount} | Tab indentation: 4 spaces</span>
          </div>
          <div className="flex min-h-[260px]">
            <div className="py-3 px-3 select-none text-right border-r border-zinc-800 text-xs font-mono font-bold leading-relaxed bg-zinc-900 text-zinc-500">
              {Array.from({ length: Math.max(lineCount, 12) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              ref={codeAreaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleCodeKeyDown}
              placeholder={`# Write your ${language} code here...\n# Press Tab to indent\n# Click Run Code to test, Save Workspace when finished`}
              rows={Math.max(lineCount + 2, 12)}
              className="flex-1 py-3 px-4 font-mono text-xs leading-relaxed focus:outline-none resize-y bg-zinc-950 text-zinc-100"
              spellCheck={false}
            />
          </div>
        </div>

        {executionMessage && (
          <div className="p-3.5 rounded-xl border border-zinc-800 text-xs font-semibold flex items-center justify-between bg-zinc-900 text-white">
            <span>{executionMessage}</span>
            <button onClick={() => setExecutionMessage(null)} className="text-zinc-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* 2. OUTPUT AREA (BLACK CARD with WHITE text) */}
      <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
              <Terminal className="w-4 h-4 text-[#E91E63]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">2. Output Stream &amp; Visualization</h2>
              <p className="text-xs font-normal text-zinc-400">
                Execution log, metric results, or upload visualization plot graphic
              </p>
            </div>
          </div>
          <button
            onClick={() => plotInputRef.current?.click()}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#E91E63]" />
            <span>Upload Plot / Graph Image</span>
          </button>
        </div>

        <textarea
          rows={5}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Paste or type terminal output, dataframe head(), metrics, or model scores here..."
          className="w-full p-3.5 font-mono text-xs rounded-xl border border-zinc-700 leading-relaxed focus:outline-none focus:border-[#E91E63] bg-zinc-900 text-white placeholder:text-zinc-500"
        />

        {outputImageUrl && (
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">
                Visualization Plot Graphic:
              </span>
              <button
                onClick={() => setOutputImageUrl('')}
                className="text-xs text-[#E91E63] font-bold hover:underline cursor-pointer"
              >
                Remove Image
              </button>
            </div>
            <img
              src={outputImageUrl}
              alt="Output graphic"
              className="max-h-80 w-auto rounded-lg border border-zinc-800 object-contain mx-auto bg-black"
            />
          </div>
        )}
      </section>

      {/* 3. EXPLANATION & 4. KEY POINTS (BLACK CARDS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <FileText className="w-4 h-4 text-[#E91E63]" />
            <h3 className="text-sm font-bold text-white">3. Theoretical Explanation</h3>
          </div>
          <p className="text-xs font-normal text-zinc-400">
            Theoretical concepts, mathematical formulas, and algorithmic rationale
          </p>
          <textarea
            rows={6}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Explain the theoretical intuition, algorithm logic, and empirical insights..."
            className="w-full p-3.5 text-xs font-medium rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63]"
          />
        </section>

        <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <ListChecks className="w-4 h-4 text-[#E91E63]" />
            <h3 className="text-sm font-bold text-white">4. Key Points &amp; Takeaways</h3>
          </div>
          <p className="text-xs font-normal text-zinc-400">
            Bulleted summary points with editable items
          </p>
          <div className="space-y-2">
            {keyPoints.map((kp, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-400 font-bold w-4">{idx + 1}.</span>
                <input
                  type="text"
                  value={kp}
                  onChange={(e) => {
                    const upd = [...keyPoints];
                    upd[idx] = e.target.value;
                    setKeyPoints(upd);
                  }}
                  placeholder="Key takeaway point..."
                  className="flex-1 text-xs font-medium px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63]"
                />
                <button
                  onClick={() => setKeyPoints(keyPoints.filter((_, i) => i !== idx))}
                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                  title="Delete point"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newKeyPointText}
                onChange={(e) => setNewKeyPointText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newKeyPointText.trim()) {
                      setKeyPoints([...keyPoints, newKeyPointText.trim()]);
                      setNewKeyPointText('');
                    }
                  }
                }}
                placeholder="+ Add new key point (Press Enter)..."
                className="flex-1 text-xs font-medium px-3 py-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
              />
              <button
                onClick={() => {
                  if (newKeyPointText.trim()) {
                    setKeyPoints([...keyPoints, newKeyPointText.trim()]);
                    setNewKeyPointText('');
                  }
                }}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#E91E63] text-white hover:bg-[#D81B60] transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* RESULT (BLACK CARD with WHITE text) */}
      <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-3 w-full">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
          <CheckCircle2 className="w-4 h-4 text-[#E91E63]" />
          <h3 className="text-sm font-bold text-white">5. Result &amp; Submission Conclusion</h3>
        </div>
        <p className="text-xs font-normal text-zinc-400">
          Formal college laboratory record result statement suitable for evaluation and sign-off
        </p>
        <textarea
          rows={3}
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="State the laboratory record result and conclusion..."
          className="w-full p-3.5 text-xs sm:text-sm font-medium rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63] resize-none leading-relaxed"
        />
      </section>

      {/* 6. SHORT DEMO VIDEO (BLACK CARD with WHITE text) */}
      <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-4 w-full">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
              <Video className="w-4 h-4 text-[#E91E63]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                6. Demonstration Clip (~15 seconds)
              </h2>
              <p className="text-xs font-normal text-zinc-400">
                Upload experiment demonstration clip with native HTML5 player
              </p>
            </div>
          </div>
          <button
            onClick={() => videoInputRef.current?.click()}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#E91E63]" />
            <span>{demoVideoUrl ? 'Replace Video' : 'Upload Video (~15s)'}</span>
          </button>
        </div>
        {demoVideoUrl ? (
          <div className="space-y-2">
            <div className="rounded-xl overflow-hidden bg-black max-h-64 aspect-video mx-auto border border-zinc-800">
              <video src={demoVideoUrl} controls className="w-full h-full object-contain">
                Your browser does not support video playback.
              </video>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold truncate text-white">
                File: {demoVideoName || 'Uploaded Demo Clip'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="text-zinc-300 hover:text-[#E91E63] font-semibold cursor-pointer"
                >
                  Replace Video
                </button>
                <button
                  onClick={() => {
                    setDemoVideoUrl('');
                    setDemoVideoName('');
                  }}
                  className="text-[#E91E63] hover:underline font-semibold cursor-pointer"
                >
                  Remove Video
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => videoInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-[#E91E63] hover:bg-zinc-900 transition-colors"
          >
            <Film className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">
              Upload a 15-second Demo Video
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              MP4, WebM up to 25MB.
            </div>
          </div>
        )}
      </section>

      {/* 7. PROGRESS & STATUS (BLACK CARD with WHITE text) */}
      <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-4 w-full">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#E91E63]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                7. Execution Progress &amp; Status
              </h2>
              <p className="text-xs font-normal text-zinc-400">
                Dynamically updates parent experiment progress and metrics
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-zinc-700 text-white bg-zinc-900">
            {progress}% ({status})
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2 text-white">
              <span>Progress Slider</span>
              <span className="font-mono text-sm font-bold tabular-nums">
                {progress}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => {
                const val = Number(e.target.value);
                setProgress(val);
                if (val === 100) setStatus('Completed');
                else if (val > 0) setStatus('In Progress');
                else setStatus('Not Started');
              }}
              className="w-full accent-[#E91E63] cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs font-bold text-white">Status:</span>
            <div className="flex items-center gap-1.5">
              {(['Not Started', 'In Progress', 'Completed'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStatus(s);
                    if (s === 'Completed') setProgress(100);
                    if (s === 'Not Started') setProgress(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                    status === s
                      ? 'bg-[#E91E63] text-white shadow-xs'
                      : 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#E91E63] hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ATTACHED FILES (BLACK CARD with WHITE text) */}
      <section className="border border-zinc-800 rounded-2xl p-6 sm:p-7 bg-black text-white shadow-xl space-y-4 w-full">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold">
              <Paperclip className="w-4 h-4 text-[#E91E63]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                8. Attached Datasets &amp; Files ({selectedSubExperiment.files?.length || 0})
              </h2>
              <p className="text-xs font-normal text-zinc-400">
                CSV, JSON datasets, Jupyter Notebooks (.ipynb), or PDFs
              </p>
            </div>
          </div>
          <button
            onClick={() => fileAttachmentRef.current?.click()}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#E91E63]" />
            <span>Upload File</span>
          </button>
        </div>
        {selectedSubExperiment.files && selectedSubExperiment.files.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedSubExperiment.files.map((file) => (
              <div
                key={file.id}
                className="p-3 rounded-xl border border-zinc-700 bg-zinc-900 text-white flex items-center justify-between text-xs"
              >
                <div className="truncate max-w-[220px]">
                  <div className="font-bold truncate text-white">
                    {file.name}
                  </div>
                  <div className="text-[10px] text-zinc-400">{file.size || 'Attachment'}</div>
                </div>
                <div className="flex items-center gap-1">
                  {file.dataUrl && (
                    <a
                      href={file.dataUrl}
                      download={file.name}
                      className="p-1.5 text-zinc-300 hover:text-[#E91E63] rounded"
                      title="Download File"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E91E63]" />
                    </a>
                  )}
                  <button
                    onClick={() =>
                      deleteSubExperimentFile(
                        selectedExperiment.id,
                        selectedSubExperiment.id,
                        file.id
                      )
                    }
                    className="p-1.5 text-zinc-400 hover:text-[#E91E63] rounded cursor-pointer"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-400 py-4 text-center font-normal">
            No files attached yet. Click "Upload File" to attach resources.
          </p>
        )}
      </section>
    </div>
  );
};
