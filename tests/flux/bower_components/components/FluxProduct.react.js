define(function(require) {
	var React = require('react');
	var FluxCartActions = require('../actions/FluxCartActions');
	
	var FluxProduct = React.createClass({
		addToCart: function(event) {
			console.log(this.props);
			var sku = this.props.selected.sku;
			var update = {
				name: this.props.product.name,
				type: this.props.selected.type,
				price: this.props.selected.price
			}
			
			FluxCartActions.addToCart(sku, update);
			FluxCartActions.updateCartVisible(true);
		},
		selectVariant: function(event) {
			console.log(event.target.value);
			FluxCartActions.selectProduct(event.target.value);
		},
		render: function() {
							 
			return (
				<div className="flux-product">
					<img src={'img/'+this.props.product.image} />
					<div className="flu-product-detail">
						<h1 className="name">{this.props.product.name}</h1>
						<select onChange={this.selectVariant}>
							{this.props.product.variants.map(function(variant, index) {
								return (
									<option key={index} value={index}>{variant.type}</option>
								)
							})}
						</select>
						<button type="button" onClick={this.addToCart}>Add to Cart</button>
					</div>
				</div>
			);
		}
	});
			
	return FluxProduct;
});