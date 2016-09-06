import React from 'react';
import * as Library from '../util/sorts';
import * as ClientActions from '../actions/client_actions';

const WelcomeMessage = React.createClass({
  getInitialState() {
    return{
      siteDescriptionNumber: 1
    };
  },

  previousInstructions() {
    let newStateNum = this.state.siteDescriptionNumber;
    if (newStateNum < 1) {
      newStateNum = 1;
    }
    this.setState({siteDescriptionNumber: newStateNum});
  },

  nextInstructions() {
    let newStateNum = this.state.siteDescriptionNumber + 1;
    if (newStateNum > 3) {
      newStateNum = 3;
    }

    this.setState({siteDescriptionNumber: newStateNum});
  },

  chooseStepComponent() {
    switch (this.state.siteDescriptionNumber) {
      case 1:
        return <SiteDescriptionOne/>;
      case 2:
        return <SiteDescriptionTwo/>;
      case 3:
        return <SiteDescriptionThree/>;
    }
  },

  //get values from editor element and package into json request
  parseEditor(el){
    //not DRY.  REFACTOR.
    debugger;
    const language = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    const text = ace.edit(el).getSession().getValue();
    const name = text.match(/\s(.*?)\(/)[1];
    let method;
    if(language === 'javascript'){method = `var ${name} = ${text}`;}
    if(language === 'python'){method = text;}
    return {method: method, name: name, language: language}
  },
  //parse editors to compile request and send to backend
  runDemo(evt) {
    //janky and not DRY.  REFACTOR.
    evt.preventDefault();
    debugger;
    const el1 = document.getElementById('editor-1');
    const el2 = document.getElementById('editor-2');
    const bs = Library[`bubbleSort`]('javascript');
    const qs = Library[`quickSortRec`]('python');
    ace.edit(el1).getSession().setValue(qs)
    ace.edit(el1).getSession().setMode('ace/mode/python');
    ace.edit(el2).getSession().setValue(bs);
    debugger;
    const data1 = this.parseEditor(el1);
    const data2 = this.parseEditor(el2);
    const lengthArr = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    const data = { data1: data1, data2: data2, lengthArr: lengthArr };
    debugger;
    ClientActions.sendMethods(data);
    this.props.closeModal();
  },

  nextButtonChoice() {
    let nextButton = (
        <button className='pane-selector modal-button' onClick={this.nextInstructions}> Next </button>
    );

    if (this.state.siteDescriptionNumber === 3) {
      nextButton = (<div></div>);
    }
    return nextButton;
  },

  prevButtonChoice() {
    let prevButton = (
      <button className='pane-selector modal-button' onClick={this.previousInstructions}> Previous </button>
    );

    if (this.state.siteDescriptionNumber === 1) {
      prevButton = (<div></div>);
    }
    return prevButton;
  },

  render(){
    let description = this.chooseStepComponent();
    let nextButton = this.nextButtonChoice();
    let prevButton = this.prevButtonChoice();

    return(
      <div className='site-desc-full'>
        {description}
        <div className='modal-panel-container'>
          {prevButton}
          <button className='pane-selector modal-button' onClick={this.runDemo}> Run Demo </button>
          <button className='pane-selector modal-button' onClick={this.props.closeModal}> Close & Start Testing! </button>
          {nextButton}
        </div>
      </div>
    );
  }

});


const SiteDescriptionOne = React.createClass({
  render(){
    return(
      <div className='modal-container one'>
       <h2 className='welcome-text'>Welcome to Algo Arena</h2>
       <p className='description-text'>BUNDLE JS UPDATED</p>

       <img className='stepone-img' style={{'margin': '0 auto'}} src='https://storage.googleapis.com/algorithm-arena-static/intro.gif'></img>

     </div>

    );
  }

});
// <p className='description-text'>Make your sort alogrithms battle to the death.  Now in JavaScript and Python.</p>

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

const SiteDescriptionThree = React.createClass({
  render(){
    return(
       <div className='modal-container'>
         <h2 className='welcome-text'>Examples</h2>
         <div className='step-three'>
           <p>
             Here are some video tutorials for the inexperienced among us:
           </p>
           <p>
             Bubble Sort
             <br></br>
             <a href="https://www.youtube.com/watch?v=Jdtq5uKz-w4" target='_blank'>Video Tutorial</a>
           </p>
           <p>
             Quick Sort
             <br></br>
             <a href="https://www.youtube.com/watch?v=TzeBrDU-JaY" target='_blank'>Video Tutorial</a>
           </p>
           <p>
             Merge Sort
             <br></br>
             <a href="https://www.youtube.com/watch?v=TzeBrDU-JaY&index=5&list=PL2_aWCzGMAwKedT2KfDMB9YA5DgASZb3U" target='_blank'>Video Tutorial</a>
           </p>

           <h2>
             HAPPY SORTING!!
           </h2>
         </div>
       </div>
    );
  }
});

module.exports = WelcomeMessage;
