/**********
learning javascript design patterns ISBN 9781449331818
http://addyosmani.com/resources/essentialjsdesignpatterns/book/
**********/

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
the mediator pattern:
all objects communicate through central point

gelijkaardig aan pubsub, maar de hebt slechts 1 object publisht / subscribed:
In the Observer pattern, there is no single object that encapsulates a constraint.
The Mediator pattern centralizes rather than simply just distributing.
**********/
var mediator = (function() {
  var channels = {};
  
  var subscribe = function(channel, fn) {
	  if(!channels[channels]) channels[channel] = [];
	  
	  channels[channel].push({context: this, callback: fn});
	  return this;
  };
  
  var publish = function(channel) {
	  if (!channels[channel]) return false;
	  console.log('*****************');
	  //The arguments object is an Array-like object corresponding to the arguments passed to a function.
	  //arguments object is not an array, but can be converted to array: Array.prototype.slice.call(arguments);
	  var args = Array.prototype.slice.call(arguments, 1); //remove first argument from the arguments
	  for (var i = 0, l = channels[channel].length; i < l; i++) {
		  var subscription = channels[channel][i];
		  //apply the callback function to the subscription object (subscription.context), with the arguments
		  subscription.callback.apply(subscription.context, args);
	  }
	
	  return this;
  };
  
  return {
	  publish: publish,
	  subscribe: subscribe,
	  installTo: function(obj) {
		  obj.subscribe = subscribe;
		  obj.publish = publish;
	  }
  };
})();

//implementation:
(function(m) {
	var person = 'Luke';
	m.subscribe('nameChange', function(arg) {
		console.log(person);
		person = arg;
		console.log(person);
	});
	
	m.publish('nameChange', 'David');
})(mediator);


/**********
the prototype pattern
prototype is blueprint for every object the constructor creates:
easy way for inheritance
child objects reference to base object functions (functions are not copied)
**********/
var vehiclePrototype = {
	init: function(carModel) {
		this.model= carModel;
	},
	getModel: function() {
		console.log('this model of this vehicle is..' + this.model);
	}
};

function vehicle(model) {
	function F() {}; //constructor
	F.prototype = vehiclePrototype; //set prototype to vehiclePrototype literal
	
	var f = new F();
	f.init(model);
	return f;
}

var car = vehicle('Fort escort');
car.getModel();

//example2:

var myBluePrint = function MyBluePrintObject() {
	this.someFunction = function someFunction() {
		alert('some function');
	};
	
	this.showMyName = function showMyName(name) {
		console.log(this.name);
	};
};

function MyObject() {
	this.name = 'testing';
}
MyObject.prototype = new myBluePrint();

var testObject = new MyObject();
testObject.showMyName();

/**********
the command pattern
**********/
(function() {
	var CarManager = {
		requestInfo: function(model, id) {
			return 'the information for ' + model + ' with ID ' + id + ' is foobar';
		},
		buyVehicle: function(model, id) {
			return 'you have bought ' + model + ' with ID ' + id;
		},
		arrangeViewing: function(model, id) {
			return 'you have booked a viewing of ' + model + ' ( ' + id + ')';
		}
	};
	
	CarManager.execute = function(command) {
//		return CarManager[command.request](command.model, command.carId
		var args = Array.prototype.slice.call(arguments, 1);
		console.log(args);
		return CarManager[command] && CarManager[command].apply(CarManager, args);
	};
	
	console.log(CarManager.execute('requestInfo', 'ford', 2));
	console.log(CarManager.execute('buyVehicle', 'volkswagen', 3));
	
})();

/**********
the facade pattern
**********/
