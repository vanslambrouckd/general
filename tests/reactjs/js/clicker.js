var Clicker = React.createClass({
	getInitialState: function() {
		return { count: 0 };
	},
	handleClick: function() {
		this.setState({ count: this.state.count + 1 });
	},
	render: function() {
		return React.DOM.a(
			{ onClick: this.handleClick },
			'You have clicked ' + this.state.count + ' times'
		);
	}
});

React.render(Clicker(), document.getElementById('content'));