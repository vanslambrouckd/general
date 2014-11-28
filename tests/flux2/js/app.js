define(function(require) {
	var React = require('React');
	/*
	jsx! zorgt dat de html in de render functie van een react class juist omgezet wordt via requirejs-jsx
	*/	
	var HelloWorld = require('jsx!components/HelloWorld.react'); 
	
	var App = { naam: 'david' };	
	
	App.debug = function() {
		console.log(React);
		console.log(HelloWorld);
	}
	
	React.render(
	<HelloWorld name="david" />,
	document.getElementById('example1')
	);
	
	var SecondsElapsed = require('jsx!components/SecondsElapsed.react');
	
	React.render(
		<SecondsElapsed />, document.getElementById('example2')
	);
	
	return App;
});