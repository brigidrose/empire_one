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
    enterpin: {class:"enterpin", text:"Enter pin"},
    keyboard: {class:"keyboard", img:"img/connect/connect1/keyboard.png"},

    accesstolocation: {class:"accesstolocation", text:"Access to Location"},
    allowluma: {class:"allowluma", text:"To allow Luma to help you easily start stories from your necklace, you need to allow us to access to your location on the next screen"},
    locationdialogue: {class:"locationdialogue", img:"img/connect/location/location.png"},
    check1: {class:"check1", img:"img/connect/location/check.png"},
    check2: {class:"check2", img:"img/connect/location/check.png"},
    benefits: {class:"benefits", text:"Benefits to access to locations"},
    receivealerts: {class:"receivealerts", text:"Receive alerts to view stories on location. A lovely surprise!"},
    bundleimages: {class:"bundleimages", text:"Bundle images at a specific location. Tell your friends faster!"},
    grantpermission: {class:"grantpermission", text:"Grant Location Permission"},


    yourfirststory1: {class:"yourfiststory1", text:"Your First Story"},
    namespecialevent: {class:"namespecialevent", text:"Name a recent life special event"},
    eventtext: {class:"eventtext", text:""},
    storyoval: {class:"storyoval", img:"img/story/oval.png"},
    storyarrow: {class:"storyarrow", img:"img/story/arrow.png"},
    arrownext: {class:"arrownext", img:"img/story/next.png"},


    yourfirststory2: {class:"yourfiststory2", text:"Your First Story"},
    enrich1: {class:"enrich1", text:'Enrich "Our Honeymoon"'},
    enrich2: {class:"enrich2", text:'What would you like to add first'},
    ovalempty: {class:"ovalempty", img:"img/story/ovalEmpty.png"},
    imagestory: {class:"imagestory", img:"img/story/photoicon.png"},
    microphonestory: {class:"microphonestory", img:"img/story/audioicon.png"},
    textstory: {class:"textstory", img:"img/story/texticon.png"},
    videostory: {class:"videostory", img:"img/story/videoicon.png"},


    accesstocamera: {class:"accesstocamera", text:"Access to Camera"},
    enrichluma: {class:"enrichluma", text:"To enrich your stories with images, you need to allow us access to your images on the next screen"},
    cameradialogue: {class:"cameradialogue", img:"img/story/cameraDialogue.png"},
    check12: {class:"check12", img:"img/connect/location/check.png"},
    check22: {class:"check22", img:"img/connect/location/check.png"},
    benefits2: {class:"benefits2", text:"Benefits to access to camera"},
    uploadimages: {class:"uploadimages", text:"Upload images to your stories"},
    bundleimages2: {class:"bundleimages2", text:"Let us bundle all images taken at one place together, to draft a richer story"},
    grantpermission2: {class:"grantpermission2", text:"Grant Photo Permission"},


    allstories: {class:"allstories", text:"All Stories"},
    nearby: {class:"nearby", text:"Nearby"},
    drafts: {class:"drafts", text:"Drafts"},
    ourhoneymoon: {class:"ourhoneymoon", img:"img/story/OurHoneymoon.png"},


    userstory: {class:"userstory"},
    userstoryText: {class:"userstoryText"},
    userstoryPara: {class:"userstoryPara",text:"This is your first story ever recorded"},
    userstoryLocation: {class:"userstoryLocation"},
    


  }];


  return {
    all: function() {
      return info;
    }
  };
})


.factory('BLE', function($q) {

  var connected;

  return {

    devices: [],

    scan: function() {
        var that = this;
        var deferred = $q.defer();

        that.devices.length = 0;

        // disconnect the connected device (hack, device should disconnect when leaving detail page)
        if (connected) {
            var id = connected.id;
            ble.disconnect(connected.id, function() {
                console.log("Disconnected " + id);
            });
            connected = null;
        }

        ble.startScan([],  /* scan for all services */
            function(peripheral){
                that.devices.push(peripheral);
            },
            function(error){
                deferred.reject(error);
            });

        // stop scan after 5 seconds
        setTimeout(ble.stopScan, 5000,
            function() {
                deferred.resolve();
            },
            function() {
                console.log("stopScan failed");
                deferred.reject("Error stopping scan");
            }
        );

        return deferred.promise;
    },
    connect: function(deviceId) {
        var deferred = $q.defer();

        ble.connect(deviceId,
            function(peripheral) {
                connected = peripheral;
                deferred.resolve(peripheral);
            },
            function(reason) {
                deferred.reject(reason);
            }
        );

        return deferred.promise;
    }
  };
});