'use strict';

const VM = require('./vm');

module.exports = {
  receiveCode(codeObj) {
    const lengthArr = codeObj.lengthArr;
    const requestData = codeObj.request_data; //FIXME - what does this do?
    const method = requestData.method;
    const name = requestData.name;
    console.log(method);
    return this.testCode(method, name, lengthArr);
  },

  testCode(method, name, lengthArr) {
    let results = [];
    let res;

    for (let i = 0; i < lengthArr.length; i++) {
      try {
          let n = lengthArr[i];
          let res = VM.bootVM(method, name, n);
          results.push({x: n, y: res});
          if(res > 20000){ break; }
      } catch(e) {
          break;
      }
    }

    return {
      xAxis: lengthArr,
      rawData: results,
      name: name
    };
  },

};
