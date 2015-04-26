/*
  BLE Sensor

  Read values from Maria Paula Saba's BLE Sensor service
  https://github.com/tigoe/BluetoothLE-Examples/blob/master/arduinoBLEperipheral/sensorExample/sensorExample.ino

*/
/* global startPage, deviceList, refreshButton */
/* global connectedPage, sensorValue, disconnectButton */
/* global ble  */
/* jshint browser: true , devel: true*/
'use strict';

// BLE service details
var sensor = {
    service: '19b10000-e8f2-537e-4f6c-d104768a1214',
    value: '19b10001-e8f2-537e-4f6c-d104768a1214'
};


var luma = {
    service: "19b10010e8f2537e4f6cd104768a1214",
    switchCharacteristic: "19b10011e8f2537e4f6cd104768a1214",
    buttonCharacteristic: "19b10012e8f2537e4f6cd104768a1214"

};


var thisLuma = {
cha : '',
ser : '',
dev : '',
val: 0
};

var onConnectData = {

    id : '',
    service : '',
    characteristic : ''
}

var firebaseRef = {};


var firebase = {

    initialize: function(){
        this.firebaseRef = new Firebase('https://scorching-inferno-6591.firebaseio.com/');
        this.sendData();
        },

        sendData: function(){

            this.firebaseRef.set({
                title: "Hello World!",
                author: "Firebase",
                location: {
                city: "San Francisco",
                state: "California",
                zip: 94103
                }
                });

            window.setTimeout(this.retrieveData, 2000);

        },

        retrieveData: function(){

                this.firebaseRef.child("location/city").on("value", function(snapshot) {
                    console.log(snapshot.val()); // Alerts "San Francisco"
                    });
        }
};


