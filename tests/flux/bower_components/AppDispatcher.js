/**
david vansl
*/
define(function(require) {
	var flux = require('flux/dist/Flux');
	var Dispatcher = flux.Dispatcher;
	
	var AppDispatcher = new Dispatcher();
	
	AppDispatcher.handleViewAction = function(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action:action
		});
	}
	
	return AppDispatcher;
});