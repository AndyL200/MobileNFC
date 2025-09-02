#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

#define PN532_IRQ (2)
#define PN532_RESET (3)

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

const int bufferSize = 100;
byte bufferData[bufferSize];
int tell = 0;
int index = 0;
String check = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //baud rate
  Serial.println("Start");
  nfc.begin();


  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata)
  {
    Serial.print("Could not find board");
    while(1)
    {
      delay(100);
    }
  }
  else
  {
    Serial.println("Board Found");
  }
  
}

void loop() {
  while(Serial.available() >= 4 && index < bufferSize-4)
  {
        Serial.print("Reading Data");
    for(int i = index; i < index + 4; ++i)
    {
       bufferData[i] = Serial.read();
    }

    for(int i = index; i < index + 4; ++i)
    {
      Serial.print("0x");
      Serial.print(bufferData[i], HEX);
      check += String(bufferData[i], HEX);
      Serial.print(" ");
    }
    index += 4;
          Serial.println();
  }

  Serial.print(check);
    
  // put your main code here, to run repeatedly:

  uint8_t success;
  uint8_t uid[] = {0, 0, 0, 0, 0, 0, 0};
  uint8_t uidLength;
  
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

  if(success)
  {
      Serial.println("Found ISO14443A Card");
      nfc.PrintHex(uid, uidLength);

      if (uidLength == 4)
      {
        Serial.println("Mifare Classic Card (4 byte UID)");
    
        uint8_t keya[6] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
        success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, 4, 0, keya);
        if(success)
        {
      
          Serial.println("Sector 1 Authenticated");
          uint8_t data[16];
      
          success = nfc.mifareclassic_ReadDataBlock(4, data);

            if(success)
            {
              Serial.println("Reading Block 4:");
              nfc.PrintHexChar(data, 16);
            }
          }
        }
     else if(uidLength == 7)
     {
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
      }
  }
      Serial.println("Waiting for card");
      delay(500);

}