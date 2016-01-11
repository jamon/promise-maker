"use strict";

//  Promise maker - un-fucks node.js's callback bullshit
//  does something like this, but automatically:
/*
new Promise((resolve, reject) => {
    fs.readFile("./config.json", "utf8", (err, result) => {
        if(err) reject(err); else resolve(result);
    });
}).then(console.log);
*/
module.exports = function (func) {
    return new Promise(function (resolve, reject) {
        func(function (err) {
            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            if (err) reject(err);else resolve.apply(undefined, rest);
        });
    });
};

// usage example:
//p(cb => fs.readFile("./config.json", "utf8", cb)).then(console.log);
