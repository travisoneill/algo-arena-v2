const {VM} = require('vm2');
const BenchmarkConstants = require('./benchmark_consts');

module.exports = {
    bootVM(method, methodName, lengthArr) {
     let worker1 = new VM({
         timeout: 29000,
         sandbox: {Promise: null}
     });
     return worker1.run(BenchmarkConstants.runUserCode(method, methodName, lengthArr));
   }

};
