//learning javascript design patterns ISBN 9781449331818
//the creational pattern
var newObject = {};
var newObject = Object.create(null);
var newObject = new Object();

newObject.name = 'david';
newObject['age'] = 32;

/**********
the constructor pattern
**********/
function Car(model, year, miles)  {
	this.model = model;
	this.year = year;
	this.miles = miles;
	
	/*
	tostring wordt opnieuw gemaakt voor ieder car object die je maakt
	*/
	this.toString = function()  {
		return this.model + ' has done ' + this.miles + ' miles';
	}
}

var civic = new Car('Honda civic', 2009, 20000);
console.log(civic.toString());

//constructors with prototypes:
function Book(isbn, author) {
	this.isbn = isbn;
	this.author = author;
}

//tostring wordt gedeeld over alle Book objecten
Book.prototype.toString = function() {
	return this.isbn + ' written by ' + this.author;
}

var book = new Book('9781449331818', 'Addy Osmani');
console.log(book.toString());

/**********
the singleton pattern
**********/
var mySingleton = function() {
	var privateVar = 'some private var';
	
	function showPrivate() {
		console.log(privateVar);
	}
	
	return {
		publicMethod: function() {
			showPrivate();
		},
		publicVar: 'some public var'
	}
};

var single = mySingleton();
single.publicMethod();
console.log(single.publicVar);
console.log(single.privateVar); //undefined

var Singleton = (function() {
  var instance;
  
  function createInstance() {
	  var obj = new Object('Im the instance');
	  return obj;
  }
  
  return {
	  	getInstance: function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
  }
})();

var instance1 = Singleton.getInstance();
var instance2 = Singleton.getInstance();
console.log('same instance?' + (instance1 === instance2));

/**********
the module pattern
**********/

/**********
object literals:
don't require instantiation
**********/
var myObjectLiteral = {
	varKey: 'varval',
	functionKey: function() {
	}
};
myObjectLiteral.varKey2 = 'varval2';

var myModule = {
	dbConfig: {
		host: 'localhost',
		username: 'root',
		password: 'root'
	},
	connect: function() {
		console.log('connecting ' + this.dbConfig.host);
	},
	updateConfig: function(dbConfig) {
		if (typeof dbConfig == 'object') {
			this.dbConfig = dbConfig;
			console.log('dbConfig changed');
			console.log(this.dbConfig);
		}
	}
};

myModule.connect();
var dbConfig2 = myModule.dbConfig;
dbConfig2.host = 'remotehost';
myModule.updateConfig(dbConfig2);

/**********
the module pattern
**********/

var testModule = (function() {
	var counter = 0;
	return {
		incrementCounter: function() {
			return counter++;
		},
		resetCounter: function() {
			console.log('counter value prior to reset: ' + counter);
			counter = 0;
		}
	};
})();

console.log(testModule.incrementCounter());
console.log(testModule.incrementCounter());
testModule.resetCounter();
console.log(testModule.incrementCounter());

/**********
the revealing pattern
**********/

var revealingModule = (function() {
	var name = 'david van';
	var age = 32;
	
	function updatePerson() {
		name = 'david updated';
	}
	
	function setPerson() {
		name ='david set';
	}
	
	function getPerson() {
		return name;
	}
	
	return {
		get: getPerson,
		set: setPerson
	}
})();

console.log(revealingModule.get());

/**********
the observer pattern (publish/subcribe pattern)
**********/
//jquery:
/*
//PUBLISH
//jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
$(el).trigger('/login', [{username:'david', age: 32}]);

//SUBSCRIBE
// jQuery: $(obj).on("channel", [data], fn);
$(el).on('/login', function(event) {							
});

//UNSUBSCRIBE
$(el).off('/login');

observer pattern met vanilla js:
https://github.com/mroderick/PubSubJS
http://jsfiddle.net/LxPrq/
*/

/**********
the mediator pattern
**********/
