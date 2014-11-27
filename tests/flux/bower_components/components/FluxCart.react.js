define(function(require) {
	var React = require('react');
	var FluxCartActions = require('../actions/FluxCartActions');
	
	var FluxCart = React.createClass({
		removeFromCart: function(sku) {
			FluxCartActions.removeFromCart(sku);
			FluxCartActions.updateCartVisible(false);
		},
		render: function() {
			var self = this;
			var products = this.props.products;
			return (
				<div className={"flux-cart " + (this.props.visible ? 'active' : '') }>
					CART
					<div className="mini-cart">
						<button type="button" className="close-cart" onClick={this.closeCart}>x</button>
						<ul>
						{Object.keys(products).map(function(product){
							return (
							<li key={product}>
							<h1 className="name">{products[product].name}</h1>
							<p className="type">{products[product].type} x {products[product].quantity}</p>
							<p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
							<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
							</li>
							)
						})}
						</ul>
					</div>
				</div>
			);
		}
	});
	
	return FluxCart;
});