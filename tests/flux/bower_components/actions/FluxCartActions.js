define(function(require) {
	var AppDispatcher = require('AppDispatcher');
	var FluxCartConstants = require('FluxCartConstants');
	
	var FluxCartActions = {
		receiveProduct: function(data) {
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.RECEIVE_DATA,
				data: data
			});
		},
		selectProduct: function(index) {
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.SELECT_PRODUCT,
				data: index
			});
		},
		addToCart: function(sku, update) {
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.CART_ADD,
				sku: sku,
				update: update
			});
		},
		removeFromCart: function(sku) {
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.CART_REMOVE,
				sku: sku
			});
		},
		updateCartVisible: function(cartVisible) {
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.CART_VISIBLE,
				cartVisible: cartVisible
			});
		}
	};
	
	return FluxCartActions;
});