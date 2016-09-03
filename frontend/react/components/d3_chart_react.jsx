import * as React from 'react';
import * as ServerActions from '../actions/server_actions';
const DataStore = require('../stores/data_store');
const d3Chart = require('./d3graph');


const D3Graph = React.createClass({

  getInitialState(){
    return {data: {}};
  },

  componentDidMount(){
    let el = document.getElementById('chart');
    this.listener = DataStore.addListener(this._onChange);
    //creates D3 chart on component mount
    d3Chart.create(el, {height: 600, width: 600, data: this.state.data});
  },

  _onChange(){
    const data = DataStore.all();
    let el = document.getElementById('chart');
    //updates D3 chart on change in data and passes new data to D3 chart
    d3Chart.update(el, data);
  },

  componentWillUnmount(){
    //will need to integrate this with removing D3 chart if we need it
    //to unmount.  Unecessary for now.
    this.listener.remove();
  },

  render(){
    return(
      <div className="chart" id="chart" />
    );
  }
});

module.exports = D3Graph;