var app = {

    initialize: function() {
        this.bindEvents(); //binding event listeners to DOM in the app
        connectedPage.hidden = true; //hides the HTML elements for the second page

        // firebaseRef = new Firebase('https://scorching-inferno-6591.firebaseio.com/');
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false); //runs onDeviceReady function whenever the device is ready (loaded)
        refreshButton.addEventListener('touchstart', this.refreshDeviceList, false); //on touch of the Refresh button, runs refreshDeviceList function
        deviceList.addEventListener('touchstart', this.connect, false); //on touch of device list, connect to device
        disconnectButton.addEventListener('touchstart', this.disconnect, false);
        writeData.addEventListener('touchstart', this.write, false);
    },

    onDeviceReady: function() {
        console.log("device ready");
        app.refreshDeviceList();

        /*firebaseRef.set({
                title: "Hello World!",
                author: "Luma",
                location: {
                city: "NYC",
                state: "New York",
                zip: 10003
                }
                });*/
    },

    refreshDeviceList: function() {

        console.log("Touch triggered");
        console.log(luma.service);
        deviceList.innerHTML = ''; // empties the list
        // scan for devices with the sensor service
        // ble.scan([luma.service], 5, app.onDiscoverDevice, app.onError);
        ble.scan([], 5, this.onDiscoverDevice, app.onError);

        
    },

    onDiscoverDevice: function(device) {
        //creates a HTML element to display in the app
        console.log(device.name);
        var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' + 'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' + device.id;
        listItem.innerHTML = html;
        listItem.dataset.deviceId = device.id; //save the device ID in the DOM element
        listItem.setAttribute("class", "result"); //give the element a class for css purposes
        deviceList.appendChild(listItem); //attach it in the HTML element called deviceList


        /*firebaseRef.child("location/city").on("value", function(snapshot) {
            console.log(snapshot.val()); // Alerts "San Francisco"
        });*/
    },

    connect: function(e) {
        //get the device ID from the DOM element
        console.log(e);
        console.log(e.target);
        console.log(e.target.dataset);
        console.log(e.target.dataset.deviceId);
        this.deviceId = e.target.dataset.deviceId,

            this.onConnect = function(data) {
                // subscribe for incoming data
                console.log(data);
                console.log("Inside");
                console.log(e.target.dataset.deviceId);
                sensorValue.innerHTML = "Waiting for data";
                console.log(luma.service);
                console.log(luma.buttonCharacteristic);
                    

                        console.log("Peripheral is connected");
                        
                        // ble.startNotification(e.target.dataset.deviceId, luma.service, luma.buttonCharacteristic, app.onData, app.onError);
                        // //saves device ID to disconnect button - needed later for disconnect function
                        disconnectButton.dataset.deviceId = e.target.dataset.deviceId;

                        sensorValue.innerHTML = "Waiting for data";

                        // //show next page
                        app.showConnectPage();


                        onConnectData.id = data.id;
                        onConnectData.service = data.services[0];
                        onConnectData.characteristic = data.characteristics[0].characteristic;
                        
                        app.notification(data);
                
            };

        //connect functions asks for the device id, a callback function for
        // when succeeds and one error functions for when it fails
        ble.connect(this.deviceId, this.onConnect, app.onError);
    },

    notification: function(data){
        console.log("notification");
        console.log(data);
        console.log('dataID - '+ data.id);
        console.log('dataServices - '+ data.services[0]);
        console.log('dataCharacteristics - '+ data.characteristics[1].characteristic);
        // var dId  = devId.replace(/-/g , "");
        // console.log(dId);
        thisLuma.dev = data.id;
        thisLuma.ser = data.services[0];
        thisLuma.cha = data.characteristics[0].characteristic;
        ble.startNotification(data.id, data.services[0], data.characteristics[1].characteristic, app.onData, app.onError);

        // ble.write(data.id, data.services[0], data.characteristics[0].characteristic, 1, app.onData, app.onError);
    },

    connected : function(deviceId) {
                // subscribe for incoming data
                console.log("Inside");
                console.log(deviceId);

                ble.isConnected(
                    deviceId,
                    function() {
                        console.log("Peripheral is connected");
                    },
                    function() {
                        console.log("Peripheral is *not* connected");
                    }
                );
                // ble.read(deviceId, luma.service, luma.buttonCharacteristic, app.onData, app.onError);
                //ble.startNotification(deviceId, luma.service, luma.buttonCharacteristic, app.onData, app.onError);
                // //saves device ID to disconnect button - needed later for disconnect function
                //disconnectButton.dataset.deviceId = deviceId;

                // sensorValue.innerHTML = "Waiting for data";

                // //show next page
                // app.showConnectPage();
            },

    onData: function(buffer) { // data received from Arduino
        // Create typed array from the ArrayBuffer
        console.log('Buffer data-', buffer);
        var data = new Uint8Array(buffer);
        // get the integer value and set into the UI
        console.log(data);
        console.log(data[0]);
        sensorValue.innerHTML = data[0];
    },

    disconnect: function(event) {
        //gets device ID from disconnect button
        var deviceId = event.target.dataset.deviceId;
        ble.disconnect(deviceId, app.showStartPage, app.onError);
    },


    write: function(event) {
            
        var success = function() {
            console.log("success");
            // resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
            // resultDiv.scrollTop = resultDiv.scrollHeight;
        };
        
        var failure = function() {
            console.log("Failed writing data to the nano le");
        };

        // var message = "\0".charCodeAt(0);
        // var message = app.stringToBytes(messageInput.value);

        console.log('event.target - ',event.target);
        console.log('messageInput.value - ',messageInput.value);

        var message = app.stringToBytes("\0");
        
        if(messageInput.value == '0'){
            message = app.stringToBytes("\0");
        }
        else if(messageInput.value == '1'){
            message = app.stringToBytes("\x01");
        }
        else{
            
            message = app.stringToBytes("\0");
        }
        // var message = app.stringToBytes("\0");
        console.log('message - ',message);
        var deviceId = event.target.dataset.deviceId;
        console.log('deviceId - ',deviceId);

        var reverse = new Uint8Array(message);
            console.log('reverse buffer string');
            console.log(reverse);

            console.log('data.id - ',onConnectData.id);
            console.log('data.services - ',onConnectData.service);
            console.log('data.characteristics[0].characteristic - ',onConnectData.characteristic);
        // ble.startNotification(data.id, data.services[0], data.characteristics[1].characteristic, app.onData, app.onError);
        ble.write(onConnectData.id, onConnectData.service, onConnectData.characteristic, message,success,failure);

        
    },

    stringToBytes: function (string) {
        console.log('String -',string);
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    console.log('Array -',array);
    console.log('Array.buffer -',array.buffer);
    return array.buffer;
    },

    showStartPage: function() {
        startPage.hidden = false;
        connectedPage.hidden = true;
    },

    showConnectPage: function() {
        startPage.hidden = true;
        connectedPage.hidden = false;
    },

    onError: function(reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    }
};

app.initialize();
// firebase.initialize();
