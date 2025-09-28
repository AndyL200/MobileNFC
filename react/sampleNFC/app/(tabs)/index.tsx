import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import {View} from 'react-native'
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { NFC_Ready } from '@/components/contexts/nfcContext';
import DarkVeil from '@/components/ui/darkVeil';
import NFC from '../../scripts/nfcSupport';
import { useContext } from 'react';




export default function HomeScreen() {
  const ready = useContext(NFC_Ready);
  return (
    <>
    <View style={styles.openingVeil}>
    <View style={StyleSheet.absoluteFill}>
      <DarkVeil/>
    </View>
    <View style={styles.foreground}>
      <ThemedText>Welcome to the page</ThemedText>
      {ready? (
      <NFC></NFC>
      ) : (<></>)}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  openingVeil: {
    position:'relative',
    flex:1
  },
  foreground: {
    zIndex: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    color: 'white'
  }
});
