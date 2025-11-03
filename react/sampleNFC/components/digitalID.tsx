import React, { useState } from 'react';
import '@/styles/digitalIDStyle.css'



const StudentPhoto = '../assets/images/studentPhoto';
const TSUStrip = '../assets/images/tsu.jpg';

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
    <div className="tsu-id-card">
      {/* Header */}
      <div className="tsu-card-header">
        {/* TSU Logo */}
        {!logoError && (
          <img
            src={TSULogo}
            alt="TSU Logo"
            className="tsu-logo"
            onError={() => setLogoError(true)}
          />
        )}

        {/* University banner strip */}
        <div
          className="tsu-banner-strip"
          style={{ backgroundImage: `url(${TSUStrip})` }}
        ></div>
      </div>

      {/* Student photo overlapping the strip */}
      <div className="tsu-photo-container">
        <img
          src={photoSrc}
          alt="student"
          onError={() => setPhotoError(true)}
          className="tsu-student-photo"
        />
      </div>

      {/* Student info */}
      <div className="tsu-student-info">
        <div className="tsu-student-name">{student.name}</div>
        <div className="tsu-student-role">Student</div>
      </div>

      {/* Account balances */}
      <div className="tsu-student-balances">
        <div>
          <div className="balance-label">DINING DOLLARS</div>
          <div className="balance-value">${student.diningDollars}</div>
        </div>
        <div>
          <div className="balance-label">T-NUMBER</div>
          <div className="balance-value">{student.stuid}</div>
        </div>
        <div>
          <div className="balance-label">CLASSIFICATION</div>
          <div className="balance-value">{student.classification}</div>
        </div>
      </div>

      {/* QR Code */}
      <div className="tsu-qr-container">
        <img
          src={qrSrc}
          alt="QR Code"
          style={{ width: '100%', height: '100%' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = QR_PLACEHOLDER;
          }}
        />
      </div>
    </div>
  );
};

export default DigitalIdCard;