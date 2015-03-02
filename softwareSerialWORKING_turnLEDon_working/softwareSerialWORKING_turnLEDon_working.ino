
  #include <SoftwareSerial.h>
const int rx=2;
const int tx=0;

SoftwareSerial mySerial(rx,tx);


// Setup
void setup(void)
{
mySerial.begin(9600);
    pinMode(1, OUTPUT); //Set digital pin 12 to be an output pin (for controlling LED)
}
     
void loop(void)
{
    // Get command
    if (mySerial.available()) { //Checks to see if the number of bytes (characters available 
                              //for reading from serial port is not zero (i.e. serial data is available)
     
      // Read command
      byte c = mySerial.read (); //read incoming serial data, store in a variable "c". 
     
      // If a measurement is requested, measure data and send it back
      if (c == 'm'){
     
     
      }
      if (c == 'h') {  //If command to turn on LED is requested, turn LED on
     digitalWrite(1, HIGH);  
        // mySerial.write(1, HIGH);

      }
      if (c == 'l') {  //If command to turn off LED is request, turn LED off
       digitalWrite(1, LOW);  
               //   mySerial.write(1, HIGH);

    }
  }
}
