import React  from 'react';
import d3Chart from '../../redux_util/d3graph';

class D3graph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let el = document.getElementById('chart');
    //creates D3 chart on component mount
    d3Chart.create(el, {height: 600, width: 600, data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    let el = document.getElementById('chart');
    d3Chart.update(el, nextProps.data);
  }
  render(){
    return(
      <div className="chart" id="chart" />
    );
  }
}

export default D3graph;
