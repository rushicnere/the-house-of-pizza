'use strict';

app.controller('PizzaCtrl', function ($scope, Pizza, Order) {
	Pizza.query(function (data) {
		//console.log("data....", data);
		$scope.pizzaList = data;
	});
    //console.log("order----", order);
	$scope.order = Order;
});