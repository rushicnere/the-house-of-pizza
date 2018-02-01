'use strict';

app.factory('Pizza', function ($resource) {
	return $resource('server/pizzas.json');
});