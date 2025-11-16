import { createContext, useEffect, useState, ReactNode } from 'react';
import { AppState } from 'react-native';
import { Session } from '@supabase/supabase-js';
import supabase  from '@/scripts/supabaseClient';
import AuthService from '@/scripts/authService';

export const AuthContext = createContext<{
  session: Session | null;
  user: any;
  refreshUser: () => Promise<void>;
  setUser: (user: any) => void;
}>({ session: null, user: null,  refreshUser: async () => {}, setUser: () => {}});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
      try {
        const userData = await AuthService.getCurrentUser();
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null); // Clear user if no data found
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
        setUser(null); // Clear user on error
      }
    };

  const refreshUser = async () => {
    await loadUserData();
  };

  useEffect(() => {

  
    const initSession = async () => {
      try {
        const sessionData = await AuthService.getSession();
        if (sessionData?.user) {
          setSession(sessionData);
          loadUserData();
        }
      } catch (err) {
        console.error('Failed to get session:', err);
      }
    };

    initSession();

    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user,  refreshUser, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}