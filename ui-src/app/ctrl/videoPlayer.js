angular.module('MainApp')
.controller('VideoPlayerCtrl',
  ['$scope', '$rootScope', '$state', 'VideoPlayerService', '$stateParams', '$http', '$filter',
	function ($scope, $rootScope, $state, VideoPlayerService, $stateParams, $http, $filter) {

      VideoPlayerService.search(function (result) {
        console.log(result);
          $scope.videoplaylist = result;
      });

      $scope.add = function () {
        $state.go("index.addVideo");
      }

      $scope.delete = function (id) {
        console.log(id);
        VideoPlayerService.deletevideo(id, function (result) {
          alert('video deleted from playlist');
          $state.go("index.getPlaylist");
        })
      }
	}
  ]);
