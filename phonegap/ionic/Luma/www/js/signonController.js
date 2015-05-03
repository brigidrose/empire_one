angular.module('signonSlider.controller', [])




.controller('SlideController', function($scope,$state,$log,Slides) {
    
	
    $scope.myActiveSlide = 0;

    $scope.slide = Slides.all();

    $scope.slideHasChanged = function(slideNum){

    
		
	/*var slideNums = {
	0 : Slides.slide0(),
	1 : Slides.slide1()

    };
	
		console.log(slideNum);
		if(slideNum<2){
			$scope.slide = slideNums[slideNum];

		}*/
    };
})


.controller('WaitCntrl', function($scope,$state, $stateParams,$timeout ,$interval,BLE) {

    var intter = $timeout(function(){

        console.log('timeout triggered');
        // $state.go('location1');

        console.log($stateParams.deviceId);

        var device = "04A8FC31-D542-0C5B-5EFF-067B1AAC8081";
        // var device = "04A8FC31D5420C5B5EFF067B1AAC8081";



        // BLE.connect('04A8FC31-D542-0C5B-5EFF-067B1AAC8081').then(
          // BLE.connect(device).then(
            BLE.connect($stateParams.deviceId).then(
          function(peripheral) {
              // $scope.device = peripheral;
              console.log('peripheral',peripheral);

              $state.go('location1');

              /*if(peripheral.id == '04A8FC31-D542-0C5B-5EFF-067B1AAC8081'){
                  //$state.go('connect4');
                  // $interval.cancel(intter);
                  $state.go('location1');
                }

                else{

                  console.log("Device not connected");
                    //$state.go('connect4');
                    // $state.go('location1');
                }*/
          }
      );

        

    }, 2000);







})

.controller('BLECntrl', function($scope, BLE) {

  // keep a reference since devices will be added
  $scope.devices = BLE.devices;

  console.log('connected');

    console.log("BLE",BLE);
    console.log("BLE",BLE.devices);
    console.log("ble",ble);


  var success = function (device) {
    console.log("success");
    console.log(device);
      if ($scope.devices.length < 1) {
          // a better solution would be to update a status message rather than an alert
          console.log("Didn't find any Bluetooth Low Energy devices.");
      }
  };

  var failure = function (error) {
      console.log(error);
  };

  // pull to refresh
  $scope.onRefresh = function() {
    console.log("refresh");
      BLE.scan().then(
          success, failure
      ).finally(
          function() {
            console.log("refresh complete");
              $scope.$broadcast('scroll.refreshComplete');
          })
  }

  //$scope.onRefresh;

  // initial scan
  BLE.scan().then(success, failure);

  // ble.scan([],5,success,failure);

})

/*.controller('BLECntrl', function($scope,$state,$q,BLE) {


    console.log('connected');

    // $scope.devices = BLE.devices;

    console.log("BLE",BLE);
    console.log("BLE",BLE.devices);

    ble.isEnabled(
        function() {
            console.log("Bluetooth is enabled");
        },
        function() {
            console.log("Bluetooth is *not* enabled");
            // alert("Bluetooth is *not* enabled");
        }
    );



    devices = [];
    var connected;

    function scan() {

        console.log("Started scan");
        var that = this;
        var deferred = $q.defer();

        that.devices.length = 0;

        // disconnect the connected device (hack, device should disconnect when leaving detail page)
        if (connected) {
            console.log("connected");
            var id = connected.id;
            ble.disconnect(connected.id, function() {
                console.log("Disconnected " + id);
            });
            connected = null;
        }

        // ble.startScan([],
        //     function(peripheral){
        //         console.log('peripheral',peripheral);
        //         that.devices.push(peripheral);
        //     },
        //     function(error){
        //         console.log('error',error);
        //         deferred.reject(error);
        //     });


        ble.scan([],5,success,failure);

        var success = function(){

            console.log("success");

        }

        var failure = function(){
            console.log("failure");
        }


        $scope.onRefresh = function() {

            console.log("refreshed");
      
            BLE.scan().then(
              success, failure
          ).finally(
              function() {
                $scope.blue = BLE.devices;
                  $scope.$broadcast('scroll.refreshComplete');
              }
          )
  }

        // stop scan after 5 seconds
        // setTimeout(ble.stopScan, 5000,
        //     function() {
        //         deferred.resolve();
        //     },
        //     function() {
        //         console.log("stopScan failed");
        //         deferred.reject("Error stopping scan");
        //     }
        // );

        return deferred.promise;
    }


    scan();







    $scope.devices = BLE.devices;

  /*var success = function () {
    console.log($scope.devices);
      if ($scope.devices.length < 1) {
          // a better solution would be to update a status message rather than an alert
          console.log("Didn't find any Bluetooth Low Energy devices.");
      }
  };

  var failure = function (error) {
      console.log(error);
  };

  // pull to refresh
  $scope.onRefresh = function() {
    console.log('onRefresh called');
      
      BLE.scan().then(
          success, failure
      ).finally(
          function() {
            console.log('onRefresh finally');
            $scope.devices = BLE.devices;
            $scope.$broadcast('scroll.refreshComplete');
          }
      )
  }

  // initial scan
  BLE.scan().then(success, failure);

    
})*/


