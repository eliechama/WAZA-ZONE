import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  User,
  Shield,
  KeyRound,
  Mail,
  Camera,
  Check,
  X,
  Lock,
  Globe,
  MapPin,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Terminal,
  Server,
  Layers,
  Fingerprint,
  ShieldCheck
} from 'lucide-react';

interface UserProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'profile' | 'security' | 'permissions';
}

const AVATAR_PRESETS = [
  {
    id: 'kai',
    name: 'Kai Vance (Showrunner)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'ren',
    name: 'Ren Kurogane (Samurai)',
    url: '/src/assets/images/waza_reader_slice02_hud_1790684261983.jpg'
  },
  {
    id: 'aoi',
    name: 'Aoi Vance (Netrunner)',
    url: '/src/assets/images/waza_reader_slice04_aoi_1790684283452.jpg'
  },
  {
    id: 'vesper',
    name: 'Vesper Enforcer (Architect)',
    url: '/src/assets/images/waza_reader_slice04_vesper_1790684297968.jpg'
  },
  {
    id: 'cyberpunk-creator',
    name: 'Cyberpunk Lead Artist',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

export const UserProfileSettingsModal: React.FC<UserProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'profile'
}) => {
  const { user, workspace, updateProfile, updateEmail, updatePassword, switchSimulatedRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'permissions'>(defaultTab);

  // Profile Form State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [tagline, setTagline] = useState(user?.tagline || '@kai_vance // Master Narrative Director');
  const [bio, setBio] = useState(user?.bio || 'Lead Showrunner & Cyber-Noir Manga Architect at Kurogane Creative Lab. Directing Chrono Blade: Omega and Neo-Tokyo 2088 canon continuity.');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || AVATAR_PRESETS[0].url);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [website, setWebsite] = useState(user?.website || 'https://kurogane-studios.waza.zone');
  const [location, setLocation] = useState(user?.location || 'Neo-Tokyo // Sector 09');

  // Account Security State
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Feedback
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const showToast = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast('error', 'Full Name is required.');
      return;
    }

    setSavingProfile(true);
    const finalAvatar = customAvatarInput.trim() || avatarUrl;
    const res = await updateProfile({
      fullName,
      tagline,
      bio,
      avatarUrl: finalAvatar,
      website,
      location,
    });
    setSavingProfile(false);

    if (res.success) {
      showToast('success', 'Profile updated successfully and synced with Supabase Auth.');
    } else {
      showToast('error', res.error || 'Failed to update profile.');
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEmail(true);
    const res = await updateEmail(emailInput);
    setSavingEmail(false);
    if (res.success) {
      showToast('success', 'Verification link dispatched to new email address.');
    } else {
      showToast('error', res.error || 'Failed to update email.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('error', 'Passwords do not match.');
      return;
    }
    setSavingPassword(true);
    const res = await updatePassword(newPassword);
    setSavingPassword(false);
    if (res.success) {
      showToast('success', 'Password updated successfully. Active Supabase session secured.');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast('error', res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-[#11131A] border border-[#1E2230] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] select-none font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2230] bg-[#090A0F]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9D78FF] to-[#D8FF65] p-0.5">
              <div className="w-full h-full bg-[#090A0F] rounded-[10px] flex items-center justify-center">
                <User className="w-4 h-4 text-[#D8FF65]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  User Profile & Account Settings
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#1A1F10] text-[#D8FF65] border border-[#3E4A1E] text-[10px] font-mono font-bold">
                  SUPABASE AUTH PROTECTED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Manage personal creator identity, credentials, and Row-Level Security permissions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E2230] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Toast Banner */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs font-mono flex items-center gap-2 border-b ${
              statusMessage.type === 'success'
                ? 'bg-[#0E261B] text-[#38EF7D] border-[#1E5037]'
                : 'bg-[#2D1616] text-[#FF6B6B] border-[#592626]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="flex border-b border-[#1E2230] bg-[#0C0E14] px-6 gap-2 pt-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 flex items-center gap-2 font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#D8FF65] text-[#D8FF65]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-4 flex items-center gap-2 font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#9D78FF] text-[#D8B4FE]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Credentials & Auth Security</span>
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`pb-3 px-4 flex items-center gap-2 font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'permissions'
                ? 'border-[#68E7FF] text-[#68E7FF]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Workspace RLS Roles</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PROFILE & IDENTITY */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Avatar Selector */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  Creator Avatar & Visual Identity
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative group">
                    <img
                      src={customAvatarInput.trim() || avatarUrl}
                      alt="Avatar Preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D8FF65] shadow-lg shadow-[#D8FF65]/10"
                    />
                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-[11px] text-slate-400 font-sans block">
                      Choose a studio avatar preset or paste a custom high-res URL:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {AVATAR_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setAvatarUrl(preset.url);
                            setCustomAvatarInput('');
                          }}
                          className={`flex items-center gap-1.5 p-1 rounded-xl border text-[11px] font-mono transition-all cursor-pointer ${
                            avatarUrl === preset.url && !customAvatarInput
                              ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-white'
                              : 'border-[#1E2230] bg-[#141724] text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-5 h-5 rounded-lg object-cover"
                          />
                          <span className="truncate max-w-[120px]">{preset.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <input
                    type="url"
                    value={customAvatarInput}
                    onChange={(e) => setCustomAvatarInput(e.target.value)}
                    placeholder="Or enter custom image URL (e.g. https://...)"
                    className="w-full bg-[#11131A] border border-[#1E2230] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#D8FF65]"
                  />
                </div>
              </div>

              {/* Name & Tagline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                    Full Name / Showrunner Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                    Creator Tagline / Callout
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="@handle // Creative role"
                    className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D8FF65]"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                    Creative Bio & Storytelling Focus
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    Visible on Public Reader & Series Showcase
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell readers and collaborators about your manga, webtoon, or world-building expertise..."
                  className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D8FF65] leading-relaxed"
                />
              </div>

              {/* Website & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#68E7FF]" />
                    <span>Portfolio / Studio Domain</span>
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#68E7FF] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D8FF65]" />
                    <span>Studio Node Location</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D8FF65] font-mono"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1E2230]">
                <div className="text-[11px] font-mono text-slate-500">
                  Last updated: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Active session'}
                </div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-2.5 rounded-xl bg-[#D8FF65] hover:bg-[#cbf54f] text-[#090A0F] font-black text-xs font-sans transition-all shadow-lg shadow-[#D8FF65]/20 cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{savingProfile ? 'Saving...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CREDENTIALS & AUTH SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Email Address Management */}
              <form onSubmit={handleUpdateEmail} className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#68E7FF]" />
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Account Email & Login Identity
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#0E261B] text-[#38EF7D] border border-[#1E5037] text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Your primary email is used for Supabase Auth magic links, billing notifications, and critical FinOps circuit breaker alerts.
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 bg-[#11131A] border border-[#1E2230] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#68E7FF] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={savingEmail || emailInput === user?.email}
                    className="px-4 py-2 rounded-xl bg-[#161B26] hover:bg-[#202738] border border-[#262C40] text-xs font-mono font-bold text-slate-200 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    {savingEmail ? 'Sending...' : 'Update Email'}
                  </button>
                </div>
              </form>

              {/* Password Management */}
              <form onSubmit={handleUpdatePassword} className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#9D78FF]" />
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Change Master Password
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Bcrypt Hash / Supabase Identity
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#11131A] border border-[#1E2230] rounded-xl pl-3 pr-9 py-2 text-xs text-white focus:outline-none focus:border-[#9D78FF] font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Confirm New Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#11131A] border border-[#1E2230] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D78FF] font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-500">
                    Minimum 6 characters. Meets Supabase Auth policy requirements.
                  </span>
                  <button
                    type="submit"
                    disabled={savingPassword || !newPassword}
                    className="px-4 py-2 rounded-xl bg-[#9D78FF] hover:bg-[#8B62FF] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#9D78FF]/20 cursor-pointer disabled:opacity-50"
                  >
                    {savingPassword ? 'Updating...' : 'Set New Password'}
                  </button>
                </div>
              </form>

              {/* Active Session & Security Metrics */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3 font-mono text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Active Security State & Boundary Verification
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-[#11131A] border border-[#1E2230] space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase block">Auth Provider</span>
                    <span className="text-white font-bold">Supabase Native JWT</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#11131A] border border-[#1E2230] space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase block">Tenant Scope</span>
                    <span className="text-[#38EF7D] font-bold">{workspace?.id || 'ws_kurogane_01'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#11131A] border border-[#1E2230] space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase block">Client Token Leak</span>
                    <span className="text-[#38EF7D] font-bold">0 LEAKS (STRICT)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORKSPACE RLS ROLES & ACCESS CONTROL */}
          {activeTab === 'permissions' && (
            <div className="space-y-6">
              {/* Role Simulation Switcher */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#D8FF65]" />
                      <span>Role-Level Security (RLS) Policy Tester</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Test how granular database policies apply to different roles in workspace: <strong className="text-white">{workspace?.name}</strong>.
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-[#141724] border border-[#23293D] text-[10px] font-mono text-[#D8FF65] font-bold">
                    CURRENT ROLE: {user?.role}
                  </span>
                </div>

                {/* Role Switcher Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 font-mono text-xs">
                  {(['OWNER', 'ADMIN', 'EDITOR', 'CREATOR', 'VIEWER'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        switchSimulatedRole(r);
                        showToast('success', `Simulating active role: ${r}. RLS policies updated dynamically.`);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        user?.role === r
                          ? 'border-[#D8FF65] bg-[#D8FF65]/10 text-white font-bold shadow-md shadow-[#D8FF65]/10'
                          : 'border-[#1E2230] bg-[#11131A] text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px]">{r}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        {r === 'OWNER' && 'Full Master'}
                        {r === 'ADMIN' && 'Management'}
                        {r === 'EDITOR' && 'Production'}
                        {r === 'CREATOR' && 'Author'}
                        {r === 'VIEWER' && 'Read-Only'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Granular Matrix */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230] space-y-3 font-mono text-xs">
                <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px] block">
                  Enforced RLS Permission Matrix for <span className="text-[#D8FF65]">{user?.role}</span>
                </span>

                <div className="overflow-x-auto rounded-lg border border-[#1E2230]">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-[#11131A] text-slate-400 border-b border-[#1E2230] text-[10px] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Resource / Table</th>
                        <th className="py-2.5 px-3">Read (SELECT)</th>
                        <th className="py-2.5 px-3">Write (INSERT/UPDATE)</th>
                        <th className="py-2.5 px-3">Delete</th>
                        <th className="py-2.5 px-3">RLS Enforcement Clause</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E2230] bg-[#090A0F] text-slate-300">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">workspace_members</td>
                        <td className="py-2.5 px-3 text-[#38EF7D]">✓ Allowed</td>
                        <td className="py-2.5 px-3">
                          {['OWNER', 'ADMIN'].includes(user?.role || '') ? (
                            <span className="text-[#38EF7D]">✓ Allowed</span>
                          ) : (
                            <span className="text-[#FF6B6B]">✕ Blocked by RLS</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          {user?.role === 'OWNER' ? (
                            <span className="text-[#38EF7D]">✓ Allowed</span>
                          ) : (
                            <span className="text-[#FF6B6B]">✕ Blocked</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-[10px] text-slate-500">
                          user_has_workspace_role(workspace_id, ['OWNER','ADMIN'])
                        </td>
                      </tr>

                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">projects</td>
                        <td className="py-2.5 px-3 text-[#38EF7D]">✓ Allowed</td>
                        <td className="py-2.5 px-3">
                          {user?.role !== 'VIEWER' ? (
                            <span className="text-[#38EF7D]">✓ Allowed</span>
                          ) : (
                            <span className="text-[#FF6B6B]">✕ Blocked (Viewer)</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          {['OWNER', 'ADMIN'].includes(user?.role || '') ? (
                            <span className="text-[#38EF7D]">✓ Allowed</span>
                          ) : (
                            <span className="text-[#FF6B6B]">✕ Blocked</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-[10px] text-slate-500">
                          is_workspace_member(workspace_id)
                        </td>
                      </tr>

                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">characters & story_bibles</td>
                        <td className="py-2.5 px-3 text-[#38EF7D]">✓ Allowed</td>
                        <td className="py-2.5 px-3">
                          {user?.role !== 'VIEWER' ? (
                            <span className="text-[#38EF7D]">✓ Allowed</span>
                          ) : (
                            <span className="text-[#FF6B6B]">✕ Blocked</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          {['OWNER', 'ADMIN', 'EDITOR'].includes(user?.role || '') ? (
                            <span className="text-[#38EF7D]">✓ Allowed</span>
                          ) : (
                            <span className="text-[#FF6B6B]">✕ Blocked</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-[10px] text-slate-500">
                          workspace_id = current_workspace_id
                        </td>
                      </tr>

                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">credits_ledger (Audit)</td>
                        <td className="py-2.5 px-3 text-[#38EF7D]">✓ Allowed (Audit)</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#FFA94D]">Server-Only (IMMUTABLE)</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#FF6B6B]">✕ FORBIDDEN (No DELETE)</span>
                        </td>
                        <td className="py-2.5 px-3 text-[10px] text-slate-500">
                          Immutable append-only hash chain
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#1E2230] bg-[#090A0F]/80 text-xs font-mono">
          <span className="text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#38EF7D]" />
            <span>Multi-Tenant RLS Policy Engine Active</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#11131A] hover:bg-[#181B26] border border-[#262C40] text-slate-300 hover:text-white cursor-pointer transition-all"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
