// Import libraries (BLEPeripheral depends on SPI)
#include <SPI.h>
#include <BLEPeripheral.h>

// define pins (varies per shield/board)
#define BLE_REQ     10
#define BLE_RDY     2
#define BLE_RST     9

// LED and button pin & MOTOR
#define LED_PIN     13
//#define BUTTON_PIN  D2
//#define MOTOR_PIN  D3

#define BUTTON_PIN  2
#define MOTOR_PIN  4

//#define BUTTON_PIN  1
//#define MOTOR_PIN  0


// create peripheral instance, see pinouts above
BLEPeripheral            blePeripheral        = BLEPeripheral(BLE_REQ, BLE_RDY, BLE_RST);

// create service
BLEService               ledService           = BLEService("19b10010e8f2537e4f6cd104768a1214");

// create switch and button characteristic
BLECharCharacteristic    switchCharacteristic = BLECharCharacteristic("19b10011e8f2537e4f6cd104768a1214", BLERead | BLEWrite);
BLECharCharacteristic    buttonCharacteristic = BLECharCharacteristic("19b10012e8f2537e4f6cd104768a1214", BLERead | BLENotify);

void setup() {
 Serial.begin(115200);
#if defined (__AVR_ATmega32U4__)
 delay(5000);  //5 seconds delay for enabling to see the start up comments on the serial board
#endif

 // set LED pin to output mode, button pin to input mode
 pinMode(LED_PIN, OUTPUT);
 pinMode(BUTTON_PIN, INPUT);
 pinMode(MOTOR_PIN, OUTPUT);

 // set advertised local name and service UUID
 blePeripheral.setLocalName("LUMA");
 blePeripheral.setAdvertisedServiceUuid(ledService.uuid());

 // add service and characteristics
 blePeripheral.addAttribute(ledService);
 blePeripheral.addAttribute(switchCharacteristic);
 blePeripheral.addAttribute(buttonCharacteristic);
 
// blePeripheral.setEventHandler(BLEConnected, blePeripheralConnectHandler);
// blePeripheral.setEventHandler(BLEDisconnected, blePeripheralDisconnectHandler);
//
//  // assign event handlers for characteristic
// switchCharacteristic.setEventHandler(BLEWritten, switchCharacteristicWritten);

 // begin initialization
 blePeripheral.begin();

 Serial.println(F("BLE LED Switch Peripheral"));
}


void blePeripheralConnectHandler(BLECentral& central) {
  // central connected event handler
  Serial.print(F("Connected event, central: "));
  Serial.println(central.address());
  
  //blink so we know it's connected
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
  delay(50);  
  digitalWrite(LED_PIN, HIGH);
  delay(100);  
  digitalWrite(LED_PIN, LOW);
}


void blePeripheralDisconnectHandler(BLECentral& central) {
  // central disconnected event handler
  Serial.print(F("Disconnected event, central: "));
  Serial.println(central.address());
  
    
  //turn on for half second so we know it's disconnected
  digitalWrite(LED_PIN, LOW);
  delay(100);
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
}






void switchCharacteristicWritten(BLECentral& central, BLECharacteristic& characteristic) {
  // central wrote new value to characteristic, update LED
  Serial.print(F("Characteristic event, writen: "));
  
  //toggle between ON/OFF every time a value is written
  if (switchCharacteristic.value()==1) {
    Serial.println(F("Motor on"));
    analogWrite(MOTOR_PIN, HIGH);
    digitalWrite(LED_PIN, LOW);
  } else {
    Serial.println(F("Motor off"));
    analogWrite(MOTOR_PIN, LOW);
    digitalWrite(LED_PIN, HIGH);
  }
}








void loop() {
 // poll peripheral
 blePeripheral.poll();

 // read the current button pin state
 char buttonValue = digitalRead(BUTTON_PIN);

 // has the value changed since the last read
 bool buttonChanged = (buttonCharacteristic.value() != buttonValue);

 if (buttonChanged) {
   // button state changed, update characteristics
   switchCharacteristic.setValue(buttonValue);
   buttonCharacteristic.setValue(buttonValue);
 }

 if (switchCharacteristic.written() || buttonChanged) {
   analogWrite(MOTOR_PIN, 255);
     delay(3000);
     analogWrite(MOTOR_PIN, 0);
   // update LED, either central has written to characteristic or button state has changed
   if (switchCharacteristic.value()) {
     Serial.println(F("LED on"));
     digitalWrite(LED_PIN, HIGH);
   } else {
     Serial.println(F("LED off"));
     digitalWrite(LED_PIN, LOW);
   }
 }
}
