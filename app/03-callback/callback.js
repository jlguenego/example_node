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





