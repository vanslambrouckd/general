define('FluxCartConstants', ['require', 'keyMirror'], function(require, keyMirror) {
	console.log(keyMirror);
	
	return keyMirror({
		CART_ADD: null,
		CART_REMOVE: null,
		CART_VISIBLE: null,
		SET_SELECTED: null,
		SELECT_PRODUCT: null,
		RECEIVE_DATA: null
	});	
});