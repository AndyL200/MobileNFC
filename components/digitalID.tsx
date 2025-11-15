import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StudentPhoto = require('@/assets/student-photo.jpg');
const TSUStrip = require('@/assets/tsu.jpg');

interface Student {
  stuid: string;
  name: string;
  diningDollars: string;
  classification: string;
  photoUrl?: string;
  qrCodeUrl?: string;
}

const TSULogo = 'https://www.tnstate.edu/publications/images/Logo_BlueOnWhite_2170w.png';
const QR_PLACEHOLDER = 'https://via.placeholder.com/80.png?text=QR';

const DigitalIdCard: React.FC<{ student: Student }> = ({ student }) => {
  const [photoError, setPhotoError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const photoSrc = !photoError && student.photoUrl ? student.photoUrl : StudentPhoto;
  const qrSrc = student.qrCodeUrl || QR_PLACEHOLDER;

  return (
    <View style={styles.tsuIdCard}>
      {/* Header */}
      <View style={styles.tsuCardHeader}>
        {/* TSU Logo */}
        {!logoError && (
          <Image
            source={{ uri: TSULogo }}
            style={styles.tsuLogo}
            onError={() => setLogoError(true)}
          />
        )}

        {/* University banner strip */}
        <View style={styles.tsuBannerStrip}>
          <Image
            source={TSUStrip}
            style={styles.tsuBannerImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Student photo overlapping the strip */}
      <View style={styles.tsuPhotoContainer}>
        <Image
          source={typeof photoSrc === 'string' ? { uri: photoSrc } : photoSrc}
          style={styles.tsuStudentPhoto}
          onError={() => setPhotoError(true)}
          resizeMode="cover"
        />
      </View>

      {/* Student info */}
      <View style={styles.tsuStudentInfo}>
        <Text style={styles.tsuStudentName}>{student.name}</Text>
        <Text style={styles.tsuStudentRole}>Student</Text>
      </View>

      {/* Account balances */}
      <View style={styles.tsuStudentBalances}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>DINING DOLLARS</Text>
          <Text style={styles.balanceValue}>${student.diningDollars}</Text>
        </View>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>T-NUMBER</Text>
          <Text style={styles.balanceValue}>{student.stuid}</Text>
        </View>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>CLASSIFICATION</Text>
          <Text style={styles.balanceValue}>{student.classification}</Text>
        </View>
      </View>

      {/* QR Code */}
      <View style={styles.tsuQrContainer}>
        <Image
          source={{ uri: qrSrc }}
          style={styles.qrImage}
          onError={() => {
            // Handle QR code error if needed
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tsuIdCard: {
    width: 400,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#002244',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
    paddingBottom: 16,
  },
  tsuCardHeader: {
    width: '100%',
    height: 120,
    backgroundColor: '#002244',
    position: 'relative',
  },
  tsuLogo: {
    width: 100,
    height: 60,
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 3,
  },
  tsuBannerStrip: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: '100%',
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1,
  },
  tsuBannerImage: {
    width: '100%',
    height: '100%',
  },
  tsuPhotoContainer: {
    marginTop: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
    backgroundColor: '#fff',
    zIndex: 2,
  },
  tsuStudentPhoto: {
    width: '100%',
    height: '100%',
  },
  tsuStudentInfo: {
    alignItems: 'center',
    marginTop: 8,
  },
  tsuStudentName: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  tsuStudentRole: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.85,
    marginTop: 2,
  },
  tsuStudentBalances: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  balanceValue: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 2,
  },
  tsuQrContainer: {
    marginTop: 12,
    width: 80,
    height: 80,
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
});

export default DigitalIdCard;