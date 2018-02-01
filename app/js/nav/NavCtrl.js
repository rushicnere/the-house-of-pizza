'use strict';

//The controller below is coded for navigation bar on the web app.
app.controller('NavCtrl', function ($scope, $location) {
	$scope.routeIs = function (routeName) {
		return $location.path() === routeName;
	};
});