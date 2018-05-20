angular.module('MainApp')
.controller('AddVideoCtrl',
  ['$scope', '$rootScope', '$state', 'VideoPlayerService', '$timeout',
	function ($scope, $rootScope, $state, VideoPlayerService, $timeout) {

    $scope.submit = function () {
      VideoPlayerService.add($scope.addvideo, function (result) {
        alert('Video added to playlist');
        $state.go("index.getPlaylist");
      })
    }


}]);
