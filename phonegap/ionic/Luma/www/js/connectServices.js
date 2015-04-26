angular.module('connect.services', [])

.factory('Connect', function() {

  var info = [{
    
    connect: {class:"connectText", text:"CONNECT"},
    connectBluetooth: {class:"connectBluetooth", text:"Connect to Bluetooth in Settings"},
    step1: {class:"step1", text:"1. Go to Settings"},
    step2: {class:"step2", text:"2. Tap Bluetooth"},
    step3: {class:"step3", text:"3. If Bluetooth is off, turn on"},
    step4: {class:"step4", text:"4. Push button behind necklace"},
    step5: {class:"step5", text:'5. Back in Settings, choose "Luma Legacy" under my Devices'},
    hold: {class:"hold", img:"img/connect/connect1/hold.png"},
    pushDown: {class:"pushDown", text:"Push down on the button behind your pendant"},

    youruniquepin: {class:"youruniquepin", text:"YOUR UNIQUE PIN"},
    withyour: {class:"withyour", text:"With your necklace, you have received a card made especially for you. Please enter the numbers you see on that card"},

    group: {class:"group", img:"img/connect/connect1/Group.png"},

    dont: {class:"dont", text:"I don't have a pin"},

    keyboard: {class:"keyboard", img:"img/connect/connect1/keyboard.png"},
    


  }];


  return {
    all: function() {
      return info;
    }
  };
});