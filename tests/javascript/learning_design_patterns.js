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
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    /*
    tostring wordt opnieuw gemaakt voor ieder car object die je maakt
    */
    this.toString = function() {
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
    functionKey: function() {}
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
        name = 'david set';
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
        if (!channels[channels])
            channels[channel] = [];

        channels[channel].push({
            context: this,
            callback: fn
        });
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

//pub sub via third party mediator
var obj = {
    name: 'sam'
};
mediator.installTo(obj);
obj.subscribe('nameChange', function(arg) {
    console.log('thirdy party mediator');
    console.log(this.name);
    this.name = arg;
    console.log(this.name);
});

obj.publish('nameChange', 'john');

/**********
the prototype pattern
prototype is blueprint for every object the constructor creates:
easy way for inheritance
child objects reference to base object functions (functions are not copied)
**********/
var vehiclePrototype = {
    init: function(carModel) {
        this.model = carModel;
    },
    getModel: function() {
        console.log('this model of this vehicle is..' + this.model);
    }
};

function vehicle(model) {
    function F() {
    }
    ; //constructor
    F.prototype = vehiclePrototype; //set prototype to vehiclePrototype literal

    var f = new F();
    f.init(model);
    return f;
}

var car = vehicle('Fort escort');
car.getModel();

//example2 (better):
var aCar = Object.create({
    model: 'ford',
    year: 2005
});
console.log(aCar.model);

//example3:
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
give a simpler api to a difficult underlying structure
**********/
(function() {
    var addMyEvent = function(el, ev, fn) {
        if (el.addEventListener) {
            el.addEventListener(ev, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + ev, fn);
        } else {
            el['on' + ev] = fn
        }
    };
})();

//example2
var facadetest = (function() {
    var _private = {
        i: 5,
        get: function() {
            console.log('current value = ' + this.i);
        },
        set: function(val) {
            this.i = val;
        },
        run: function() {
            console.log('running');
        },
        jump: function() {
            console.log('jumping');
        }
    };

    return {
        facade: function(args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        }
    }
})();

(function(f) {
    f.facade({
        run: true,
        val: 10
    });
})(facadetest);

/**********
the factory pattern
**********/
function Car(options) {
    //constructor
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
    this.color = options.color || 'silver';
}

function Truck(options) {
    //constructor
    this.state = options.state || 'used';
    this.wheelSize = options.wheelSize || 'large';
    this.color = options.color || 'blue';
}

//factory example
function VehicleFactory() {
}
VehicleFactory.prototype.vehicleClass = Car; //default vehicle class is car
VehicleFactory.prototype.createVehicle = function(options) {
    switch (options.vehicleType) {
        case 'car':
            this.vehicleClass = Car;
            break;
        case 'truck':
            this.vehicleClass = Truck
            break;
    }
    return new this.vehicleClass(options);
}

//create carfactory
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: 'car',
    color: 'yellow',
    doors: 6
});
console.log(car instanceof Car);

//create truckfactory
function TruckFactory() {
}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var bigTruck = truckFactory.createVehicle({
    state: 'omg bad',
    color: 'pink',
    wheelSize: 'so big'
});

console.log(bigTruck);

/**********
the mixin pattern
**********/
var Person = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = 'male';
};

//1) subclassing the person class
var clark = new Person('Clark', 'Kent');

//define subclass
var SuperHero = function(firstName, lastName, powers) {
    //.call(object on which to run)
    Person.call(this, firstName, lastName);

    this.powers = powers;
};

SuperHero.prototype = Object.create(Person.prototype);
var superman = new SuperHero('Clark', 'Kent', ['flight', 'heat-vision']);
console.log(superman);

/*
2) mixins:
can be viewed as objects with attributes and methods 
that can be easily shared accros a number of other object prototypes
*/

var myMixins = {
    moveUp: function() {
        console.log('move up');
    },
    moveDown: function() {
        console.log('move down');
    },
    stop: function() {
        console.log('stop');
    }
};

function CarAnimator() {
    this.moveLeft = function() {
        console.log('move left');
    }
}
;

function PersonAnimator() {
    this.moveRandomly = function() {}
}

/*
mixins with underscore.js
_.extend(CarAnimator.prototype, myMixins); //_.extend from underscore.js
_.extend(PersonAnimator.prototype, myMixins);

var myAnimator = newCarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();
*/

var Car = function(settings) {
    this.model = settings.model || 'no model provided';
    this.color = settings.color || 'no colour provided';
};

var Mixin = function() {}

Mixin.prototype = {
    driveForward: function() {
        console.log('drive forward');
    },
    driveBackward: function() {
        console.log('drive backward');
    },
    driveSideways: function() {
        console.log('drive sideways');
    }
};

//Extend an exisiting object with a method from anothr
function augment(receivingClass, givingClass) {
    // only provide certain methods
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for (var methodName in givingClass.prototype) {

            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }

            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}

augment(Car, Mixin, 'driveForward', 'driveBackward');

var myCar = new Car({
    model: 'ford escord',
    color: 'blue'
});

myCar.driveForward();
myCar.driveBackward();

augment(Car, Mixin); //extend with all functions of the givingClass
myCar.driveSideways();

/**********
the decorator pattern
**********/

/*
decorators can be used to modify existing systems where we wish to add additional features to objects 
without the need to heavily modify the underlying code using them
*/


//Example 1: Decorating Constructors With New Functionality
function Vehicle(vehicleType) {
    this.vehicleType = vehicleType || 'car';
    this.model = 'default';
    this.license = '0000-000';
}

var testInstance = new Vehicle('car');
console.log(testInstance);

var truck = new Vehicle('truck');
truck.setModel = function(modelName) {
    this.model = modelName;
};

truck.setColor = function(color) {
    this.color = color;
};

truck.setModel('CAT');
truck.setColor('blue');

console.log(truck);

var secondInstance = new Vehicle('car');
console.log(secondInstance);

//Example 2: Decorating Objects With Multiple Decorators
function MacBook() {
    this.cost = function() {
        return 997;
    };

    this.screenSize = function() {
        return 11.6;
    };
}

//Decorator 1
function memory(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    };
}

var mb = new MacBook();
memory(mb);

console.log(mb.cost());

function engraving(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 250;
    }
}

var mb = new MacBook();
engraving(mb);
console.log(mb.cost());

//Abstract Decorators

/**********
the flyweight pattern
**********/
