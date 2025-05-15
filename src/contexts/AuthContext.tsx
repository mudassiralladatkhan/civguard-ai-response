
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
        toast({
          title: "Profile error",
          description: "Could not retrieve your profile. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "System error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
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

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('No user returned after sign up');
      }

      // 2. Create the user profile in the users table
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email,
          role,
          name,
        },
      ]);

      if (profileError) {
        throw profileError;
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });

      // The onAuthStateChange will handle setting the user and session
    } catch (error: any) {
      let errorMessage = "An error occurred during registration.";
      
      if (error.message) {
        // Extract more specific error message
        if (error.message.includes("already registered")) {
          errorMessage = "This email is already registered. Please use a different email or try logging in.";
        } else if (error.message.includes("password")) {
          errorMessage = "Password error: " + error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error signing up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch user profile to get role for redirection
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user role:', profileError);
        } else if (profileData) {
          // Successfully fetched profile with role
          toast({
            title: "Login successful",
            description: `Welcome back to CivGuard.`,
          });
          
          // Redirect based on role
          navigate(getRedirectPathByRole(profileData.role));
          return;
        }
      }

      toast({
        title: "Login successful",
        description: "Welcome back to CivGuard.",
      });

      // Default redirect if we couldn't determine the role
      navigate('/dashboard');

    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      console.error('Error signing in:', error);
    } finally {
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

  const getRedirectPathByRole = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'officer':
        return '/municipal-dashboard';
      case 'citizen':
      default:
        return '/dashboard';
    }
  };

  const getRedirectPath = () => {
    if (!profile) return '/';
    return getRedirectPathByRole(profile.role);
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
