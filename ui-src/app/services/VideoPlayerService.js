angular.module('MainApp')
	.factory('VideoPlayerService', ['$http', '$rootScope',
			function VideoPlayerService($http, $rootScope){
					var service = {};

					service.search = search;
					service.add = add;
					service.deletevideo = deletevideo;
					return service;

					function search(callback){
						var url = "/api/playlist/getPlaylist";
						$http.get(url)
							.then(function(response){
								callback(response.data);
							}, function(response){
								callback(false);
							});
					};

					function add(form, callback){
						var url = "";
						var config = {
							video: form.video
						}
						if(form)
							url = '/api/playlist/addPlaylist';
						else
							url = '/api/playlist/addPlaylist';
						$http.post(url, config)
							.then(function(response){
								callback(response.data);
							}, function(response){
								callback(false);
							});
					};

					function deletevideo(form, callback) {
						var url = "";
						if(form)
							url = '/api/playlist/deletevideo?id='+form;
						else
							url = '/api/playlist/deletevideo?id=';
						$http.get(url)
							.then(function(response){
								callback(response.data);
							}, function(response){
								callback(false);
							});
					}

		}
]);
