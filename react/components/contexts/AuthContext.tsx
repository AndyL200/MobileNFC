import { createContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/scripts/supabaseClient';
import AuthService from '@/scripts/authService';

export const AuthContext = createContext<{
  session: Session | null;
  user: any;
}>({ session: null, user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        const userData = await AuthService.getCurrentUser();
        if (isMounted && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    const initSession = async () => {
      try {
        const sessionData = await AuthService.getSession();
        if (isMounted && sessionData?.user) {
          setSession(sessionData);
          loadUserData();
        }
      } catch (err) {
        console.error('Failed to get session:', err);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (isMounted) {
          setSession(newSession);
          if (newSession?.user) {
            loadUserData();
          } else {
            setUser(null);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
}