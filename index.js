const removeUnknownKeys = (keys, object) => {
    var keyring = {};
    keys.forEach(key => {
        if (typeof key === "string") {
            keyring[key] = key
        } else {
            keyring[Object.keys(key)[0]] = key[Object.keys(key)[0]];
        }
    });
    
    Object.keys(object).forEach(key => {
        if (typeof keyring[key] === "object") {
            removeUnknownKeys(keyring[key], object[key]);
        } else if (!keys.includes(key)) {
            delete object[key];
        }
    });
}


module.exports.only = function () {
    var keys = Array.from(arguments);
    
    return (request, response, next) => {
        removeUnknownKeys(keys, request.body);
        next();
    }
};
