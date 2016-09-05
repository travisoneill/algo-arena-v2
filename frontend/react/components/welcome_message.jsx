import React from 'react';
import SiteDescriptionOne from './site_description_stepone';
import SiteDescriptionTwo from './site_description_steptwo';
import SiteDescriptionThree from './site_description_stepthree';
import * as Library from '../util/sorts';
import * as ClientActions from '../actions/client_actions';

const WelcomeMessage = React.createClass({
  getInitialState() {
    return{
      siteDescriptionNumber: 1
    };
  },

  previousInstructions() {
    let newStateNum = this.state.siteDescriptionNumber - 1;
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
    const el1 = document.getElementById('editor-1');
    const el2 = document.getElementById('editor-2');
    const bs = Library[`bubbleSort`]();
    const qs = Library[`quickSortRec`]();
    ace.edit(el1).getSession().setValue(qs);
    ace.edit(el2).getSession().setValue(bs);
    const data1 = this.parseEditor(el1);
    const data2 = this.parseEditor(el2);
    const lengthArr = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    const data = { data1: data1, data2: data2, lengthArr: lengthArr };
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


module.exports = WelcomeMessage;
