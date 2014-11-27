define(function(require) {
	var AppDispatcher = require('AppDispatcher');
	var EventEmitter = require('EventEmitter/EventEmitter');
	var FluxConstants = require('FluxCartConstants');
	
	var _products = {};
	var _cartVisible = false;
	
	function add(sku, update) {
		update.quantity = sku in _products ? _products[sku].quantity+1:1;
		_products[sku] = _.extend({}, _products[sku], update);		
	}
	
	function setCartVisible(cartVisible) {
		_cartVisible = cartVisible;
	}
	
	function removeItem(sku) {
		delete _products[sku];
	}
	
	var CartStore = _.extend({}, EventEmitter.prototype, {
		getCartItems: function() {
			return _products;
		},
		
		getCartCount: function() {
			return Object.keys(_products).length;
		},
		getCartTotal: function() {
			var total = 0;
			for (product in _products) {
				if (_products.hasOwnProperty(product)) {
					total += _products[product].price * _products[product].quantity;
				}
			}
			
			return total.toFixed(2);
		},
		getCartVisible: function() {
			return _cartVisible;
		},
		emitChange: function() {
			this.emit('change');
		},
		addChangeListener: function(callback) {
			this.on('change', callback);
		},
		removeChangeListener: function(callback) {
			this.removeListener('change', callback);
		}
	});
	
	AppDispatcher.register(function(payload) {
		var action = payload.action;
		var text;
		
		switch(action.actionType) {
			case FluxCartConstants.CART_ADD:
				add(action.sku, action.update);
				break;
			
			case FluxCartConstants.CART_VISIBLE:
				setCartVisible(action.cartVisible);
				break;
			
			case FluxCartConstants.CART_REMOVE:
				removeItem(action.sku);
				break;
			
			default:
				return true;
		}
		
		CartStore.emitChange();
		return true;
	});
	
	return CartStore;
});
