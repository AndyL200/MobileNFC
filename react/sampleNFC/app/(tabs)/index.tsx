import { Platform, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import DarkVeil from '@/components/ui/darkVeil';
import NFC from '../../scripts/nfcSupport';
import { AuthContext } from '@/components/contexts/AuthContext'; 
import authService from '@/scripts/authService';

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
          <DarkVeil />
        </View>
        <View style={styles.foreground}>
          <ThemedText>Welcome to the page</ThemedText>
          <ThemedText>Maneuver to Login to Begin</ThemedText>
          {session && user ? (
            <NFC value={nfcUpload} />
          ) : (
            <ThemedText>Please log in to continue</ThemedText>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  openingVeil: {
    position: 'relative',
    flex: 1
  },
  foreground: {
    zIndex: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    color: 'white',
    textDecorationColor: 'white'
  }
});