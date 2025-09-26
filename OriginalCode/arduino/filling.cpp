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
