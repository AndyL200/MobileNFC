import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  darkveilCanvas: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default styles;