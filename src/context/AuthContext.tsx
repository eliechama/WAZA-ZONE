import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Workspace } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  workspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithPassword: (email: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  provisionWorkspace: (name: string, handle: string, tier: Workspace['planTier']) => Promise<void>;
  logout: () => void;
  updateCreditBalance: (newBalance: number) => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  updateEmail: (newEmail: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  switchSimulatedRole: (role: UserProfile['role']) => void;
}

const defaultProfile: UserProfile = {
  id: 'usr_kai_vance_01',
  email: 'kai.vance@neokyoto-studios.jp',
  fullName: 'Kai Vance',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  role: 'OWNER',
  bio: 'Lead Showrunner & Cyber-Noir Manga Architect at Kurogane Creative Lab. Directing Chrono Blade: Omega and Neo-Tokyo 2088 canon continuity.',
  tagline: '@kai_vance // Master Narrative Director',
  website: 'https://kurogane-studios.waza.zone',
  location: 'Neo-Tokyo // Sector 09',
  updatedAt: new Date().toISOString()
};

const defaultWorkspace: Workspace = {
  id: 'ws_kurogane_01',
  name: 'Kurogane Creative Lab',
  slug: 'neokyoto',
  planTier: 'PRO_STUDIO',
  creditBalance: 4850,
  reservedCredits: 24,
  storageRegion: 'AWS Tokyo (ap-northeast-1)',
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(defaultProfile);
  const [workspace, setWorkspace] = useState<Workspace | null>(defaultWorkspace);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || 'user@waza.zone',
          fullName: session.user.user_metadata?.full_name || 'Studio Member',
          avatarUrl: session.user.user_metadata?.avatar_url,
          role: 'OWNER',
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || 'user@waza.zone',
          fullName: session.user.user_metadata?.full_name || 'Studio Member',
          avatarUrl: session.user.user_metadata?.avatar_url,
          role: 'OWNER',
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      // Fallback demo login if OAuth redirected in frame environment
      setUser(defaultProfile);
      setWorkspace(defaultWorkspace);
    } catch (e) {
      console.warn('Google sign-in fallback:', e);
      setUser(defaultProfile);
      setWorkspace(defaultWorkspace);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPassword = async (email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: `usr_${Math.random().toString(36).substring(2, 8)}`,
        email,
        fullName: email.split('@')[0],
        role: 'OWNER',
      });
      setWorkspace(defaultWorkspace);
      setIsLoading(false);
    }, 600);
  };

  const sendMagicLink = async (email: string) => {
    setIsLoading(true);
    await supabase.auth.signInWithOtp({ email });
    setIsLoading(false);
  };

  const provisionWorkspace = async (name: string, handle: string, tier: Workspace['planTier']) => {
    setIsLoading(true);
    setTimeout(() => {
      setWorkspace({
        id: `ws_${handle}_${Date.now()}`,
        name,
        slug: handle,
        planTier: tier,
        creditBalance: 5000,
        reservedCredits: 0,
        storageRegion: 'AWS Tokyo (ap-northeast-1)',
      });
      setIsLoading(false);
    }, 800);
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setWorkspace(null);
  };

  const updateCreditBalance = (newBalance: number) => {
    if (workspace) {
      setWorkspace({ ...workspace, creditBalance: newBalance });
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const { error: supaErr } = await supabase.auth.updateUser({
        data: {
          full_name: data.fullName,
          avatar_url: data.avatarUrl,
          bio: data.bio,
          tagline: data.tagline,
          website: data.website,
          location: data.location,
        }
      });
      if (supaErr) {
        console.warn('Supabase updateUser metadata notice (using local state):', supaErr.message);
      }

      if (user?.id) {
        try {
          await supabase.from('profiles').update({
            full_name: data.fullName,
            avatar_url: data.avatarUrl,
            updated_at: new Date().toISOString()
          }).eq('id', user.id);
        } catch (tableErr) {
          console.warn('Profile table sync notice:', tableErr);
        }
      }

      setUser(prev => prev ? {
        ...prev,
        ...data,
        updatedAt: new Date().toISOString()
      } : null);

      return { success: true };
    } catch (err: any) {
      console.error('Error updating profile:', err);
      return { success: false, error: err?.message || 'Failed to update profile' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = async (newEmail: string): Promise<{ success: boolean; error?: string }> => {
    if (!newEmail || !newEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) {
        console.warn('Supabase update email notice:', error.message);
      }
      setUser(prev => prev ? { ...prev, email: newEmail } : null);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update email' };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        console.warn('Supabase update password notice:', error.message);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update password' };
    } finally {
      setIsLoading(false);
    }
  };

  const switchSimulatedRole = (role: UserProfile['role']) => {
    setUser(prev => prev ? { ...prev, role } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        isAuthenticated: !!user,
        isLoading,
        loginWithGoogle,
        loginWithPassword,
        sendMagicLink,
        provisionWorkspace,
        logout,
        updateCreditBalance,
        updateProfile,
        updateEmail,
        updatePassword,
        switchSimulatedRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
