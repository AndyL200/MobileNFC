import { Platform, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text.tsx';
import DarkVeil from '@/components/ui/darkVeil.js';
import NFC from '@/scripts/nfcSupport.js';
import { AuthContext } from '@/components/contexts/AuthContext.tsx'; 
import authService from '@/scripts/authService.js';

export default function HomeScreen() {
  const { session, user } = useContext(AuthContext);
  const [nfcUpload, setNFC] = useState({})

  useEffect(() => {
  let isMounted = true;

  const getFields = async () => {
    if (user) {
      try {
        const fields = await authService.getFields(user);
        if (isMounted) {
          setNFC(fields);
        }
      } catch (err) {
        console.error('Error fetching fields:', err);
      }
    }
  };

  getFields();

  return () => {
    isMounted = false; // ✅ Cleanup
  };
}, [user]); // ✅ Only run when 'user' changes

  return (
    <>
      <View style={styles.openingVeil}>
        <View style={StyleSheet.absoluteFill}>
          
        </View>
        <View style={styles.foreground}>
          <ThemedText style={styles.welcomeText}>Welcome to the page</ThemedText>
          <ThemedText style={styles.subText}>Maneuver to Login to Begin</ThemedText>
          {session && user ? (
            <NFC value={nfcUpload} />
          ) : (
            <ThemedText style={styles.subText}>Please log in to continue</ThemedText>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  openingVeil: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#667eea',
  },
  foreground: {
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.85,
    textAlign: 'center',
    marginBottom: 20,
  },
});

//<DarkVeil />