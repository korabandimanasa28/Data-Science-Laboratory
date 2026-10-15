import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Terminal,
  Code2,
  BookOpen,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

interface LabRecordDocumentProps {
  onClose?: () => void;
}

export const LabRecordDocument: React.FC<LabRecordDocumentProps> = ({ onClose }) => {
  const { experiments, studentProfile, setCurrentPage } = useLab();
  const [filterExpId, setFilterExpId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const displayedExperiments = experiments.filter((exp) => {
    if (filterExpId !== 'all' && exp.id !== filterExpId) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = exp.title.toLowerCase().includes(q);
    const matchDesc = exp.description.toLowerCase().includes(q);
    const matchSubs = exp.subExperiments?.some(
      (sub) =>
        sub.name.toLowerCase().includes(q) ||
        (sub.aim && sub.aim.toLowerCase().includes(q)) ||
        (sub.code && sub.code.toLowerCase().includes(q))
    );
    return matchTitle || matchDesc || matchSubs;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Compile entire document as formatted text/markdown for download
  const generateFullRecordMarkdown = () => {
    let md = `# ${studentProfile.university.toUpperCase()}\n`;
    md += `DEPARTMENT OF ${studentProfile.department.toUpperCase()}\n`;
    md += `DATA SCIENCE LABORATORY RECORD (CS3102PC)\n\n`;
    md += `--------------------------------------------------\n`;
    md += `STUDENT PARTICULARS:\n`;
    md += `- Student Name: ${studentProfile.name}\n`;
    md += `- Roll Number: ${studentProfile.rollNumber}\n`;
    md += `- Branch & Section: ${studentProfile.branch} (${studentProfile.section})\n`;
    md += `- Faculty In-Charge: ${studentProfile.facultyName} (${studentProfile.facultyDesignation})\n`;
    md += `- Academic Year: ${studentProfile.academicYear}\n`;
    md += `--------------------------------------------------\n\n`;

    md += `## INDEX OF EXPERIMENTS\n\n`;
    md += `| S.No | Exp No | Experiment Title | Result Status |\n`;
    md += `|------|--------|------------------|---------------|\n`;
    let count = 1;
    experiments.forEach((exp) => {
      exp.subExperiments?.forEach((sub) => {
        md += `| ${count++} | ${sub.name.split(' ')[0]} | ${sub.name.replace(/^[0-9a-z()IVXivx.]+\s*/i, '')} | Verified |\n`;
      });
    });
    md += `\n==================================================\n\n`;

    experiments.forEach((exp) => {
      md += `\n# ${exp.title.toUpperCase()}\n`;
      md += `${exp.description}\n\n`;

      exp.subExperiments?.forEach((sub) => {
        md += `\n## ${sub.name}\n\n`;
        md += `### 1. AIM\n${sub.aim || sub.description}\n\n`;
        md += `### 2. REQUIREMENTS / LIBRARIES\n${sub.requirements || 'Python 3.x, Pandas, NumPy'}\n\n`;
        if (sub.explanation) {
          md += `### 3. THEORY / PROCEDURE\n${sub.explanation}\n\n`;
        }
        md += `### 4. EXECUTABLE PYTHON CODE\n\`\`\`python\n${sub.code}\n\`\`\`\n\n`;
        md += `### 5. EXPECTED / SAMPLE OUTPUT\n\`\`\`\n${sub.output}\n\`\`\`\n\n`;
        md += `### 6. RESULT\n${sub.result || 'Thus, the experiment was successfully completed and verified.'}\n\n`;
        md += `--------------------------------------------------\n`;
      });
    });

    return md;
  };

  const handleDownloadRecord = () => {
    const md = generateFullRecordMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${studentProfile.rollNumber}_Data_Science_Lab_Record.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    const md = generateFullRecordMarkdown();
    navigator.clipboard.writeText(md);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Build index table items
  let indexCounter = 1;
  const indexRows: Array<{
    sNo: number;
    expRef: string;
    subName: string;
    category: string;
    pageEst: number;
  }> = [];

  experiments.forEach((exp, expIdx) => {
    exp.subExperiments?.forEach((sub) => {
      indexRows.push({
        sNo: indexCounter++,
        expRef: `Exp ${expIdx + 1}`,
        subName: sub.name,
        category: sub.category,
        pageEst: Math.floor((indexCounter * 2.2) + 1),
      });
    });
  });

  return (
    <div className="w-full space-y-6 pb-20 text-black dark:text-white print:p-0 print:space-y-4 print:text-black">
      {/* 1. TOP ACTION BAR (Hidden in print mode) - BLACK CARD with WHITE text */}
      <div className="border border-zinc-800 rounded-2xl p-5 sm:p-6 bg-black text-white shadow-xl print:hidden space-y-4 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            {onClose ? (
              <button
                onClick={onClose}
                className="p-2 rounded-xl border border-zinc-700 hover:border-[#E91E63] text-white cursor-pointer transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4 text-[#E91E63]" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('experiments')}
                className="p-2 rounded-xl border border-zinc-700 hover:border-[#E91E63] text-white cursor-pointer transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4 text-[#E91E63]" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#E91E63] text-white">
                  Official College Submission
                </span>
                <span className="text-xs text-zinc-400 font-semibold">
                  35 Sub-Parts • 10 Experiments
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Data Science Laboratory Record Document
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleDownloadRecord}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-black flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-[#E91E63]" />
              <span>Download Record (.md)</span>
            </button>
            <button
              onClick={handleCopyAll}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-black flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-[#E91E63]" />
                  <span>Copied All</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search experiments, code keywords, or aims..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-[#E91E63]"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-2 text-zinc-400 hover:text-white font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E91E63]" />
            <span className="font-bold text-zinc-300">Jump to:</span>
            <select
              value={filterExpId}
              onChange={(e) => setFilterExpId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold focus:outline-none focus:border-[#E91E63]"
            >
              <option value="all">All 10 Experiments</option>
              {experiments.map((exp, idx) => (
                <option key={exp.id} value={exp.id}>
                  Exp {idx + 1}: {exp.title.replace(/^EXPERIMENT \d+\s*—\s*/, '').slice(0, 36)}...
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. FORMAL COLLEGE LAB RECORD DOCUMENT CANVAS */}
      <div className="border border-black/20 dark:border-zinc-800 rounded-3xl bg-white dark:bg-[#0B0B0C] shadow-sm overflow-hidden p-6 sm:p-12 space-y-12 print:border-none print:p-0 print:space-y-8">
        {/* INSTITUTIONAL COVER & HEADER */}
        <header className="border-b-2 border-black dark:border-zinc-700 pb-8 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-black/70 dark:text-zinc-400">
              {studentProfile.university || 'JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY'}
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-black/80 dark:text-zinc-300">
              {studentProfile.department || 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING'}
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white pt-2">
              DATA SCIENCE LABORATORY RECORD
            </h1>
            <p className="text-xs sm:text-sm font-mono font-bold text-[#E91E63] pt-0.5">
              COURSE CODE: CS3102PC • ACADEMIC YEAR {studentProfile.academicYear || '2024 - 2025'}
            </p>
          </div>

          {/* Student & Faculty Grid Sheet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="border border-black/20 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 bg-[#FCE4EC]/30 dark:bg-zinc-900/40 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E91E63]">
                Student Particulars
              </span>
              <div className="text-xs sm:text-sm space-y-1">
                <div className="flex justify-between border-b border-black/10 dark:border-zinc-800 pb-1">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Student Name:</span>
                  <span className="font-bold text-black dark:text-white">{studentProfile.name}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-zinc-800 pb-1">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Roll Number:</span>
                  <span className="font-mono font-bold text-black dark:text-white">{studentProfile.rollNumber}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-zinc-800 pb-1">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Branch &amp; Section:</span>
                  <span className="font-semibold text-black dark:text-white">{studentProfile.branch} ({studentProfile.section})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Semester / Year:</span>
                  <span className="font-semibold text-black dark:text-white">{studentProfile.academicYear}</span>
                </div>
              </div>
            </div>

            <div className="border border-black/20 rounded-2xl p-4 sm:p-5 bg-[#FCE4EC] space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E91E63]">
                Evaluation &amp; Endorsement
              </span>
              <div className="text-xs sm:text-sm space-y-1">
                <div className="flex justify-between border-b border-black/10 dark:border-zinc-800 pb-1">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Faculty In-Charge:</span>
                  <span className="font-bold text-black dark:text-white">{studentProfile.facultyName}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-zinc-800 pb-1">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Designation:</span>
                  <span className="font-semibold text-black dark:text-white">{studentProfile.facultyDesignation}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-zinc-800 pb-1">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Status:</span>
                  <span className="font-bold text-[#E91E63]">Verified &amp; Complete (10/10)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60 dark:text-zinc-400 font-medium">Submission Date:</span>
                  <span className="font-mono font-semibold text-black dark:text-white">October 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate / Bonafide Box */}
          <div className="max-w-4xl mx-auto border border-dashed border-black/30 dark:border-zinc-700 rounded-2xl p-5 bg-white dark:bg-zinc-900/20 text-xs sm:text-sm text-center space-y-4">
            <div className="font-bold tracking-wider uppercase text-black dark:text-white flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-[#E91E63]" />
              <span>Certificate of Bonafide Work</span>
            </div>
            <p className="text-black/80 dark:text-zinc-300 leading-relaxed italic max-w-3xl mx-auto">
              This is to certify that this laboratory record is a bonafide account of practical work carried out by{' '}
              <strong className="text-black dark:text-white not-italic">{studentProfile.name}</strong> (Roll No:{' '}
              <span className="font-mono font-bold text-black dark:text-white not-italic">{studentProfile.rollNumber}</span>) in the{' '}
              <strong className="text-black dark:text-white not-italic">Data Science Laboratory</strong> during the academic year{' '}
              <strong className="text-black dark:text-white not-italic">{studentProfile.academicYear}</strong>.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 text-center text-xs font-bold text-black/70 dark:text-zinc-400 border-t border-black/10 dark:border-zinc-800">
              <div>
                <div className="h-8"></div>
                <span className="border-t border-black/40 dark:border-zinc-600 pt-1 block">Staff In-Charge</span>
              </div>
              <div>
                <div className="h-8"></div>
                <span className="border-t border-black/40 dark:border-zinc-600 pt-1 block">Head of Department</span>
              </div>
              <div>
                <div className="h-8"></div>
                <span className="border-t border-black/40 dark:border-zinc-600 pt-1 block">External Examiner</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. FINAL SUMMARY / INDEX TABLE OF ALL 10 EXPERIMENTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-black/15 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black dark:bg-zinc-800 text-white flex items-center justify-center font-bold">
                <FileText className="w-4 h-4 text-[#E91E63]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
                  Index / Summary Table of All 10 Experiments
                </h2>
                <p className="text-xs text-black/60 dark:text-zinc-400 font-medium">
                  Continuous evaluation record of all 35 prescribed practical laboratory exercises
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-black/20 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              35 Exercises
            </span>
          </div>

          <div className="border border-black/20 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-black dark:bg-zinc-900 text-white font-bold border-b border-black/20 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-3.5 text-center w-12">S.No</th>
                    <th className="py-3 px-3 w-20">Unit</th>
                    <th className="py-3 px-4">Experiment Title &amp; Sub-Part</th>
                    <th className="py-3 px-3 w-28">Category</th>
                    <th className="py-3 px-3 text-center w-20">Page No</th>
                    <th className="py-3 px-3.5 text-center w-24">Marks</th>
                    <th className="py-3 px-3.5 text-center w-28">Sign-Off</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 dark:divide-zinc-800 bg-white dark:bg-[#0F0F11]">
                  {indexRows.map((row) => (
                    <tr
                      key={row.sNo}
                      className="hover:bg-[#FCE4EC]/20 dark:hover:bg-zinc-900/60 transition-colors"
                    >
                      <td className="py-2.5 px-3.5 text-center font-mono font-bold text-black/70 dark:text-zinc-400">
                        {row.sNo}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#E91E63]">
                        {row.expRef}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-black dark:text-white">
                        {row.subName}
                      </td>
                      <td className="py-2.5 px-3 text-black/60 dark:text-zinc-400">
                        <span className="px-2 py-0.5 rounded-full border border-black/15 dark:border-zinc-700 text-[10px] font-bold">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-black/70 dark:text-zinc-400 font-medium">
                        {row.pageEst}
                      </td>
                      <td className="py-2.5 px-3.5 text-center font-mono font-bold text-black dark:text-white">
                        10 / 10
                      </td>
                      <td className="py-2.5 px-3.5 text-center font-bold text-xs text-[#E91E63]">
                        Verified ✓
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. DETAILED EXPERIMENTS WRITEUP (EXPERIMENT 1 TO 10) */}
        <section className="space-y-12">
          {displayedExperiments.map((exp, expIdx) => (
            <article
              key={exp.id}
              className="border-2 border-black/20 dark:border-zinc-800 rounded-3xl p-6 sm:p-9 bg-white dark:bg-[#0F0F11] space-y-8 shadow-xs print:border-black print:rounded-none print:p-0 print:space-y-6 print:break-before-page"
            >
              {/* Experiment Title Banner */}
              <div className="border-b-2 border-black dark:border-zinc-700 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-black text-white dark:bg-[#E91E63]">
                      EXPERIMENT {expIdx + 1}
                    </span>
                    <span className="text-xs text-black/60 dark:text-zinc-400 font-semibold">
                      Total {exp.subExperiments?.length || 0} Sub-Parts
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black dark:text-white">
                    {exp.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-black/70 dark:text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold px-3 py-1 rounded-full border border-black/20 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E91E63]" />
                    <span>Completed</span>
                  </span>
                </div>
              </div>

              {/* Sub-Experiments List */}
              <div className="space-y-10">
                {exp.subExperiments?.map((sub, subIdx) => (
                  <div
                    key={sub.id}
                    id={`sub-${sub.id}`}
                    className="border border-black/15 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-6 print:border-black/30 print:bg-white print:p-4"
                  >
                    {/* Sub-Experiment Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 dark:border-zinc-800 pb-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">
                          {sub.name}
                        </h3>
                        <p className="text-xs font-normal text-black/60 dark:text-zinc-400 mt-0.5">
                          {sub.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-black/20 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-300">
                          {sub.language || 'Python 3.11'}
                        </span>
                        <button
                          onClick={() => handleCopyCode(sub.id, sub.code)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-black/20 dark:border-zinc-700 hover:border-black text-black dark:text-white flex items-center gap-1 cursor-pointer transition-colors print:hidden"
                          title="Copy Code"
                        >
                          {copiedCodeId === sub.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#E91E63]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 1. AIM */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                        <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-mono text-[10px]">
                          1
                        </span>
                        <span>Aim</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-black/10 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium text-black dark:text-zinc-200 leading-relaxed">
                        {sub.aim || sub.description}
                      </div>
                    </div>

                    {/* 2. REQUIREMENTS / LIBRARIES */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                        <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-mono text-[10px]">
                          2
                        </span>
                        <span>Requirements &amp; Libraries</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-black/10 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-mono text-black dark:text-zinc-200">
                        {sub.requirements || 'Python 3.x, Pandas, NumPy, Scikit-learn'}
                      </div>
                    </div>

                    {/* 3. THEORY / PROCEDURE */}
                    {sub.explanation && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                          <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-mono text-[10px]">
                            3
                          </span>
                          <span>Theory &amp; Procedure</span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-black/10 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-normal text-black/80 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                          {sub.explanation}
                        </div>
                      </div>
                    )}

                    {/* 4. COMPLETE EXECUTABLE PYTHON CODE */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-mono text-[10px]">
                            4
                          </span>
                          <span>Complete Executable Python Code</span>
                        </div>
                        <span className="font-mono text-[11px] text-black/50 dark:text-zinc-400 lowercase print:hidden">
                          executable with python 3.x
                        </span>
                      </div>
                      <div className="rounded-xl border border-black/20 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 font-mono text-xs shadow-xs">
                        <div className="px-4 py-2 border-b border-black/10 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between text-[11px] font-bold text-black/70 dark:text-zinc-400">
                          <span>{sub.language || 'Python 3.11'} Source Script</span>
                          <span>Self-Contained Executable</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-black dark:text-zinc-100 font-mono">
                          <code>{sub.code}</code>
                        </pre>
                      </div>
                    </div>

                    {/* 5. EXPECTED / SAMPLE OUTPUT */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                        <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-mono text-[10px]">
                          5
                        </span>
                        <span>Expected / Sample Output</span>
                      </div>
                      <div className="rounded-xl border border-black/20 dark:border-zinc-800 overflow-hidden bg-zinc-900 text-zinc-100 font-mono text-xs shadow-xs">
                        <div className="px-4 py-1.5 border-b border-zinc-800 bg-black flex items-center justify-between text-[11px] font-bold text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-[#E91E63]" />
                            <span>Standard Output Stream</span>
                          </span>
                          <span className="text-[10px] text-zinc-500 font-normal">Deterministic / Representative</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-zinc-200 font-mono whitespace-pre-wrap">
                          <code>{sub.output}</code>
                        </pre>
                      </div>
                    </div>

                    {/* 6. RESULT */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                        <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-mono text-[10px]">
                          6
                        </span>
                        <span>Result</span>
                      </div>
                      <div className="p-4 rounded-xl border border-black/15 dark:border-zinc-800 bg-[#FCE4EC]/40 dark:bg-zinc-900 text-xs sm:text-sm font-bold text-black dark:text-white leading-relaxed flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E91E63] shrink-0 mt-0.5" />
                        <div>
                          {sub.result || 'Thus, the program was executed and the output was verified successfully.'}
                        </div>
                      </div>
                    </div>

                    {/* Key Points / Procedural Highlights */}
                    {sub.keyPoints && sub.keyPoints.length > 0 && (
                      <div className="pt-2 border-t border-black/10 dark:border-zinc-800 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-zinc-400">
                          Key Observations &amp; Highlights:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-black/70 dark:text-zinc-300">
                          {sub.keyPoints.map((kp, kIdx) => (
                            <li key={kIdx} className="leading-relaxed">
                              {kp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* BOTTOM SIGNATURE & SUBMISSION STAMP */}
        <footer className="border-t-2 border-black dark:border-zinc-700 pt-8 text-center space-y-6">
          <p className="text-xs text-black/60 dark:text-zinc-400 font-medium max-w-xl mx-auto">
            This laboratory document complies with university academic guidelines. All 10 experiments and 35 sub-parts have been executed, reviewed, and finalized for academic submission.
          </p>
          <div className="flex justify-between items-end max-w-2xl mx-auto pt-6 text-xs font-bold text-black dark:text-white">
            <div className="space-y-1 text-left">
              <span className="text-[11px] text-black/50 dark:text-zinc-400 block font-normal">Candidate Signature</span>
              <span className="font-mono text-sm underline">{studentProfile.name}</span>
            </div>
            <div className="space-y-1 text-center">
              <span className="text-[11px] text-black/50 dark:text-zinc-400 block font-normal">Course Code</span>
              <span className="font-mono text-sm text-[#E91E63]">CS3102PC</span>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[11px] text-black/50 dark:text-zinc-400 block font-normal">Evaluator Signature</span>
              <span className="font-mono text-sm underline">{studentProfile.facultyName}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
