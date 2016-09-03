import * as React from 'react';
import * as ClientActions from '../actions/client_actions';
import * as Library from '../util/sorts';
import * as Hover from '../util/hover_text';
const ReactTooltip = require("react-tooltip");
const DataStore = require('../stores/data_store');

const ControlPanel = React.createClass({

  getInitialState(){
    return {running: false, selected: '1', min: 1000, max: 10000, tests: 10};
  },

  componentDidMount() {
    this.listener = DataStore.addListener(this._onChange);
  },

  componentWillUnmount(){
    this.listener.remove();
  },
  //re-enables 'run-tests' button when store recieves data from backend
  _onChange(){
    this.setState({running: false});
  },
  //checks selected pane to diable selector button
  selectCheck(n){
    return this.state.selected === n;
  },
  //selects pane to insert code when buttons pressed
  selectPane(evt){
    this.setState({selected: evt.target.id});
  },
  //sets range of array lengths for test
  setRange(evt){
    evt.preventDefault();
    const val = evt.target.value;
    if(evt.target.id === 'range-min'){this.setState({min: val});}
    if(evt.target.id === 'range-max'){this.setState({max: val});}
  },
  //sets number of tests to run
  setTests(evt){
    evt.preventDefault();
    const val = evt.target.value;
    this.setState({tests: val})
  },
  //sets active language in selected pane
  setLanguage(evt){
    const pane = document.getElementById(`editor-${this.state.selected}`);
    ace.edit(pane).getSession().setMode({path: `ace/mode/${evt.target.id}`, v: Date.now()});
  },
  //inputs sort function from library into the selected editor
  demoSort(evt){
    const pane = document.getElementById(`editor-${this.state.selected}`);
    const language = ace.edit(pane).getSession().getMode().$id.match(/\w*$/)[0];
    const text = Library[evt.target.id](language);
    ace.edit(pane).getSession().setValue(text);
  },

  //opens instruction modal
  showInstructions(evt){
    evt.preventDefault();
    this.props.openInstructionModal();
  },

  // makes int array of test lengths from specified user inputs
  makeArr(){
    let arr = [];
    let min = parseInt(document.getElementById('range-min').value);
    let max = parseInt(document.getElementById('range-max').value);
    let n = parseInt(document.getElementById('num-tests').value);
    if(max > 100000){max = 100000;}
    if(min > 100000){min = 100000;}
    if(n > 100){n = 100;}
    const step = (max - min) / (n - 1);
    for (let i = 0; i < n; i++) {
      arr.push( ~~(min + (i * step)) );
    }
    return arr;
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
  //clears all entred text from the currently selected editor
  clearPane(evt){
    evt.preventDefault();
    let pane = document.getElementById(`editor-${this.state.selected}`);
    let text = 'function name(array){\n\n}';
    ace.edit(pane).getSession().setValue(text);
  },

  handleSubmit(evt){
    evt.preventDefault();
    //disables 'run tests' button until results returned
    this.setState({running: true});
    //gets Ace Editor elements and values
    const el1 = document.getElementById('editor-1');
    const el2 = document.getElementById('editor-2');
    const data1 = this.parseEditor(el1);
    const data2 = this.parseEditor(el2);
    const lengthArr = this.makeArr();
    //assembles JSON to be sent to back end
    const data = { data1: data1, data2: data2, lengthArr: lengthArr };
    console.log(data);
    ClientActions.sendMethods(data);
  },

  render(){
    return(
      <div className="control-panel-container">
        <div className='selector-buttons'>
          <button
            className='pane-selector' id='1'
            disabled={this.selectCheck('1')}
            onClick={this.selectPane}>LEFT PANE</button>
          <button
            className='pane-selector' id='2'
            disabled={this.selectCheck('2')}
            onClick={this.selectPane}>RIGHT PANE</button>
          <div className='button-container'>
            <input
              className='range-input' id='range-min'
              type='number' placeholder='min size'
              max='100000' min='1'
              data-tip data-for='min-length'
              onChange={this.setRange} value={this.state.min} />
            <input
              className='range-input' id='range-max'
              type='number' placeholder='max size'
              max='100000' min='1'
              data-tip data-for='max-length'
              onChange={this.setRange} value={this.state.max} />
            <input
              className='num-tests-input' id='num-tests'
              type='number' placeholder='num tests'
              data-tip data-for='num-tests' max='100'
              onChange={this.setTests} value={this.state.tests} />
          </div>
          <button
            className='pane-selector' id='2'
            disabled={this.state.running}
            onClick={this.handleSubmit}>RUN TESTS</button>
          <button
            className='pane-selector' id='clear'
            onClick={this.clearPane}>CLEAR PANE</button>
          <button
            className='pane-selector' id='instructions'
            onClick={this.showInstructions}>INSTRUCTIONS</button>
        </div>
        <div className='library-sorts'>
          <button
            className='demo-sort' id='jsSort'
            data-tip data-for='jsSort'
            onClick={this.demoSort}>JS Library Sort</button>
          <button
            className='demo-sort' id='bubbleSort'
            data-tip data-for='bubbleSort'
            onClick={this.demoSort}>Bubble Sort</button>
          <button
            className='demo-sort' id='quickSortRec'
            data-tip data-for='quickSortRec'
            onClick={this.demoSort}>Quick Sort (rec)</button>
          <button
            className='demo-sort' id='mergeSortIter'
            data-tip data-for='mergeSortIter'
            onClick={this.demoSort}>Merge Sort (iter)</button>
          <button
            className='demo-sort' id='radixSort'
            onClick={this.demoSort}
            data-tip data-for='radixSort'>Radix Sort</button>
          <button
            className='demo-sort' id='heapSort'
            data-tip data-for='heapSort'
            onClick={this.demoSort}>Heap Sort</button>
          <button
            className='demo-sort' id='countingSort'
            data-tip data-for='countingSort'
            onClick={this.demoSort}>Counting Sort</button>
        </div>
        <HoverStash />
      </div>

    );
  }

});

//holds tooltip objects
const HoverStash = React.createClass({
  render(){
    return(
      <div>
        <ReactTooltip id='heapSort'>
          <Tool sort={'heapSort'} />
        </ReactTooltip>
        <ReactTooltip id='quickSortRec'>
          <Tool sort={'quickSortRec'} />
        </ReactTooltip>
        <ReactTooltip id='mergeSortIter'>
          <Tool sort={'mergeSortIter'} />
        </ReactTooltip>
        <ReactTooltip id='bubbleSort'>
          <Tool sort={'bubbleSort'} />
        </ReactTooltip>
        <ReactTooltip id='radixSort'>
          <Tool sort={'radixSort'} />
        </ReactTooltip>
        <ReactTooltip id='jsSort'>
          <Tool sort={'jsSort'} />
        </ReactTooltip>
        <ReactTooltip id='countingSort'>
          <Tool sort={'countingSort'} />
        </ReactTooltip>
        <ReactTooltip id="max-length">Maximium Array Length</ReactTooltip>
        <ReactTooltip id="min-length">Minimum Array Length</ReactTooltip>
        <ReactTooltip id="num-tests">Number of Tests</ReactTooltip>
      </div>
    );
  }
});

//makes tooltip content
const Tool = React.createClass({
  render(){

    const text = Hover[this.props.sort]();

    return(
      <div dangerouslySetInnerHTML={{__html: text}} />
    );
  }
});

module.exports = ControlPanel;
