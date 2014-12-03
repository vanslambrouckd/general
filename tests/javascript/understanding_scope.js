/*
http://davidql.github.io/scope_talk/
for variable to be local it must be
1) declared with var
2) declared inside function
*/

function add(val1, val2) {
	var sum = val1 + val2;
	if (true) {
		var sum = 42;
	}

	return sum;
}

console.log(add(1,2)); //returns 42

//javascript => functional scope
function multiply(nr1, nr2) {
	/*
	anything inside is local
	*/
	var result = nr1 * nr2;
	return result;
}

console.log(multiply(2,3));

//self invoking function
(function() {
	/*
	this function runs the second it's encountered
	gives me a private scope on demand
	*/
})();

var epi1 = "Winter is coming";
if (true) {
	var epi1 = "Summer is coming";
}

console.log(epi1); //summer is coming

var movie = "rambo";
(function() {
	var movie2 = "rocky";
})();

//console.log(movie2); //movie2 is undefined, want local var in self envoking function

var epi3 = "lord snow";
function printName(epi3) {
	console.log(epi3);
}

printName('A golden crown'); //a golden crown: arg gaat voor op global

/*
variable is global if it is not:
1) declared with var
2) declared inside a function
*/

var food = "frieten";
(function() {
	vlees = "biefstuk";
})();

console.log(vlees); //vlees: geen var dus global

//detecting globals
//console.log(Object.keys(window));

/*
the magic variable 'this': context
4 ways to set value of this in a function:
1) call method on object
2) pass 'this' in, with .call() and .apply()
3) use 'new' to make 'this' start out empty
4) .bind() 'this' with 3rd party methods

IF NONE OF THE ABOVE ARE USED, 'this' IS GLOBAL OBJECT
*/

//1) call method on an object
var user = {
	handle: "@david",
	alertName: function() {
		console.log(this.handle); //this refers to user object
	}
}

user.alertName(); //@david

//2) call a function and pass 'this' in, with .call()
/*
The call() method calls a function 
with a given this value and arguments provided individually.
fun.call(thisArg[, arg1[, arg2[, ...]]])
*/
user.alertName.call({handle : '@jan'}); //@jan

//2b) call a function and pass 'this' in, with .apply()
/*
The apply() method calls a function 
with a given this value and arguments provided as an array
fun.apply(thisArg[, argsArray])
*/
user.alertName.apply({handle : '@geert'}, [true]);

//3) use the 'new' to create a brand new function context

function User(handle) {
	this.handle = handle;
}

var david = new User('@david');
console.log(david); //handle = @david

//4) .bind() methods ($.proxy, _.bind, native .bind())
/*
The bind() method creates a new function that, when called,
has its this keyword set to the provided value, 
with a given sequence of arguments preceding any provided 
when the new function is called.
*/

/*
native bind:
fun.bind(thisArg[, arg1[, arg2[, ...]]])
*/
var foo = (function(x) {
	return this + x;
}).bind(1);

console.log(foo(3)); //4 (3+1)

//using jQuery.proxy(function, context)
var alertName = function() {
	console.log(this.handle); //this will be the 2nd arg of the proxy func
}

//$.proxy(alertName, { handle: '@david'})(); //@david

/*
(function() {
	console.log(this); //this is global object
})();
*/

var background_colors = [ 'red', 'green' ];
(function() {
	console.log(this); //this = background_colors
}).call(background_colors);

var gebruiker = {
	print: function() {
		console.log(this);
	}
}

gebruiker.print(); //prints [function]