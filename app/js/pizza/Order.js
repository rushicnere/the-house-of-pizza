'use strict';

app.service('Order', function ($rootScope, $http, $location) {
	var self = {};

	self.total = 0; // total of all ordered pizzas
	self.time = 0;  // delivered time after purchase
	self.discount = 0;
	self.discountLevel = 10; // % level of discount
	self.discountForTotalMoreThan = 200; // order higher than this get discountLevel
	self.discountMessage = false;  // show discount message
	self.cart = [];
	self.user = {};

	self.add = function (pizza) {
		self.time = 0;
		var newPizza = true;
		for (var i = 0; i < self.cart.length; i++) {
			if (self.cart[i].pizza.id == pizza.id) {
				self.cart[i].count += 1;
				newPizza = false;
			}
		}
		if (newPizza) {
			self.cart.push({
				"count": 1,
				"pizza": pizza
			});
		}
		self.total += pizza.price;
		if (self.total >= self.discountForTotalMoreThan) {
			if (self.discount === 0) {
				self.discountMessage = true;
			}
			self.discount = self.discountLevel;
		}
	};

	self.remove = function (index) {
		self.total -= self.cart[index].count * self.cart[index].pizza.price;
		self.cart.splice(index, 1);
		if (self.total < self.discountForTotalMoreThan) {
			self.discount = 0;
			self.discountMessage = false;
		}
	};

	self.clear = function () {
		self.total = 0;
		self.discount = 0;
		self.discountMessage = false;
		self.time = 0;
		self.cart = [];
	};

	self.purchase = function () {
		if (self.cart.length) {
			$http.post('server/order.json', {
				user: self.user,
				cart: self.cart
			}).success(function(data) {
				self.clear();
				self.time = data.time;
			});
		}
		self.clear();//this is added as local web server is not returning the response
		self.time = '60';//this is added as local web server is not returning the response
	};

	//Commented below function as it restricts the values to be changed on page refresh
    //as local storage doesn't change after normal refresh.
    // It changes on hard refresh or on emptying cache.

    //createPersistentProperty('cart', 'fmCart', Array);
	//createPersistentProperty('total', 'fmTotal', Number);

	// function createPersistentProperty(localName, storageName, Type) {
	// 	var json = localStorage[storageName];
    //
	// 	self[localName] = json ? JSON.parse(json) : new Type;
    //
	// 	$rootScope.$watch(
	// 		function () {
	// 			return self[localName];
	// 		},
	// 		function (value) {
	// 			localStorage[storageName] = JSON.stringify(value);
	// 		},
	// 		true
	// 	);
	// }

	return self;
});