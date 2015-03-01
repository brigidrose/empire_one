#include <avr/power.h>

void setup(){
  
  if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
  
  
}

void loop(){
}
