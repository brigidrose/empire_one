
#include <SoftwareSerial.h>
const int rx=2;
const int tx=0;

SoftwareSerial mySerial(rx,tx);


// Setup
void setup(void)
{
mySerial.begin(9600);
    pinMode(1, OUTPUT); 
}
     
void loop(void)
{
    if (mySerial.available()) { 
      byte c = mySerial.read (); 
     
      if (c == 'm'){
     
     
      }
      if (c == 'h') {  
     digitalWrite(1, HIGH);  

      }
      if (c == 'l') {  
       digitalWrite(1, LOW);  

    }
  }
}
