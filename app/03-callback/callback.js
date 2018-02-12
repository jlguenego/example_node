'use strict';

// Callback
function hello() {
    console.log('hello');
}

hello();
setTimeout(hello, 1000);

function repeatTwice(cb) {
    console.log('repeatTwice start');
    cb();
    cb();
    console.log('repeatTwice end');
}

repeatTwice(hello);

// Closure example
function testClosure() {
    var x = 2;
    function incrementX() {
        x++;
    }
    console.log('x:', x);
    incrementX();
    console.log('x:', x);
}

testClosure();

// es6
const decr = (x) => { return x - 1; };
const incr = x => x + 1;
console.log('decr 2 = ' + decr(2));
console.log(`incr 2 = ${incr(2)}`);

const toArray = (...args) => {
    return args;
};

console.log('toArray(2, 4, 5): ', toArray(2, 4, 5));

// object matching
const {coucou} = {coucou: 'hello'};
console.log('coucou:', coucou);

// property shorthand
var myFunction = {decr, incr};
console.log('myFunction', myFunction);

// call
const myObj = {
    '0': 'coucou',
    '1': 34,
    length: 2,
};

const array = Array.prototype.map.call(myObj, (n) => n + n);
console.log('array', array);

// apply
const array2 = Array.prototype.map.apply(myObj, [(n) => n + n]);
console.log('array2', array2);

// bind
const myMap = Array.prototype.map.bind(myObj);
const array3 = myMap(n => n + n);
console.log('array3', array3);





