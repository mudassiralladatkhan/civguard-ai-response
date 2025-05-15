
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type UserProfile = {
  id: string;
  email: string;
  role: 'citizen' | 'officer' | 'admin';
  name: string | null;
  created_at: string;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, role: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getRedirectPath: () => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, role, name, created_at')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: string, name: string) => {
    try {
      setIsLoading(true);

      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user returned after sign up');

      // 2. Create the user profile in the users table
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email,
          role,
          name,
        },
      ]);

      if (profileError) throw profileError;

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });

      // The onAuthStateChange will handle setting the user and session
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
      console.error('Error signing up:', error);
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login successful",
        description: "Welcome back to CivGuard.",
      });

      // The session will be set by the onAuthStateChange listener
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      console.error('Error signing in:', error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message || "An error occurred during logout.",
        variant: "destructive",
      });
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRedirectPath = () => {
    if (!profile) return '/';
    
    switch (profile.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'officer':
        return '/municipal-dashboard';
      case 'citizen':
      default:
        return '/dashboard';
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    getRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
