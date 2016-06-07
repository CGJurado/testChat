angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
    
    $scope.settings = {
        enableFriends: true
    };

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup) {
    var user = Ionic.User.current();

    if (user.isAuthenticated()) {
      // the user is already signed in
        $state.go('tab.dash');
    } else {
      // we need to show a login or sign up form
    }
    
    $scope.data = {};
    var authProvider = 'basic';
    var authSettings = { 'remember': true };
    
    var authSuccess = function(user) {
      // user was authenticated, you can get the authenticated user
      // with Ionic.User.current();
        $state.go('tab.dash');
    };

    var authFailure = function(errors) {
//        for (var err in errors) {
        // check the error and provide an appropriate message
        // for your application
        $scope.data.password = '';

        var alertPopup = $ionicPopup.alert({
            title: 'logIn failed!',
            template: 'Please check your credentials!'
        });
//        }
    };
 
    $scope.login = function() {
        Ionic.Auth.login(authProvider, authSettings, $scope.data).then(authSuccess, authFailure);
    }
    $scope.toRegister = function() {
        $state.go('register');
    }
})

.controller('registerCtrl', function($scope, $state, $ionicPopup) {
    $scope.data = {};
    
    var signupSuccess = function(user) {
      // user was authenticated, you can get the authenticated user
      // with Ionic.User.current();
        var alertPopup = $ionicPopup.alert({
            title: 'Registration Successfuly!',
            template: 'You can now Login!'
        });

        $state.go('login');
    };

    var signupFailure = function(errors) {
        $scope.data.password = '';

        var alertPopup = $ionicPopup.alert({
            title: 'Registration failed!',
            template: 'Please check your credentials!'
        });
    };
 
    $scope.register = function() {
        Ionic.Auth.signup($scope.data).then(signupSuccess, signupFailure);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state) {
    $scope.settings = {
        enableFriends: true
    };
    $scope.logOut = function(){
        Ionic.Auth.logout();
        $state.go('login');
    }    
});
