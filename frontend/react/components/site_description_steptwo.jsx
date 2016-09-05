import React from 'react';

const SiteDescriptionTwo = React.createClass({
  render(){
    return(
      <div className='modal-container two'>
        <h2 className='welcome-text'>Instructions</h2>
        <div className='step-two'>
          <ul className='description-text-ul'>
            <li>
              To test your algorithm, please input it into the text pane of your choice! You can pit it against your own algorithm, or against one of our built in sorts!
            </li>
            <li>
              You are restricted to ES5 Syntax, ES6 synatax may not compile in our virtual machines. No Consts or Lets please!
            </li>
            <li>
              Please note, if your function takes longer than 45 seconds to sort any array, it will be disabled.
            </li>
            <li>
              Due to limitations of these virtual machines, we cannot currently allow the use of Promises, or the requirement of any external modules/packages. POJO only!
            </li>
            <li>
              At this time we are pleased to offer the JS Library Sort, Bubble Sort, Quick Sort(recursive), Merge Sort(iterative), Radix Sort, Heap Sort, and Counting Sort.
            </li>
            <li>
              Once you press Run Tests, we will benchmark your code server-side with the use of virtual machines.
            </li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = SiteDescriptionTwo;
// <img className='steptwo-img' style={{'margin': '0 auto'}} src='https://i.stack.imgur.com/lXZkh.png'></img>
