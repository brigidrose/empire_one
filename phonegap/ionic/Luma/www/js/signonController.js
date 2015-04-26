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



.controller('connectCntrl', function($scope,$state,$log,$ionicLoading,Connect) {

	$scope.connect = Connect.all();

	console.log('connected');

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