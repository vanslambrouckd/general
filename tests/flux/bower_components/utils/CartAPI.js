define(function(require) {
	var FluxCartActions = require('actions/FluxCartActions');

	return {
		getProductData: function() {
			var data = JSON.parse(localStorage.getItem('product'));
			FluxCartActions.receiveProduct(data);
		}
	}	
});