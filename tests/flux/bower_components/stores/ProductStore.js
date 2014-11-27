define(function(require) {
	var AppDispatcher = require('AppDispatcher');
	var EventEmitter = require('EventEmitter/EventEmitter');
	var FluxCartConstants = require('FluxCartConstants');
	/*
	var _ = require('../underscore');
	console.log(_);
	*/
	
	var _product = {};
	var _selected = null;
	
	function loadProductData(data) {
		_product = data[0];
		_selected = data[0].variants[0];
	}
	
	function setSelected(index) {
		_selected = _product.variants[index];
	}
	
	var ProductStore = _.extend({}, EventEmitter.prototype, {
		getProduct: function() {
			return _product;
		},
		
		getSelected: function() {
			return _selected;
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
	
	/*
	store registreert zich bij de dispatcher, zodat hij bij de juiste events van de dispatcher ontvangen, code kan uitvoeren
	*/
	AppDispatcher.register(function(payload) {
		var action = payload.action;
		var text;
		
		switch(action.actionType) {
			case FluxCartConstants.RECEIVE_DATA:
				loadProductData(action.data);
				break;
				
			case FluxCartConstants.SELECT_PRODUCT:
				setSelected(action.data);
				break;
			
			default:
				return true;
		}
		
		/*
		de store laat weten aan de dispatcher dat hij de events ontvangen heeft en het nodige gedaan heeft, 
		zodat de dispatcher de view kan verwitten (de view kan zich dan opnieuw renderen)
		*/
		ProductStore.emitChange();
		
		return true;
	});
	
	return ProductStore;
});