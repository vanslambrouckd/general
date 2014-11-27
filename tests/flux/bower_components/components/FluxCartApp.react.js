define(function(require) {
	var React = require('react');
	var cartStore = require('../stores/CartStore');
	var ProductStore = require('../stores/ProductStore');
	var FluxProduct = require('jsx!./FluxProduct.react');
	var FluxCart = require('jsx!./FluxCart.react');
	
	function getCartState() {
		return {
			product: ProductStore.getProduct(),
			selectedProduct: ProductStore.getSelected(),
			cartItems: cartStore.getCartItems(),
			cartVisible: cartStore.getCartVisible(),
			cartTotal: cartStore.getCartTotal(),
			cartCount: cartStore.getCartCount()
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
					<FluxCart products={this.state.cartItems} visible={this.state.visible} count={this.state.cartCount} total={this.state.cartTotal} />
					<FluxProduct product={this.state.product} selected={this.state.selectedProduct} />
				</div>
			)
		}
	});
	
	return FluxCartApp;
});