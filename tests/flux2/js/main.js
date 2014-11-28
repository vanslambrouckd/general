/*
paths: {
	key: val
}

key komt overeen met de naam waarmee je een require kan doen voor de module

stel dat je:
paths: {
	reactmodule: '../bower_components/react/react-with-addons'
}

dan moet je in een module reqact laden via require('reactmodule');
*/
require.config({
	baseUrl: 'js/',
    deps: ["main"],
    paths: {
		React: '../bower_components/react/react-with-addons',
        jsx: "../bower_components/requirejs-jsx/jsx",
        JSXTransformer: '../bower_components/react/JSXTransformer'
    },

    shim: {
        JSXTransformer: {
            exports: "JSXTransformer"
        },
    }
});


require(['jsx!app'], function (App) {
	//App.debug();
	console.log(App);
});