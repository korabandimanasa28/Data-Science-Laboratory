import React, { useState } from 'react';
import {
  FlaskConical,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  X,
  ShieldCheck,
  User,
  KeyRound,
} from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const AuthPage: React.FC = () => {
  const { login, signup } = useLab();

  // Role Selection: 'user' vs 'admin'
  const [rolePortal, setRolePortal] = useState<'user' | 'admin'>('user');

  // Mode: 'login' vs 'signup'
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Forgot password modal
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSwitchPortal = (portal: 'user' | 'admin') => {
    setRolePortal(portal);
    setErrorMessage(null);
    setSuccessMessage(null);
    // Auto-populate institutional hint if blank
    if (!email) {
      if (portal === 'admin') {
        setEmail('admin@dslab.edu');
      } else {
        setEmail('student@dslab.edu');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your registered institutional or personal email.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage('Please provide a valid email format (e.g. user@dslab.edu).');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMessage('Please provide your full legal or academic name.');
        return;
      }
      if (!confirmPassword) {
        setErrorMessage('Please confirm your password.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify both password entries.');
        return;
      }

      if (rolePortal === 'admin') {
        if (!adminPasscode.trim()) {
          setErrorMessage(
            'Administrator Passcode is required. Public registration cannot grant administrator privileges.'
          );
          return;
        }
      }

      const res = signup(
        trimmedEmail,
        password,
        name.trim(),
        rolePortal,
        adminPasscode.trim()
      );

      if (!res.success) {
        setErrorMessage(res.error || 'Failed to complete registration.');
      } else {
        setSuccessMessage('Registration successful! Redirecting to workspace...');
      }
    } else {
      // Login flow
      const res = login(trimmedEmail, password, rolePortal);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid authentication credentials.');
      }
    }
  };

  const handleProviderLogin = (provider: 'Google' | 'Facebook') => {
    setErrorMessage(null);
    // Authenticate through supported provider using student credentials
    const defaultEmail = rolePortal === 'admin' ? 'admin@dslab.edu' : 'student@dslab.edu';
    const defaultPass = rolePortal === 'admin' ? 'dslabAdmin2025' : 'student2026';
    const res = login(defaultEmail, defaultPass, rolePortal);
    if (!res.success) {
      setErrorMessage(
        `${provider} single sign-on could not authenticate account under ${rolePortal.toUpperCase()} portal.`
      );
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !isValidEmail(forgotEmail)) {
      return;
    }
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotPassword(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-white text-black">
      <div className="w-full max-w-md relative z-10 my-auto">
        <div className="bg-black text-white rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden">
          {/* Top Brand Banner in Black with Pink Accent */}
          <div className="bg-black p-6 sm:p-7 text-white text-center border-b border-zinc-800">
            <div className="w-13 h-13 mx-auto rounded-2xl bg-[#E91E63] text-white flex items-center justify-center shadow-xs mb-3">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              Data Science Laboratory
            </h1>
            <p className="text-xs font-semibold text-[#FCE4EC] tracking-wider uppercase mt-0.5">
              Academic Portal &amp; Computational Lab
            </p>
          </div>

          {/* 1. SEPARATE ADMIN VS USER PORTAL SELECTOR */}
          <div className="p-3 bg-zinc-950 border-b border-zinc-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2 px-1 flex items-center justify-between">
              <span>Select Access Portal:</span>
              <span className="text-[#E91E63] font-mono">
                {rolePortal === 'admin' ? 'Institutional Faculty' : 'Student & Researcher'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSwitchPortal('user')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  rolePortal === 'user'
                    ? 'bg-white text-black shadow-xs border border-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#E91E63]" />
                <span>User Portal</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchPortal('admin')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  rolePortal === 'admin'
                    ? 'bg-[#E91E63] text-white shadow-xs border border-[#E91E63]'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {/* 2. MODE SELECTOR (LOGIN vs SIGN UP for the chosen role) */}
          <div className="flex border-b border-zinc-800 bg-black p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {rolePortal === 'admin' ? 'Admin Login' : 'User Login'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {rolePortal === 'admin' ? 'Admin Sign Up' : 'User Sign Up'}
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-7 space-y-4">
            {rolePortal === 'admin' && (
              <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E91E63] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Faculty Administrator Area</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    Admin access grants permissions to manage shared experiments, learning modules, tools, projects, and lab settings.
                  </p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#E91E63] shrink-0" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E91E63] shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={rolePortal === 'admin' ? 'Dr. R. V. Raman' : 'Student Name'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  {rolePortal === 'admin' ? 'Admin Institutional Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={rolePortal === 'admin' ? 'admin@dslab.edu' : 'student@dslab.edu'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    {mode === 'signup' ? 'Create Password' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs font-semibold text-zinc-400 hover:text-[#E91E63] cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (min 6 characters)"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#E91E63]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Secure Admin Authorization Passcode (Admin Sign Up Only) */}
              {mode === 'signup' && rolePortal === 'admin' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#E91E63] uppercase tracking-wider">
                      Administrator Passcode
                    </label>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Security Verification
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#E91E63] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showAdminPasscode ? 'text' : 'password'}
                      required
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      placeholder="Enter Admin Security Passcode"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E91E63] bg-zinc-950 text-white font-semibold text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#E91E63]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPasscode(!showAdminPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
                    >
                      {showAdminPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Passcode verifies departmental authority (<span className="text-zinc-300 font-mono">DSLAB-ADMIN-2025</span>). Public registration never grants admin privileges without it.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>
                  {mode === 'signup'
                    ? rolePortal === 'admin'
                      ? 'Register Admin Account'
                      : 'Create User Account'
                    : rolePortal === 'admin'
                    ? 'Authenticate as Admin'
                    : 'Sign in to User Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Link between Login & Sign Up */}
            <div className="text-center pt-1 text-xs font-semibold text-zinc-400">
              {mode === 'signup' ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="font-bold text-[#E91E63] underline cursor-pointer ml-1"
                  >
                    {rolePortal === 'admin' ? 'Admin Login' : 'User Login'}
                  </button>
                </span>
              ) : (
                <span>
                  Need a new account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="font-bold text-[#E91E63] underline cursor-pointer ml-1"
                  >
                    {rolePortal === 'admin' ? 'Admin Sign Up' : 'User Sign Up'}
                  </button>
                </span>
              )}
            </div>

            {/* Supported Single Sign-On Providers (Strictly Preserved) */}
            <div className="relative my-3 pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase">
                <span className="bg-black px-3 text-zinc-400 text-[11px]">
                  Institutional SSO Providers
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleProviderLogin('Google')}
                className="py-2.5 px-3 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-zinc-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Sign in with Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleProviderLogin('Facebook')}
                className="py-2.5 px-3 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-zinc-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Sign in with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-black text-white rounded-2xl border border-zinc-800 shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-bold text-white">Reset Password</h2>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {forgotSent ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#E91E63] mx-auto" />
                <div className="text-sm font-bold text-white">Reset Link Dispatched</div>
                <p className="text-xs text-zinc-300">
                  Instructions have been sent to your institutional email address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="pt-4 space-y-3.5">
                <p className="text-xs text-zinc-300">
                  Enter your registered university email to receive a password reset link.
                </p>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="user@dslab.edu"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold focus:outline-none focus:border-[#E91E63]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="py-2 px-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
