/*
gebaseerd op
http://scotch.io/tutorials/javascript/creating-a-simple-shopping-cart-with-react-js-and-flux
*/
requirejs.config({
	paths: {
		'AppDispatcher': 'dispatcher/AppDispatcher',
		'react': 'react/react-with-addons',
		'JSXTransformer': 'react/JSXTransformer',
		'jsx' : 'requirejs-react-jsx/jsx'
	}	
});

require.config({
    deps: ["main"],

    paths: {
        jsx: "requirejs-jsx/jsx",
        JSXTransformer: 'react/JSXTransformer',
		underscore: 'underscore'
    },

    shim: {
        JSXTransformer: {
            exports: "JSXTransformer"
        }
    }
});

//require(["purchase", "es6-promise/promise.min", "flux/dist/Flux", 'flux-dispatcher/Dispatcher'],function(purchase, promise, flux, dispatcher){				  
																										   
//require gebruiken als je modules wil oproepen
//define gebruiken om module te maken
/*
require([naam] =>
naam = de naam van het bestand waarin de module gedefinieerd staat
*/

/*
require(['react', 'app'], function(React, app) {
	console.log(React);	
	var test = React.createClass({
		render: function() {
			return (
			  <div className="comment">
				<h2 className="commentAuthor">
				  
				</h2>
			  </div>
			)
		}
	});
});
*/

require(['jsx!app'], function (app) {
	//console.log(app);
});

/*

require(['react', 'JSXTransformer'], function(React, Transformer) {
	console.log(React);	
	console.log(Transformer);
	console.log(Transformer.transform('<div className="comment">{this.props.test}<h2 className="commentAuthor"></h2></div>'));
	
	var str = Transformer.transform('<div className="comment">{this.props.test}<h2 className="commentAuthor"></h2></div>');
	var HelloMessage = React.createClass({
		render: function() {
			return str;
		}
	});
		
	var test = React.createClass({
		render: function() {
			return ( 
			  <div className="comment">
				<h2 className="commentAuthor">
				  
				</h2>
			  </div>
			)
		}
	});	
})
*/