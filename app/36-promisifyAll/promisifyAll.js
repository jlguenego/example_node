const promisify = (asyncFn, obj) => {
    return (...args) => new Promise((resolve, reject) => {
        asyncFn.call(obj, ...args, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};


module.exports = function(obj, exceptions) {
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