.controller('location1Cntrl', function($scope,$state,Connect) {

    $scope.connect = Connect.all();

    console.log("inside location 1");

    $scope.getLocation = function() {

        navigator.geolocation.getCurrentPosition(function(position) {
            
            console.log("position",position);
            $state.go('connect4');
          //$ionicLoading.hide();
        },

        function(error){
            console.log("Location error", error);
        }
        );

    };


})


.controller('story1Cntrl', function($scope,$state,Connect,localStorageService) {

    $scope.connect = Connect.all();



    console.log("inside story 1");

    $scope.setText = function() {

        $state.go('story2');

    };


    $scope.onChange = function(value){

      console.log($scope.StoryName);

      var saved = submit("StoryName",$scope.StoryName);

      console.log(saved);

    };


    function submit(key, val) {
      return localStorageService.set(key, val);
  }


})


.controller('story2Cntrl', function($scope,$state,Connect) {

    $scope.connect = Connect.all();

    console.log("inside story 2");

    $scope.selectImage = function() {

        $state.go('story3');

    };


})


.controller('allstories1Cntrl', function($scope,$state,$ionicTabsDelegate,$timeout,Connect,localStorageService) {

    $scope.connect = Connect.all();

    $scope.selectTabWithIndex = function(index) {
      $ionicTabsDelegate.select(index);
  };

    $scope.selectTabWithIndex(0);
    $ionicTabsDelegate.select(0);

    // $ionicTabsDelegate.select(0);


    var image = getItem("Image");
    var text = getItem("StoryName");

    console.log(image);
    console.log(text);

    $scope.libraryImage = "data:image/jpeg;base64," + image;

    $scope.StoryTitle =  text;

    
    // var message = stringToBytes("\x01");
    var message = stringToBytes("\0");



    ble.write("04A8FC31-D542-0C5B-5EFF-067B1AAC8081","19B10010-E8F2-537E-4F6C-D104768A1214","19B10011-E8F2-537E-4F6C-D104768A1214",message);


    $timeout(function(){

              message = app.stringToBytes("\x01");
              ble.write("04A8FC31-D542-0C5B-5EFF-067B1AAC8081","19B10010-E8F2-537E-4F6C-D104768A1214","19B10011-E8F2-537E-4F6C-D104768A1214",message);

              }, 3000);

    


    function getItem(key) {
   return localStorageService.get(key);
  }


  function stringToBytes(string) {
        console.log('String -',string);
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    console.log('Array -',array);
    console.log('Array.buffer -',array.buffer);
    return array.buffer;
    }

})

.controller('allstories2Cntrl', function($scope,$state,Connect) {

    $scope.connect = Connect.all();

})


