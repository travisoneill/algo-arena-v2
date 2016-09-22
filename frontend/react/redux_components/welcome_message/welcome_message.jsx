import React from 'react';
import * as Library from '../../redux_util/sorts';
import {SiteDescriptionOne} from '../site_description/site_description_one';
import {SiteDescriptionTwo} from '../site_description/site_description_two';
import {SiteDescriptionThree} from '../site_description/site_description_three';

class WelcomeMessage extends React.Component{
  constructor(props){
    super(props);
    this.state = {siteDescriptionNumber: 1};
    this.previousInstructions = this.previousInstructions.bind(this);
    this.nextInstructions = this.nextInstructions.bind(this);
    this.chooseStepComponent = this.chooseStepComponent.bind(this);
    this.parseEditor = this.parseEditor.bind(this);
    this.nextButtonChoice = this.nextButtonChoice.bind(this);
    this.prevButtonChoice = this.prevButtonChoice.bind(this);
    this.runDemo = this.runDemo.bind(this);
  }

  previousInstructions(){
  let newStateNum = this.state.siteDescriptionNumber;
  if(newStateNum < 1) newStateNum = 1;
  this.setState({siteDescriptionNumber: 1});
  }

  nextInstructions(){
    let newStateNum = this.state.siteDescriptionNumber + 1;
    if(newStateNum > 3) newStateNum = 3;
    this.setState({siteDescriptionNumber: newStateNum});
  }

  chooseStepComponent() {
    switch (this.state.siteDescriptionNumber) {
      case 1:
        return <SiteDescriptionOne/>;
      case 2:
        return <SiteDescriptionTwo/>;
      case 3:
        return <SiteDescriptionThree/>;
    }
  }

  parseEditor(el){
    const language = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    const text = ace.edit(el).getSession().getValue();
    const name = text.match(/\s(.*?)\(/)[1];
    let method;
    if(language === 'javascript'){method = `var ${name} = ${text}`;}
    if(language === 'python'){method = text;}
    return {method: method, name: name, language: language};
  }

  runDemo(evt) {
    //janky and not DRY.  REFACTOR.
    evt.preventDefault();
    const el1 = document.getElementById('editor-1');
    const el2 = document.getElementById('editor-2');
    const bs = Library['Sorts'][`bubbleSort`]('javascript');
    const qs = Library['Sorts'][`quickSortRec`]('python');
    ace.edit(el1).getSession().setValue(qs);
    ace.edit(el1).getSession().setMode('ace/mode/python');
    ace.edit(el2).getSession().setValue(bs);
    const data1 = this.parseEditor(el1);
    const data2 = this.parseEditor(el2);
    const lengthArr = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    const data = { data1: data1, data2: data2, lengthArr: lengthArr };
    this.props.sendData(data);
    this.props.closeModal();
  }

  nextButtonChoice() {
    let nextButton = (
        <button className='pane-selector modal-button'
                onClick={this.nextInstructions}>
                Next
        </button>
    );

    if (this.state.siteDescriptionNumber === 3) {
      nextButton = (<div></div>);
    }
    return nextButton;
  }

  prevButtonChoice() {
    let prevButton = (
      <button className='pane-selector modal-button'
              onClick={this.previousInstructions}>
              Previous
      </button>
    );

    if (this.state.siteDescriptionNumber === 1) {
      prevButton = (<div></div>);
    }
    return prevButton;
  }

  render(){
    let description = this.chooseStepComponent();
    let nextButton = this.nextButtonChoice();
    let prevButton = this.prevButtonChoice();
    return(
      <div className='site-desc-full'>
        {description}
        <div className='modal-panel-container'>
          {prevButton}
          <button className='pane-selector modal-button'
                  onClick={this.runDemo}>
                  Run Demo
          </button>
          <button className='pane-selector modal-button'
                  onClick={this.props.closeModal}>
                  Close & Start Testing!
          </button>
          {nextButton}
        </div>
      </div>
    );
  }
}

export default WelcomeMessage;
