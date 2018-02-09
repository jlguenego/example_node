'use strict';

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
