define(function (require) {
    var purch = require('purchase');
	purch.purchaseProduct();
	console.log(purch);
	console.log('inhoud module1');
    return function () {};
});

/*
dit is hetzelfde alsof je het onderstaande zou schrijven

define(['require'], function(require) {
	var purch = require('purchase');
	purch.purchaseProduct();
	
	return function() {};
});
*/