int led = 1;
const int buttonPin = 3;     
int buttonState = 0;         

void setup() {

  pinMode(led, OUTPUT);      
  pinMode(buttonPin, INPUT);     
 
} 


void loop(){
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {     
    digitalWrite(led, HIGH);  
  } 
  
  else {
    digitalWrite(led, LOW); 
  }
}