.controller('camera1Cntrl', function($scope,$state,Connect,localStorageService) {

    $scope.connect = Connect.all();

    console.log("inside story 3");

$scope.getCamera = function() {

    console.log("getCamera");


    navigator.camera.getPicture(function(imageData){

        // console.log("imageData");
        // console.log(imageData);

        console.log("saved");

        var saved = submit("Image",imageData);
        console.log(saved);

        var imageAgain = getItem("Image");
        // console.log(imageAgain);
        $state.go('allstories1');

        /*console.log(saved);
        if(saved){
          $state.go('allstories1');
        }*/


    },

    function(error){

        console.log(error);
    },

    { quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
    }

    );


    function submit(key, val) {
     return localStorageService.set(key, val);
    }

    function getItem(key) {
   return localStorageService.get(key);
  }

/*    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        console.log("success");
        console.log(imageData);
        //var image = document.getElementById('myImage');
        //image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        console.log('Failed because: ' + message);
    }*/

}
    


})



.controller('connect4Cntrl', function($scope,$state,Connect) {

    $scope.connect = Connect.all();

    console.log("inside connect 4");

    console.log($scope.pin);

    $scope.onChange = function(value){

        $state.go('story1');

        // console.log(value);
        console.log($scope.pin);

        if($scope.pin.toString.length == 4){

            if($scope.pin == 1234){
            console.log("match");
            // console.log(value);
            $state.go('story1');

            }

            else{

                console.log($scope.pin , "no matches");

            }    
        }

        

    };



})


//.controller('connectCntrl', function($scope,$state,$log,$ionicLoading,Connect, BLE) {
.controller('connectCntrl', function($scope,$state,$interval,$timeout,Connect,BLE) {

	$scope.connect = Connect.all();

    var setInterval = false;


    ble.isEnabled(
        function() {
            console.log("Bluetooth is enabled");
            



            $timeout(function(){

              // $state.go('connect3');
              $state.go('connect2');

              }, 2000);





            // $state.go('location1');
        },
        function() {
            console.log("Bluetooth is *not* enabled");
            setInterval = true;
            doInterval();
            // alert("Bluetooth is *not* enabled");
        }
    );



function doInterval(){

if(setInterval){

    var interval = $interval(function(){

        ble.isEnabled(
        function() {
            console.log("Bluetooth is enabled");
            $interval.cancel(interval);
            $state.go('connect2');
            // $state.go('connect3');
        },
        function() {
            console.log("Bluetooth is *not* enabled");
            // alert("Bluetooth is *not* enabled");
        }
    );

    }, 2000);

}
}
	/*console.log('connected');

    // $scope.devices = BLE.devices;

    console.log("BLE",BLE);
    console.log("BLE",BLE.devices);



    $scope.devices = BLE.devices;

  var success = function () {
    console.log($scope.devices);
      if ($scope.devices.length < 1) {
          // a better solution would be to update a status message rather than an alert
          console.log("Didn't find any Bluetooth Low Energy devices.");
      }
  };

  var failure = function (error) {
      console.log(error);
  };

  // pull to refresh
  $scope.onRefresh = function() {
    console.log('onRefresh called');
      
      BLE.scan().then(
          success, failure
      ).finally(
          function() {
            console.log('onRefresh finally');
            $scope.devices = BLE.devices;
            $scope.$broadcast('scroll.refreshComplete');
          }
      )
  }

  // initial scan
  BLE.scan().then(success, failure);
  */

	/*$scope.$on('$ionicView.enter', function(){


		var app = {


			initialize: function() {

        	console.log('initialized');
        	this.bindEvents();
 		},

 		bindEvents: function() {
 		console.log('binded');
 		this.onDeviceReady();
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    
    	},

    	onDeviceReady: function() {
    		console.log('deviceready');

    		ble.scan([], 5, app.onDiscoverDevice, app.onError);
    	},

    	onDiscoverDevice: function(device) {
        //creates a HTML element to display in the app

        	console.log('discovered');
        	console.log(device.name);

    },




		}

		// app.initialize();

    	
  });*/

	
});