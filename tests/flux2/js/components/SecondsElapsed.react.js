/**
props = components configuratie, verkregen via bovenliggende component, onveranderbaar
state = verandert over tijd, een component veranderd enkel zijn eigen state (en niet die van child elements), bvb elemnt click: click nr is state
*/
define(function(require) {
	var React = require('React');
	
	var SecondsElapsed = React.createClass({
		getInitialState: function() {
			return { secondsElapsed: 0};
		},
		componentDidMount: function() {
			//wordt uitgevoerd bij init
			this.interval = setInterval(this.tick, 1000);
		},
		componentWillUnmout: function() {
			clearInterval(this.interval);
		},
		tick: function() {
			this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
		},
		render: function() {
			return (
				<div>Seconds elapsed: {this.state.secondsElapsed}</div>
			)
		}
	});
	
	return SecondsElapsed;
});