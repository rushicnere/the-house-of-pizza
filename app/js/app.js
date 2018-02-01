'use strict';

var app = angular.module('houseofpizza', ['ngRoute', 'ngResource']);

//The code block below sets which html to load on respective routes with controllers defined for each route.
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/pizza/pizza.html',
			controller: 'PizzaCtrl'
		})
		.when('/purchase', {
			templateUrl: 'js/purchase/purchase.html',
			controller: 'PurchaseCtrl'
		})
		.when('/about-me', {
			templateUrl: 'js/nav/about-me.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});