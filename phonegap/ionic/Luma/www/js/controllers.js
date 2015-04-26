angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})


.controller('SignOnCtrl', function($scope,$state,$log,SignOn) {
  //$scope.signon = SignOn.all();
  $scope.$log = $log;
  $scope.signon = SignOn.all();

  $scope.onSwipeLeft = function(index) {
        console.log('swiped');
        $state.go('signon2');
    };

  /*$scope.onSwipeLeft = function() {
        console.log('swiped');
        $state.go('signon2');
    };*/
})


.controller('SignOnCtrl2', function($scope,$log ,SignOn) {
  console.log("in signon2");
})

/*.controller('onSwipeLeft', function($scope,$log ,SignOn) {
  //$scope.signon = SignOn.all();
  $scope.$log = $log;
  $scope.signon = SignOn.all();
})*/

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});











