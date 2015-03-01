#include <SoftwareSerial.h>
const int rx=2;
const int tx=0;

SoftwareSerial mySerial(rx,tx);

void setup() 
{ 
mySerial.begin(9600);
} 

void loop() {
 if (mySerial.available()) {
   char data = mySerial.read();
   mySerial.write(data);
 }
}


