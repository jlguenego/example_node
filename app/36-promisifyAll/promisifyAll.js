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
        obj[p + 'Promise'] = (...args) => new Promise((resolve, reject) => {
            obj[p].call(obj, ...args, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
};