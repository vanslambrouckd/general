define(function(require) {
	var AppDispatcher = require('AppDispatcher');
	//console.log(AppDispatcher);
	var FluxCartConstants = require('../constants/FluxCartConstants');
	console.log(FluxCartConstants);
	/*
	de AppDispatcher zend signaal uit naar alle stores,
	de stores die voor bepaald actionType geregistreerd hebben,
	voeren dan code uit en emitten een change event terug naar de dispatcher,
	zodat deze de view kan inlichten om up te daten
	*/
	var FluxCartActions = {
		receiveProduct: function(data) {
			//console.log(FluxCartConstants);
			//console.log(data);
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.RECEIVE_DATA,
				data: data
			});
		},
		selectProduct: function(index) {
			console.log('FluxCartActions => selectProduct');
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.SELECT_PRODUCT,
				data: index
			});
		},
		addToCart: function(sku, update) {
			console.log('FluxCartActions => addToCart');
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
			console.log('FluxCartActions => update cart visible');
			console.log(cartVisible);
			AppDispatcher.handleAction({
				actionType: FluxCartConstants.CART_VISIBLE,
				cartVisible: cartVisible
			});
		}
	};
	
	return FluxCartActions;
});