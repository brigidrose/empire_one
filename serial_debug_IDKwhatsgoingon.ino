#define KNOCK_BANG 1
#include <TinyDebugKnockBang.h>
 
// pin for LED
int led = 1;  // ATtiny25

// change in TinyDebugSerial.h line 613 from 3 -> 1 for TinyISP
//  #define TINY_DEBUG_SERIAL_BIT         1
#ifdef KNOCK_BANG
#define Serial Debug
#endif

// the setup routine runs once when you press reset:
void setup() {                
  pinMode(led, OUTPUT);  
  Serial.begin( 9600 );    // for tiny_debug_serial  
}

void loop() {
  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);               // wait for a second
  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  delay(1000); 
  #ifdef KNOCK_BANG
    Serial.print( "KnockBang-");
  #else
    Serial.print( "Serial-");
  #endif
  Serial.println( "Testing...");  // debug output
}
