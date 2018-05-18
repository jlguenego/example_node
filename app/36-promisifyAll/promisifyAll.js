// The shortest code possible. 
// Yes, difficult to read 
// but funny how the functions can embed to themselves... ;)
// This is the art of functional programming.
const promisify = (asyncFn, obj) =>
    (...args) =>
        new Promise((resolve, reject) =>
            asyncFn.call(obj, ...args, (err, result) =>
                err ? reject(err) : resolve(result)));


module.exports = function (obj, exceptions) {
    if (exceptions === undefined) {
        exceptions = [];
    }
    for (let p in obj) {
        if (!(obj[p] instanceof Function)) {
            continue;
        }
        if (exceptions.includes(p)) {
            continue;
        }
        obj[p + 'Promise'] = promisify(obj[p], obj);
    }
};
