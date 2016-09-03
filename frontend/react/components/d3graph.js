import * as React from 'react';
import * as d3 from 'd3';
import * as ServerActions from '../actions/server_actions';

const d3Chart = {};

const svgWidth = 667;
const svgHeight = 667;

//set chart margins as % of svg dimensions
const chartMargin = {
  top:    0.05 * svgHeight,
  right:  0.05 * svgWidth,
  bottom: 0.08 * svgHeight,
  left:   0.10 * svgWidth
};

//set chart size based on chartMargin
const chartWidth = svgWidth - (chartMargin.right + chartMargin.left);
const chartHeight = svgHeight - (chartMargin.top + chartMargin.bottom);

//
d3Chart.create = function(el, props, state){
  //creates svg element
  this.svg = d3.select(el).append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`).style('background', 'black');
  //creates axis labels
  this.svg.append('text').text('Array Length').attr('class', 'axis-label x')
          .attr('x', svgWidth * 0.45).attr('y', svgHeight * 0.98);
  this.svg.append('text').text('Run Time(ms)').attr('class', 'axis-label y')
          .attr('transform', `translate(${svgWidth * 0.03}, ${svgHeight * 0.50})rotate(-90)`);
  //appends element that will contain the data points
  this.chart = this.svg.append('g').attr('class', 'chart-display')
        .attr('transform', `translate(${chartMargin.left},${chartMargin.top})`);
};

//selects element on mouseover and appends text
d3Chart.mouseover = function(){
  let evt = d3.event;
  let target = event.target;
  d3.select(target).attr('r', 8);
  let coords = d3.mouse(this);
  let text = d3Chart.getText(target);
  d3Chart.chart.append('text').text(text.line1).attr('class', 'hover-text').attr('x', coords[0] -30).attr('y', coords[1] - 33)
  d3Chart.chart.append('text').text(text.line2).attr('class', 'hover-text').attr('x', coords[0] -30).attr('y', coords[1] - 15)
}

//removes hover text on mouseout
d3Chart.mouseout = function(){
  d3.selectAll('text.hover-text').remove();
  let target = d3.event.target;
  d3.select(target).attr('r', 5);
}

//gets text content for hover display by getting data for corresponding point
d3Chart.getText = function(target){
  let point = target.id.split('-');
  let data = this.data[`rawData${point[0]}`][point[1]];
  return {line1: `Length: ${data.x}`, line2: `Time: ${data.y}ms`};
}

//sets axes scale based on min & max of data points
d3Chart.getAxesInfo = function(data){
  let xDomain = [data.xAxis[0], data.xAxis[data.xAxis.length - 1]];
  let yDomain = [data.rawData1[0].y, data.rawData1[0].y];
  //sets y domain to min and max of both data sets
  data.rawData1.concat(data.rawData2).forEach( (point) => {
    if(point.y > yDomain[1]){yDomain[1] = point.y}
    if(point.y < yDomain[0]){yDomain[0] = point.y}
  });
  return {xDomain: xDomain, yDomain: yDomain};
}

d3Chart.update = function(el, data){
  //Janky way to make new format match old.  Refactor.
  const axis = data.data1.xAxis;
  const d1 = data.data1.rawData;
  const d2 = data.data2.rawData;
  const n1 = data.data1.name;
  const n2 = data.data2.name;
  data = {xAxis: axis, name1: n1, name2: n2, rawData1: d1, rawData2: d2};
  this.data = data;
  //removes data points and scales from existing chart
  d3.selectAll('circle').remove();
  d3.selectAll('g.axis').remove();
  d3.selectAll('text.function-label').remove();
  //sets domains and adds axis scales
  const domains = d3Chart.getAxesInfo(data);
  const xScale = d3.scaleLinear().range([0, chartWidth]).domain(domains.xDomain);
  const yScale = d3.scaleLinear().range([chartHeight, 0]).domain(domains.yDomain);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);
  //appends axis scales and function name/color key
  this.chart.append('g').attr('class', 'axis').call(yAxis);
  this.chart.append('g').attr('class', 'axis').attr('transform', `translate(0 ,${chartHeight})`).call(xAxis);
  this.svg.append('text').text(data.name1).attr('class', 'function-label f1')
          .attr('x', svgWidth * 0.10).attr('y', svgHeight * 0.99);
  this.svg.append('text').text(data.name2).attr('class', 'function-label f2')
          .attr('x', svgWidth * 0.80).attr('y', svgHeight * 0.99);
  //plots points from data series 1
  // for (var i = 0; i < data.rawdata1.length; i++) {
  //
  // }
  data.rawData1.forEach( (point, index) => {
    this.chart.append('circle').attr('class', 'data-point series-1')
      .attr('id', `1-${index}`).attr("cx", xScale(point.x)).attr("cy", yScale(point.y))
      .attr("r", 5).on('mouseover', d3Chart.mouseover).on('mouseout', d3Chart.mouseout);
  });
  //plots points from data series 2
  // for (var i = 0; i < data.rawdata2.length; i++) {
  //   data.rawdata2[i]
  // }
  data.rawData2.forEach( (point, index) => {
    this.chart.append('circle').attr('class', 'data-point series-2')
      .attr('id', `2-${index}`).attr("cx", xScale(point.x)).attr("cy", yScale(point.y))
      .attr("r", 5).on('mouseover', d3Chart.mouseover).on('mouseout', d3Chart.mouseout);
  });
};

module.exports = d3Chart;
