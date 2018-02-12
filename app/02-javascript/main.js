'use strict';

// the following fail in strict mode. Why ?
// toto = 5;

console.log('1: Global object this', this, this === exports, this === module.exports);
console.log('1: Global object module', module);

(function() {
    // test this code without the strict mode.
    console.log('this === undefined ?', this === undefined);
    console.log('this === global ?', this === global);
})();

var Animal = function() {
	this.eat = function() {
		console.log('miam miam slurp slurp...');
	};
};

Animal.prototype.sleep = function() {
	console.log('rzzzzzzzzz...');
};

// try to run the function with and without new.
var milou = new Animal();
console.log('milou', milou);


var Cat = function() {
	this.speak = function() {
		console.log('miaou');
	};
};
Cat.prototype = new Animal();

var garfield = new Cat();
garfield.speak();
garfield.sleep();
garfield.eat();

console.log('garfield', garfield);

class Vehicle {
	constructor(color) {
		this.color = color;
	}
	start() {
		console.log('vroum vroum !');
	}
	stop() {
		console.log('...');
	}
}

class Car extends Vehicle {
	constructor(color, price) {
		super(color);
		this.price = price;
	}
	lock() {
		console.log('Car is locked.');
	}
}

const citroen2CV = new Car('blue', 25000);
citroen2CV.lock();
citroen2CV.start();
citroen2CV.stop();
console.log('citroen2CV', citroen2CV);

// eslint-disable-next-line no-use-before-define
myTest();

function myTest() {
	// Question: what does x is ?
	// eslint-disable-next-line no-use-before-define
	x = 25;
	// eslint-disable-next-line no-use-before-define
	console.log('myTest: x', x);

	// eslint-disable-next-line no-constant-condition
	if (true) {
		var x;
		console.log('myTest: x', x);
		x = 32;
		console.log('myTest: x', x);
	}
	console.log('myTest: x', x);
	x += 1;
	console.log('myTest: x', x);
}



// // Question: Why can we print i without error ? 
// eslint-disable-next-line no-use-before-define
console.log('i:', i);
for (var i = 0; i < 3; i++) {
	console.log('i:', i);
}
console.log('i:', i);

// Every function is variadic. 
function myTest2(a, b, c) {
	console.log('myTest2: start');
	console.log(a, b, c);
	console.log('arguments', arguments);
	console.log('arguments[3]', arguments[3]);
	console.log('is arguments an Array ?', arguments.constructor === Array);
	Array.prototype.forEach.call(arguments, function(n, i) {
		console.log(n, i);
	});
}

myTest2(1);
myTest2(1, 3, 12);
myTest2(1, 3, 12, 14);
var x = [1, 12, 3];
console.log(x);
x.forEach(function(n, i) {
	console.log(n, i);
	console.log('arguments', arguments);
});
x.length = 10;
console.log('x', x);
x['!@#$%asdf'] = 'hello';
x.$coucou = 'yeah';
console.log('x', x);

// Cast to number
var a = '34';
console.log('typeof a', typeof a);
console.log('typeof +a', typeof + a);

// eslint-disable-next-line no-debugger
debugger;
