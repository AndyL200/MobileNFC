Serial.println("This is a NTAG2xx tag (7 byte UID)");
    //NTAG215
    uint8_t data[4];
    for(uint8_t i = 10; i < 135; ++i)
    {
    success = nfc.ntag2xx_ReadPage(i, data);
    if (success)
    {
     nfc.PrintHex(data,4);
     Serial.println();
     if(tell < index)
     {
       memcpy(data, bufferData + tell, 4);
       tell += 4;
       nfc.ntag2xx_WritePage(i, data);
       nfc.PrintHex(data, 4);
       Serial.println("new" + tell);
     }
    }
    memset(data, 0, sizeof(data));
       }
      