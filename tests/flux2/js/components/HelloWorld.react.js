define(function(require) {
	var React = require('React');
	
	var HelloWorld = React.createClass({
		render: function() {
			return <div>Hello {this.props.name}</div>;
		}
	});
	
	return HelloWorld;
});