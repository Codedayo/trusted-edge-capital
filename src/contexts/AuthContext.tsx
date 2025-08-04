import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName || ''} ${lastName || ''}`.trim(),
          },
        },
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data.user) {
        // Try to create user profile, but don't fail if it doesn't work
        try {
          await createUserProfile(data.user);
        } catch (profileError) {
          console.warn('Profile creation failed, but user was created:', profileError);
        }
        
        // Check if email confirmation is required
        if (data.session) {
          // User is immediately signed in (email confirmation disabled)
          toast({
            title: "Registration successful!",
            description: "Welcome to Trusted Edge Capital",
          });
        } else {
          // Email confirmation is required
          toast({
            title: "Registration successful!",
            description: "Please check your email to verify your account. If you don't see it, check your spam folder.",
          });
        }
      }

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in",
        });
      }

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Clear demo user
      localStorage.removeItem('demoUser');
      setUser(null);
      
      // Sign out from Supabase if connected
      await supabase.auth.signOut();

      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signInDemo = () => {
    const demoUser = {
      id: 'demo-user-id',
      email: 'demo@trustededgecapital.com',
      user_metadata: {
        full_name: 'Demo User',
        avatar_url: null
      },
      app_metadata: {
        provider: 'demo'
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    setUser(demoUser);
    
    toast({
      title: "Demo mode activated",
      description: "You're now using the demo account",
    });
  };

  const createUserProfile = async (user: User) => {
    try {
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          first_name: user.user_metadata?.first_name,
          last_name: user.user_metadata?.last_name,
          display_name: user.user_metadata?.full_name,
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }

      // Create default portfolio
      const { error: portfolioError } = await supabase
        .from('portfolios')
        .insert({
          user_id: user.id,
          name: 'Main Portfolio',
          balance: 0,
          available_balance: 0,
          currency: 'USD',
          is_default: true,
        });

      if (portfolioError) {
        console.error('Error creating portfolio:', portfolioError);
      }

      // Create default watchlist
      const { error: watchlistError } = await supabase
        .from('watchlists')
        .insert({
          user_id: user.id,
          name: 'My Watchlist',
          is_default: true,
        });

      if (watchlistError) {
        console.error('Error creating watchlist:', watchlistError);
      }
    } catch (error) {
      console.error('Error setting up user profile:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInDemo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}