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


var app = {

    initialize: function() {
        this.bindEvents(); //binding event listeners to DOM in the app
        connectedPage.hidden = true; //hides the HTML elements for the second page
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false); //runs onDeviceReady function whenever the device is ready (loaded)
        refreshButton.addEventListener('touchstart', this.refreshDeviceList, false); //on touch of the Refresh button, runs refreshDeviceList function
        deviceList.addEventListener('touchstart', this.connect, false); //on touch of device list, connect to device
        disconnectButton.addEventListener('touchstart', this.disconnect, false);
        write.addEventListener('touchstart', this.write, false);
    },

    onDeviceReady: function() {
        app.refreshDeviceList();
    },

    refreshDeviceList: function() {

        console.log("Touch triggered");
        console.log(luma.service);
        deviceList.innerHTML = ''; // empties the list
        // scan for devices with the sensor service
        // ble.scan([luma.service], 5, app.onDiscoverDevice, app.onError);
        ble.scan([], 5, app.onDiscoverDevice, app.onError);
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

                        app.notification(data);

                /*ble.isConnected(
                    e.target.dataset.deviceId,
                    function() {
                        console.log("Peripheral is connected");
                        ble.startNotification(e.target.dataset.deviceId, luma.service, luma.buttonCharacteristic, app.onData, app.onError);
                        // //saves device ID to disconnect button - needed later for disconnect function
                        disconnectButton.dataset.deviceId = e.target.dataset.deviceId;

                        sensorValue.innerHTML = "Waiting for data";

                        // //show next page
                        app.showConnectPage();
                    },
                    function() {
                        console.log("Peripheral is *not* connected");
                    }
                );*/

                // ble.read(e.target.dataset.deviceId, luma.service, luma.buttonCharacteristic, app.onData, app.onError);
                

                
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
        var data = new Uint8Array(buffer);
        // get the integer value and set into the UI
        console.log(data);
        sensorValue.innerHTML = data[0];
    },

    disconnect: function(event) {
        //gets device ID from disconnect button
        var deviceId = event.target.dataset.deviceId;
        ble.disconnect(deviceId, app.showStartPage, app.onError);
    },

    write: function(event) {
        //gets device ID from disconnect button
        var deviceId = event.target.dataset.deviceId;
        console.log(event);
        console.log(event.target.dataset);
        console.log(event.target.dataset.deviceId);



        console.log('Again');
        console.log(thisLuma.dev);
        console.log(thisLuma.ser);
        console.log(thisLuma.cha);

        if (thisLuma.val == 0) {

            var va = (1).toString();
            var v = app.stringToBytes(va);
            ble.write(thisLuma.dev, thisLuma.ser, thisLuma.cha, v, app.onData, app.onError);
        }
        else if (thisLuma.val == 1) {
            var va = (0).toString();
            var v = app.stringToBytes(va);
            ble.write(thisLuma.dev, thisLuma.ser, thisLuma.cha, v, app.onData, app.onError);
        }
        
    },

    stringToBytes: function (string) {
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
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
