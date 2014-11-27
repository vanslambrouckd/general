/*
The Components framework is a collection of, well, components written in the CommonJS module format. The intended value of a module is simply assigned to a 'magic property' called module.export, intended to be provided by the JS runtime.

This is not the way that web JS runtimes work, as CommonJS modules make assumptions to a particular workflow. Without the ability to synchronously guarantee a file has loaded (or catastrophically fail when they don't), browsers cannot support the same workflow as standalone environments. Thus anything written in the CommonJS format must be wrapped to take that into account.

In order to use CommonJS modules with an AMD style module loader like RequireJS, you can either wrap the modules you need yourself or you can use the r.js build tool.
Manually wrapping a CommonJS module

define(function(require, exports, module) {
  //Put traditional CommonJS module content here
});

From: CommonJS Notes
Automatically wrapping with r.js

r.js -convert path/to/commonjs/modules path/to/converted/modules

Given that you have already installed r.js with npm -g i requirejs.

https://github.com/amdjs/amdjs-api/blob/master/AMD.md
module.exports is iets node.js specifiek
*/
/*
define(function(require) {
	var promise = require('es6-promise/promise');
	var flux = require('flux/dist/Flux');
	var React = require('react');
	var AppDispatcher = require('AppDispatcher');
	
	return function() {};
});
*/

/*
http://scotch.io/tutorials/javascript/creating-a-simple-shopping-cart-with-react-js-and-flux
*/
define(function(require) {
	var _ = require('underscore');
	
	var React = require('react');
	
	var ProductData = require('ProductData');
	var CartAPI = require('utils/CartAPI');
	var FluxCartApp = require('jsx!components/FluxCartApp.react');
	
	ProductData.init();
	CartAPI.getProductData();
	
	React.render(
	<FluxCartApp />,
	document.getElementById('app')
	);
		
	//var FluxCartConstants = require('FluxCartConstants');
	//var ProductStore = require('stores/ProductStore');
	//var CartStore = require('stores/CartStore');	
});
