
#include <SoftwareSerial.h>
const int rx=2;
const int tx=0;
int motor = 1; 
int x = 250;

SoftwareSerial mySerial(rx,tx);


// Setup
void setup(void)
{
mySerial.begin(9600);
 pinMode(1, OUTPUT); 
    pinMode(motor, HIGH);
}
     
void loop()
{
    if (mySerial.available()) { 
      byte c = mySerial.read (); 
     
      if (c == 'h') {  
   
      analogWrite(1, x);

     digitalWrite(motor, HIGH); 
        delay(1000); 
        digitalWrite(motor, LOW);
    delay(1000);  

      }
      if (c == 'l') {  

  analogWrite(1, x);

    digitalWrite(motor, LOW);

    }
  }
}
