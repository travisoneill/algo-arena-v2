import React from 'react';
import { HoverStash } from './hover_stash';
import * as Library from '../../redux_util/sorts';
import * as Selectors from '../../redux_util/select_handlers';

class ControlPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      running: false,
      selected: 1,
      min: 1000,
      max: 10000,
      tests: 10
    };
    this.selectPane = this.selectPane.bind(this);
    this.setRange = this.setRange.bind(this);
    this.setTests = this.setTests.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.demoSort = this.demoSort.bind(this);
    this.showInstructions = this.showInstructions.bind(this);
    this.makeArr = this.makeArr.bind(this);
    this.parseEditor = this.parseEditor.bind(this);
    this.clearPane = this.clearPane.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({running: false});
  }

  componentDidMount() {
    Selectors.selectButton(1);
  }

  //selects pane to insert code when buttons pressed
  selectPane(e){
    Selectors.selectButton(e.target.id);
    this.setState({selected: e.target.id});
  }
  //sets range of array lengths for test
  setRange(e){
    e.preventDefault();
    const val = e.target.value;
    if(e.target.id === 'range-min'){this.setState({min: val});}
    if(e.target.id === 'range-max'){this.setState({max: val});}
  }
  //sets number of tests to run
  setTests(e){
    e.preventDefault();
    const val = e.target.value;
    this.setState({tests: val})
  }
  //sets active language in selected pane
  setLanguage(e){
    const pane = document.getElementById(`editor-${this.state.selected}`);
    ace.edit(pane).getSession().setMode({path: `ace/mode/${e.target.id}`, v: Date.now()});
  }
  //inputs sort function from library into the selected editor
  demoSort(e){
    const pane = document.getElementById(`editor-${this.state.selected}`);
    const language = ace.edit(pane).getSession().getMode().$id.match(/\w*$/)[0];
    const text = Library['Sorts'][e.target.id](language);
    ace.edit(pane).getSession().setValue(text);
  }

  //opens instruction modal
  showInstructions(e){
    e.preventDefault();
    this.props.openInstructionModal();
  }

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
  }
  //get values from editor element and package into json request
  parseEditor(el){
    //not DRY.  REFACTOR.
    const language = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    const text = ace.edit(el).getSession().getValue();
    const name = text.match(/\s(.*?)\(/)[1];
    let method;
    if(language === 'javascript'){method = `var ${name} = ${text}`;}
    if(language === 'python'){method = text;}
    if(language === 'ruby'){method = text;}
    return {method: method, name: name, language: language};
  }
  //clears all entred text from the currently selected editor
  clearPane(e){
    e.preventDefault();
    let pane = document.getElementById(`editor-${this.state.selected}`);
    let text = 'function name(array){\n\n}';
    ace.edit(pane).getSession().setValue(text);
  }

  handleSubmit(e){
    e.preventDefault();
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
    // debugger;
    this.props.sendData(data);
  }

  render(){
    return(
      <div className="control-panel-container">
        <div className='selector-buttons'>
          <button
            className='pane-selector' id='1'
            onClick={this.selectPane}>LEFT PANE</button>
          <button
            className='pane-selector' id='2'
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
            onClick={this.demoSort}>Library Sort</button>
          <button
            className='demo-sort' id='bubbleSort'
            data-tip data-for='bubbleSort'
            onClick={this.demoSort}>Bubble Sort</button>
          <button
            className='demo-sort' id='quickSortRec'
            data-tip data-for='quickSortRec'
            onClick={this.demoSort}>Quick Sort</button>
          <button
            className='demo-sort' id='mergeSortIter'
            data-tip data-for='mergeSortIter'
            onClick={this.demoSort}>Merge Sort</button>
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
}

export default ControlPanel;
