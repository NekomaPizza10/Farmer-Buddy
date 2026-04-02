import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { UserProfile } from '../types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: string | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return null;
    }
    return data as UserProfile;
  };

  const refreshProfile = async () => {
    if (user) {
      const p = await fetchProfile(user.id);
      setProfile(p);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // 1. Get the initial session.
      const { data: { session: initialSession }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching initial session:", error.message);
      }
      
      // 2. If a session exists, fetch the associated profile.
      if (initialSession) {
        const userProfile = await fetchProfile(initialSession.user.id);
        setSession(initialSession);
        setUser(initialSession.user);
        setProfile(userProfile);
      }
      
      // 3. We are done with the initial check, so stop loading.
      setLoading(false);
    };

    // Run the initialization
    initializeAuth();

    // 4. Set up a listener for future auth changes (login/logout).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        // If a user logs in, fetch their profile.
        if (newSession?.user) {
          const userProfile = await fetchProfile(newSession.user.id);
          setProfile(userProfile);
        } else {
          // If a user logs out, clear the profile.
          setProfile(null);
        }
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    // Cleanup the subscription when the component unmounts.
    return () => {
      subscription?.unsubscribe();
    };
  }, []); // The empty array [] ensures this runs only once on mount.

  const signUp = async (email: string, password: string, name: string) => {
    // First, attempt to sign up the user.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    // Handle initial errors (e.g., weak password).
    if (error) {
      return { error };
    }

    // This is the key check.
    // If data.user exists but the identities array is empty, it means the user
    // already exists but might not have confirmed their email.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return { 
        error: { 
          message: 'This email is already registered. Please log in or reset your password.' 
        } 
      };
    }

    // If we get here, it's a genuinely new user. Now, create their profile.
    if (data.user) {
      const { error: profileError } = await supabase.from('users').insert({
        id: data.user.id,
        email,
        name,
        role: 'employee', // Assign a default role
      });

      if (profileError) {
        console.error('Error creating profile:', profileError.message);
        return { error: profileError };
      }
    }

    // Success! No errors to return.
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    try {
      // Race against a 3s timeout — if Supabase hangs, we still clear local state
      await Promise.race([
        supabase.auth.signOut(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('signOut timeout')), 3000)
        ),
      ]);
    } catch (e) {
      console.warn('[signOut] error (ignored, clearing local state anyway):', e);
    } finally {
      // Always clear — guarantees navigation to login regardless of network
      setProfile(null);
      setSession(null);
      setUser(null);
    }
  };

  const role = profile?.role || null;   // Derive role from profile for easy access
  
  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        role,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
