import React, { useRef, useState } from 'react';
import {
  User,
  Edit2,
  Camera,
  Save,
  X,
  Check,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const ProfilePage: React.FC = () => {
  const {
    studentProfile,
    updateStudentProfile,
    setStudentAvatar,
    removeStudentAvatar,
  } = useLab();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(studentProfile);
  const [savedToast, setSavedToast] = useState(false);
  const avatarFileRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Avatar must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setStudentAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile(form);
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleCancel = () => {
    setForm(studentProfile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-16 w-full text-black">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={avatarFileRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Header & Edit Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            Student Profile
          </h1>
          <p className="text-xs sm:text-sm font-medium text-black/60 mt-0.5">
            Official University Academic Record &amp; Faculty Mentorship
          </p>
        </div>
        <div className="flex items-center gap-2">
          {savedToast && (
            <span className="text-xs font-bold text-white bg-[#E91E63] px-3.5 py-2 rounded-xl flex items-center gap-1.5 animate-in fade-in shadow-xs">
              <Check className="w-4 h-4 text-white" />
              <span>Saved</span>
            </span>
          )}
          <button
            onClick={() => {
              if (isEditing) handleCancel();
              else {
                setForm(studentProfile);
                setIsEditing(true);
              }
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4 text-white" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 text-white" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full-Width Grid Content (Avatar Card on Left, Details on Right) - BOTH BLACK CARDS with WHITE TEXT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Avatar & Quick Summary (BLACK CARD) */}
        <div className="rounded-2xl p-6 sm:p-7 border border-zinc-800 bg-black text-white shadow-xl flex flex-col items-center text-center justify-between">
          <div className="w-full flex flex-col items-center">
            {/* Circular Profile Image (Perfect Circle: border-radius: 50%, object-fit: cover) */}
            <div className="relative group mb-3">
              <div
                onClick={() => avatarFileRef.current?.click()}
                className="w-36 h-36 rounded-full overflow-hidden border-3 border-[#E91E63] bg-zinc-900 flex flex-col items-center justify-center shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                style={{ borderRadius: '50%' }}
                title={studentProfile.avatarUrl ? 'Click to change or replace photo' : 'Click to add profile photo'}
              >
                {studentProfile.avatarUrl ? (
                  <img
                    src={studentProfile.avatarUrl}
                    alt={studentProfile.name}
                    className="w-full h-full"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <User className="w-12 h-12 text-[#E91E63] mb-1" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                      Add Profile Photo
                    </span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => avatarFileRef.current?.click()}
                className="absolute bottom-1 right-1 p-2.5 rounded-full bg-[#E91E63] text-white hover:bg-[#D81B60] transition-colors cursor-pointer shadow-md"
                title={studentProfile.avatarUrl ? 'Replace profile image' : 'Upload profile image'}
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {!studentProfile.avatarUrl && (
              <span className="text-xs font-bold text-zinc-300 mt-1 mb-2">
                Add Profile Photo
              </span>
            )}

            <h3 className="text-xl font-bold text-white mt-1">
              {studentProfile.name}
            </h3>
            <div className="text-xs font-mono font-bold text-[#E91E63] mt-0.5">
              {studentProfile.rollNumber}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {studentProfile.department}
            </div>

            {/* Profile image action controls: Upload, Change, Replace, Remove */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {!studentProfile.avatarUrl ? (
                <button
                  type="button"
                  onClick={() => avatarFileRef.current?.click()}
                  className="text-xs px-4 py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                  <span>Upload Profile Image</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => avatarFileRef.current?.click()}
                    className="text-xs px-3 py-1.5 rounded-xl border border-[#E91E63] text-black bg-white hover:bg-[#FCE4EC] font-bold transition-colors cursor-pointer"
                    title="Change / Replace Profile Image"
                  >
                    Change Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => avatarFileRef.current?.click()}
                    className="text-xs px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold hover:border-[#E91E63] hover:text-[#E91E63] transition-colors cursor-pointer"
                    title="Replace Profile Image"
                  >
                    Replace Photo
                  </button>
                  <button
                    type="button"
                    onClick={removeStudentAvatar}
                    className="text-xs px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 font-semibold hover:bg-[#E91E63] hover:text-white transition-colors cursor-pointer"
                    title="Remove Profile Image"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-full pt-6 mt-6 border-t border-zinc-800 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">Status</span>
              <span className="font-bold text-[#E91E63]">Active Student</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Academic Year</span>
              <span className="font-bold text-white">{studentProfile.academicYear}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full Information Form or Display Table (BLACK CARD with WHITE TEXT) */}
        <div className="lg:col-span-2 rounded-2xl p-6 sm:p-8 border border-zinc-800 bg-black text-white shadow-xl">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    value={form.rollNumber}
                    onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-mono font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Faculty Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.facultyName}
                    onChange={(e) => setForm({ ...form, facultyName: e.target.value })}
                    placeholder="e.g. Dr. R. V. Raman"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Faculty Designation
                  </label>
                  <input
                    type="text"
                    value={form.facultyDesignation || ''}
                    onChange={(e) => setForm({ ...form, facultyDesignation: e.target.value })}
                    placeholder="e.g. Professor & Head of Department"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Section
                  </label>
                  <input
                    type="text"
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    Department
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                    University
                  </label>
                  <input
                    type="text"
                    value={form.university}
                    onChange={(e) => setForm({ ...form, university: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold focus:outline-none focus:border-[#E91E63]"
                />
              </div>
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2.5 px-4 rounded-xl border border-[#E91E63] bg-white text-black hover:bg-[#FCE4EC] text-sm font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="divide-y divide-zinc-800">
              {/* Four primary fields: SAME font style, SAME color treatment */}
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Student Name</span>
                <span className="font-bold text-white">{studentProfile.name}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Roll Number</span>
                <span className="font-bold font-mono text-white">{studentProfile.rollNumber}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Faculty Name</span>
                <span className="font-bold text-white">{studentProfile.facultyName || 'Dr. R. V. Raman'}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Faculty Designation</span>
                <span className="font-bold text-white">{studentProfile.facultyDesignation || 'Professor & Head of Department'}</span>
              </div>
              {/* Secondary fields */}
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Branch</span>
                <span className="font-bold text-white">{studentProfile.branch}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Section</span>
                <span className="font-bold text-white">{studentProfile.section}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Department</span>
                <span className="font-bold text-white">{studentProfile.department}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">University</span>
                <span className="font-bold text-white text-right truncate max-w-xs">{studentProfile.university}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-zinc-400">Email</span>
                <span className="font-bold text-white">{studentProfile.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
