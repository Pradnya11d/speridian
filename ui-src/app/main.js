angular.module('MainApp', ['ui.router']).config(config).run(run);

function config($stateProvider, $urlRouterProvider){
	console.log("i get here in states!!!");

	$stateProvider
	.state('index', {
		url: '/',
		views: {
			'': {
					templateUrl: 'app.html',
				},
				'top@index': {
					templateUrl: 'topbar.html',
				},
				'side@index': {
					templateUrl: 'sidebar.html'
				},
				'content@index': {
					templateUrl: 'content.html'
				}
		}
	})
		.state('index.getPlaylist', {
			url: '/getPlaylist',
			templateUrl : 'playlist.html',
			controller : 'VideoPlayerCtrl'
		})
		.state('index.addPlaylist', {
			url: '/addPlaylist',
			templateUrl : 'addVideoToPlaylist.html',
			controller : 'AddVideoCtrl'
		})
		.state('index.deletevideo', {
			url: '/deletevideo'
		})
};

function run($rootScope, $state, $location){
	console.log('I get inside run run !!!');
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log('Main.run|||| toState:'+toState+'::::fromState:'+fromState);
	});
}
