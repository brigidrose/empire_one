int motor = 1; 
int x = 20;

void setup() 
{ pinMode(motor, HIGH); } 

void loop() 
{ 


analogWrite(1, x);
  
  
  digitalWrite(motor, HIGH); 
delay(1000); 
digitalWrite(motor, LOW);
delay(1000); 

digitalWrite(motor, HIGH); 
delay(1000); 
digitalWrite(motor, LOW);
delay(1000); 


//int x = analogRead(A0);
 

}

