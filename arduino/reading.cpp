success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

  if(success)
  {
      Serial.println("Found ISO14443A Card");
      if(uidLength == 7)
     {
      Serial.println("This is a NTAG2xx tag (7 byte UID)");
        //NTAG215
         uint8_t data[4];
         for(uint8_t i = 10; i < 120; ++i)
         {
         success = nfc.ntag2xx_ReadPage(i, data);
         if (success)
         {
          nfc.PrintHex(data,4);
         }
         memset(data, 0, sizeof(data));
        }
    }
}