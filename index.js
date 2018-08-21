"use strict";

var path = require("path"),
    execFile = require("child_process").execFile,
    fs = require('fs');

module.exports = function ifcConvert(source, dest, options) {

    return new Promise(function(resolve, reject) {

        var ifcConvertPath;

        if (options && options.path) {
            ifcConvertPath = options.path + '/IfcConvert';
        } else {
            ifcConvertPath = 'IfcConvert';
        }

        if (!fs.existsSync(source)) {
            reject('Unable to open the source file.');
            return;
        }

        var args = [source, dest];

        //If user supplies any args concat them to the args array
        if (options && options.args) {
            args = args.concat(options.args);
        }

        execFile(ifcConvertPath, args, {
            maxBuffer: options.maxBuffer || 1024 * 2000
        }, function(err, stdout, stderr) {

            if (err) {
                reject(err);
            } else if (stderr.lenght > 0) {
                reject(new Error(stderr.toString()));
            } else {
                resolve();
            }
        });
    });
};
