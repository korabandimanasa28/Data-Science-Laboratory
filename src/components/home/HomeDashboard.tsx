import React from 'react';
import {
  User,
  FlaskConical,
  Wrench,
  BookOpen,
  FolderGit2,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const HomeDashboard: React.FC = () => {
  const { setCurrentPage, studentProfile } = useLab();

  return (
    <div className="space-y-6 pb-12 w-full text-black">
      {/* 1. Header with title "Home" & Quick Nav Shortcuts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            Home
          </h1>
          <p className="text-xs sm:text-sm font-medium text-black/60 mt-0.5">
            Data Science Laboratory Portal
          </p>
        </div>

        {/* Quick Nav shortcut pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentPage('profile')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <User className="w-4 h-4 text-[#E91E63]" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setCurrentPage('experiments')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <FlaskConical className="w-4 h-4 text-[#E91E63]" />
            <span>Experiments</span>
          </button>
          <button
            onClick={() => setCurrentPage('tools')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <Wrench className="w-4 h-4 text-[#E91E63]" />
            <span>Tools</span>
          </button>
          <button
            onClick={() => setCurrentPage('modules')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <BookOpen className="w-4 h-4 text-[#E91E63]" />
            <span>Modules</span>
          </button>
          <button
            onClick={() => setCurrentPage('projects')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <FolderGit2 className="w-4 h-4 text-[#E91E63]" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setCurrentPage('resume')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <FileText className="w-4 h-4 text-[#E91E63]" />
            <span>Resume</span>
          </button>
          <button
            onClick={() => setCurrentPage('lab-record')}
            className="px-3.5 py-2 rounded-xl border border-black/15 text-xs sm:text-sm font-semibold text-black hover:border-[#E91E63] hover:text-[#E91E63] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <FileText className="w-4 h-4 text-[#E91E63]" />
            <span>Lab Record</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN "DATA SCIENCE LABORATORY" SECTION (Main content card: BLACK with WHITE text) */}
      <section className="border border-zinc-800 rounded-3xl bg-black text-white shadow-xl p-6 sm:p-8 md:p-9 w-full">
        {/* Two-Column Layout:
            LEFT SIDE -> Data Science Laboratory Content
            RIGHT SIDE -> compact Student Profile Card
            Vertically aligned and responsive (stacks on mobile).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT SIDE: Data Science Laboratory content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#E91E63]/30 text-xs font-bold text-black">
                <Sparkles className="w-3.5 h-3.5 text-[#E91E63]" />
                <span>Department of Computer Science &amp; Engineering • CS3102PC</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  Data Science Laboratory
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#E91E63] mt-1 tracking-wider uppercase">
                  Academic Research &amp; Practical Computational Portal
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-2xl">
                Comprehensive practical curriculum designed for advanced data science studies. Includes 10 rigorous laboratory experiments covering data formats, API and database ingestion, statistical cleaning, hierarchical indexing, exploratory visualizations, web review NLP analytics, K-Means customer segmentation, and emotion classification.
              </p>

              {/* Curriculum Overview Cards (Supporting areas in Black card with White text) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Syllabus Scope
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    10 Experiments
                  </span>
                  <span className="block text-[11px] text-zinc-400">
                    35 Sub-Exercises
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Tech Stack
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    Python 3.11 / Pandas
                  </span>
                  <span className="block text-[11px] text-zinc-400">
                    NumPy, Seaborn, NLTK
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Evaluation
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    Official Record
                  </span>
                  <span className="block text-[11px] text-[#E91E63] font-semibold">
                    Continuous Marks
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons: Primary PINK, Secondary WHITE with PINK border */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('experiments')}
                className="px-5 py-2.5 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <FlaskConical className="w-4 h-4 text-white" />
                <span>Explore Experiments</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('lab-record')}
                className="px-4 py-2.5 rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-black text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText className="w-4 h-4 text-[#E91E63]" />
                <span>Official Lab Record</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Compact Student Profile Card (BLACK background, WHITE text, PINK accents) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 text-center shadow-lg flex flex-col items-center justify-between space-y-4 h-full text-white">
              {/* Header */}
              <div className="w-full pb-3 border-b border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  Student Profile
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black border border-zinc-800 text-[#E91E63]">
                  Candidate Record
                </span>
              </div>

              {/* Circular Profile Photo (Perfect Circle: border-radius: 50%, object-fit: cover) */}
              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#E91E63] bg-zinc-900 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shrink-0"
                  onClick={() => setCurrentPage('profile')}
                  title="Click to view and edit student profile"
                >
                  {studentProfile.avatarUrl ? (
                    <img
                      src={studentProfile.avatarUrl}
                      alt={studentProfile.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-12 h-12 text-[#E91E63]" />
                  )}
                </div>
              </div>

              {/* Student Profile Information in EXACT requested order:
                  1. Student Name
                  2. Roll Number
                  3. Branch
                  4. Faculty Name
                  5. Faculty Designation
                  White text inside black cards, consistent professional typography.
              */}
              <div className="w-full space-y-2 text-left pt-1">
                <div className="p-2.5 rounded-xl bg-black border border-zinc-800">
                  <span className="block text-[11px] font-medium text-zinc-400">
                    Student Name
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    {studentProfile.name || 'K. Mansa'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black border border-zinc-800">
                  <span className="block text-[11px] font-medium text-zinc-400">
                    Roll Number
                  </span>
                  <span className="block text-sm font-bold font-mono text-white mt-0.5">
                    {studentProfile.rollNumber || '21B91A05A1'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black border border-zinc-800">
                  <span className="block text-[11px] font-medium text-zinc-400">
                    Branch
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    {studentProfile.branch || 'Computer Science & Engineering'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black border border-zinc-800">
                  <span className="block text-[11px] font-medium text-zinc-400">
                    Faculty Name
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    {studentProfile.facultyName || 'Dr. R. V. Raman'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black border border-zinc-800">
                  <span className="block text-[11px] font-medium text-zinc-400">
                    Faculty Designation
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    {studentProfile.facultyDesignation || 'Professor & Head of Department'}
                  </span>
                </div>
              </div>

              {/* View/Edit Profile Link: Secondary button: White with Black text and Pink border */}
              <div className="w-full pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage('profile')}
                  className="w-full py-2 px-3 rounded-xl border border-[#E91E63] bg-white hover:bg-[#FCE4EC] text-xs font-bold text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Open Student Profile Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E91E63]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE MAIN HOME BOXES UNDER DATA SCIENCE LABORATORY
             1. EXPERIMENTS
             2. TOOLS
             3. MODULES
             Equal size, balanced spacing, one row on desktop, stacked on mobile.
             BLACK CARDS with WHITE TEXT inside, PINK buttons.
      */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black/70">
            Laboratory Core Portals
          </h3>
          <span className="text-xs font-mono text-black/50 font-semibold">
            3 Core Portals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {/* BOX 1: EXPERIMENTS */}
          <div className="rounded-2xl border border-zinc-800 bg-black text-white shadow-lg hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group">
            <div>
              {/* Image: Data science experiments / analysis / charts */}
              <div className="w-full h-44 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                  alt="Data Science Experiments"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs border border-zinc-800">
                    <FlaskConical className="w-3.5 h-3.5 text-[#E91E63]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Curriculum Section 01
                  </span>
                </div>

                <h4 className="text-lg font-bold tracking-tight text-white uppercase">
                  Experiments
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  10 prescribed laboratory exercises with executable Python code, sub-tasks, datasets, and output streams.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => setCurrentPage('experiments')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Open</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* BOX 2: TOOLS */}
          <div className="rounded-2xl border border-zinc-800 bg-black text-white shadow-lg hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group">
            <div>
              {/* Image: Data science tools / programming tools / analytics */}
              <div className="w-full h-44 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
                  alt="Data Science Tools"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs border border-zinc-800">
                    <Wrench className="w-3.5 h-3.5 text-[#E91E63]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Curriculum Section 02
                  </span>
                </div>

                <h4 className="text-lg font-bold tracking-tight text-white uppercase">
                  Tools
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  Computational tools, Jupyter Notebooks, Google Colab, PySpark, Pandas, and Scikit-learn integrations.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => setCurrentPage('tools')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Open</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* BOX 3: MODULES */}
          <div className="rounded-2xl border border-zinc-800 bg-black text-white shadow-lg hover:border-[#E91E63] transition-all flex flex-col justify-between overflow-hidden group">
            <div>
              {/* Image: Learning / education / online modules */}
              <div className="w-full h-44 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                  alt="Learning Modules"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs border border-zinc-800">
                    <BookOpen className="w-3.5 h-3.5 text-[#E91E63]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Curriculum Section 03
                  </span>
                </div>

                <h4 className="text-lg font-bold tracking-tight text-white uppercase">
                  Modules
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  5 comprehensive curriculum modules, official lecture notes, textbook readings, and instructional syllabus.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => setCurrentPage('modules')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Open</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
