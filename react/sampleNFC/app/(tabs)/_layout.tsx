import { Tabs } from 'expo-router';
import React from 'react';
import { useState, useEffect } from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/scripts/supabaseClient';
import { Session } from '@supabase/supabase-js';
import AuthService from '@/scripts/authService';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState(null);
  useEffect(() => {
  let isMounted = true; // Prevent state updates after unmount

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
        await loadUserData();
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
    isMounted = false; // ✅ Prevent stale state updates
    subscription?.unsubscribe();
  };
}, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href:'/',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="loginPage"
        options={{
          title: 'loginPage',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="key.card" color={color} />,
        }}
      />
    </Tabs>
  );
}
