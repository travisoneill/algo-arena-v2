'use strict'

const testArrayMaker =
  `
    var maker = function make(n){
      let arr = [];
      for (let i = 0; i < n; i++) {
        let rand = Math.floor(Math.random() * 1000000);
        arr.push(rand);
      }
      return arr;
    };
  `;


const benchMarker =
  `
    var bm = function benchmark(sortFunc, length, iterations){
      let arr = this.maker(length);
      let t = 0;
      for (let i = 0; i < iterations; i++) {
        let a = arr.slice(0);
        let t0 = new Date();
        sortFunc(arr);
        let t1 = new Date();
        t += (t1 - t0);
      }
      return t;
    };
  `;

module.exports = {
  getArrayMaker() {
    return testArrayMaker;
  },

  getBenchMarker(methodName, lengthArr) {
    return benchMarker + `bm(${methodName}, ${lengthArr}, 1)`;
  },

  runUserCode(method, methodName, lengthArr) {
    return method + this.getArrayMaker() + this.getBenchMarker(methodName, lengthArr);
  }

};
