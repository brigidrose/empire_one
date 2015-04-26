angular.module('SignOn', ['ionic','signonSlider.controller','signonSlider.services','connect.services'])

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
    controller: 'connectCntrl'
  })

    .state('connect3', {
    url: "/connect3",
    templateUrl: 'templates/connect3.html',
    controller: 'connectCntrl'
  })

    .state('connect4', {
    url: "/connect4",
    templateUrl: 'templates/connect4.html',
    controller: 'connectCntrl'
  })

    .state('connect5', {
    url: "/connect5",
    templateUrl: 'templates/connect5.html',
    controller: 'connectCntrl'
  })
    ;

    $urlRouterProvider.otherwise('/slide/screen');
  });