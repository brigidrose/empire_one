int led = 0; // pulse 'digital' pin 1 - AKA the built in red LED
// the setup routine runs once when you press reset:

const int buttonPin = 3;     // the number of the pushbutton pin
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {

    pinMode(led, OUTPUT);      
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);     
  
} 



void loop(){
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {     
    // turn LED on:    
    digitalWrite(led, HIGH);  
  } 
  else {
    // turn LED off:
    digitalWrite(led, LOW); 
  }
}

//void PWM4_init() {
//// Set up PWM on Trinket GPIO #4 (PB4, pin 3) using Timer 1 TCCR1 = _BV (CS10); // no prescaler
//GTCCR = _BV (COM1B1) | _BV (PWM1B); // clear OC1B on compare OCR1B = 127; // duty cycle initialize to 50%
//OCR1C = 255; // frequency
//}
//// Function to allow analogWrite on Trinket GPIO #4
//void analogWrite4(uint8_t duty_value) {
//OCR1B = duty_value; // duty may be 0 to 255 (0 to 100%) 
//}
