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


