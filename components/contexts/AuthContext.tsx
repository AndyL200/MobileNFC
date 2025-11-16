import { createContext, useEffect, useState, ReactNode } from 'react';
import { AppState } from 'react-native';
import { Session } from '@supabase/supabase-js';
import supabase  from '@/scripts/supabaseClient';
import AuthService from '@/scripts/authService';

export const AuthContext = createContext<{
  session: Session | null;
  user: any;
}>({ session: null, user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadUserData = async () => {
      try {
        const userData = await AuthService.getCurrentUser();
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

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
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
}