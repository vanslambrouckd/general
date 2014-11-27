define(function(require) {
	var React = require('react');
	var cartStore = require('../stores/CartStore');
	var ProductStore = require('../stores/ProductStore');
	var FluxProduct = require('jsx!./FluxProduct.react');
	
	function getCartState() {
		console.log(ProductStore.getProduct());		
		return {
			product: ProductStore.getProduct(),
			selectedProduct: ProductStore.getSelected()
		}
	}
	
	var FluxCartApp = React.createClass({
		getInitialState: function() {
			return getCartState();
		},
		componentDidMount: function() {
			/* wordt bij init 1 keer uitgevoerd */
			ProductStore.addChangeListener(this._onChange);
		},
		componentWillUnmout: function() {
			ProductStore.removeChangeListener(this._onChange);
		},
		_onChange: function() {
			this.setState(getCartState());
		},
		render: function() {
			return (
				<div className="flux-cart-app">
					<FluxProduct product={this.state.product} selected={this.state.selectedProduct} />
				</div>
			);
		}
	});
	
	return FluxCartApp;
});