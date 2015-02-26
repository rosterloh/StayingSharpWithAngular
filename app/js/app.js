angular.module('NoteWrangler', ['ngRoute'])
	.config(function($routeProvider) {
    $routeProvider
    	.when('/notes', {
    		templateUrl: 'templates/pages/notes/index.html'
    	});
  });
