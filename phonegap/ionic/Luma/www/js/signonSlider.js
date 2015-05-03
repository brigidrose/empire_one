angular.module('SignOn', ['ionic','signonSlider.controller','signonSlider.services','connect.services','LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    /*ble.isEnabled(
        function() {
            console.log("Bluetooth is enabled");
        },
        function() {
            console.log("Bluetooth is *not* enabled");
            // alert("Bluetooth is *not* enabled");
        }
    );*/


  });
})

.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider

    .state('slide', {
    url: "/slide",
    abstract: true,
    templateUrl: 'templates/first.html'
    // controller: 'SlideController'
  })


    /*.state('slide.screen', {
    url: "/screen",
    templateUrl: 'templates/signOnSlider.html',
    controller: 'SlideController'
    
  })*/
  
  .state('slide.screen', {
    url: "/screen",
    views:{
      'slide-screen':{
        templateUrl: 'templates/signOnSlider.html',
        controller: 'SlideController'
      },
      'slide-buttons':{
        templateUrl: 'templates/signOnButtons.html',
        controller: 'SlideController'
      }
    }
    
  })

  .state('connect', {
    url: "/connect",
    templateUrl: 'templates/connect.html',
    controller: 'connectCntrl'
  })

    .state('connect2', {
    url: "/connect2",
    templateUrl: 'templates/connect2.html',
    controller: 'BLECntrl'
  })

    .state('connect3', {
    url: "/connect3/:deviceId",
    templateUrl: 'templates/connect3.html',
    controller: 'WaitCntrl'
  })


    .state('connect4', {
    url: "/connect4",
    templateUrl: 'templates/connect4.html',
    controller: 'connect4Cntrl'
  })


    .state('location1', {
    url: "/location1",
    templateUrl: 'templates/location1.html',
    controller: 'location1Cntrl'
  })


    .state('story1', {
    url: "/story1",
    templateUrl: 'templates/story1.html',
    controller: 'story1Cntrl'
  })

    .state('story2', {
    url: "/story2",
    templateUrl: 'templates/story2.html',
    controller: 'story2Cntrl'
  })


    .state('story3', {
    url: "/story3",
    templateUrl: 'templates/story3.html',
    controller: 'camera1Cntrl'
  })

    .state('allstories1', {
    url: "/allstories1",
    templateUrl: 'templates/allstories1.html',
    controller: 'allstories1Cntrl'
  })

    .state('allstories2', {
    url: "/allstories2",
    templateUrl: 'templates/allstories2.html',
    controller: 'allstories2Cntrl'
  })

    /*.state('connect4', {
    url: "/connect4",
    templateUrl: 'templates/connect4.html',
    controller: 'connectCntrl'
  })*/

    /*.state('connect5', {
    url: "/connect5",
    templateUrl: 'templates/connect5.html',
    controller: 'connectCntrl'
  })*/
    ;

    $urlRouterProvider.otherwise('/slide/screen');
  });