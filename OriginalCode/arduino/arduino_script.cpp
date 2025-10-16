#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

#define PN532_IRQ (2)
#define PN532_RESET (3)

//placeholder
#define KEY = 0x98 

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);



#define BUFFERSIZE = 100;
byte data[BUFFERSIZE] = {};
byte AID[] = {0xF0, 0x39, 0x41, 0x48, 0x14, 0x81, 0x00}; //AID/Data
unsigned int aidLen = sizeof(AID)/sizeof(uint8_t);
byte* ApduFormat = new byte[6 + aidLen];
              
int tell = 0;
int index = 0;
String check = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //baud rate
  Serial.println("Start");
  

  ApduFormat[0] = (byte)0x00; //CLA 
  ApduFormat[1] = (byte)0xA4; //INS
  ApduFormat[2] = (byte)0x04; //P1
  ApduFormat[3] = (byte)0x00; //P2
  ApduFormat[4] = (byte)(aidLen & 0x0FF); //Lc
  memcpy(ApduFormat, AID, aidLen); 
  
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
  // put your main code here, to run repeatedly:

  uint8_t success;
  uint8_t aid[6 + aidLen];
  uint8_t aidLength;
  
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, aid, &aidLength);

  nfc.PrintHex(aid, aidLength);

  if(success)
  {
      if (aidLength != 6 + aidLen)
      {
        Serial.println("Failure");
        return;
      }
        //Read
        Serial.println("APDU Protocol");
        //TODO()CyberSecurity Requirement, generate a private key for authentication
      
          Serial.println("Reading Data");
          nfc.PrintHexChar(data, 6 + aidLen);
          //comare aid[6-aid.length-1] to AID
         if(memcmp(aid, AID))
         {
          //Write
         
         
          nfc.PrintHex(data,4);
          //TODOs
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
  else
  {
      Serial.println("Waiting for card");
      delay(500);
  }

}