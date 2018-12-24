import React, { Component } from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import nv from 'nvd3';

class CustomChart extends Component {
  componentDidMount() {
  }

  render() {
    const that = this;
    nv.addGraph(() => {
      const chart = nv.models.multiBarChart();
      // chart.transitionDuration(350);
      chart.reduceXTicks(true); //If 'false', every single x-axis tick label will be rendered.
      chart.rotateLabels(0); //Angle to rotate x-axis labels.
      chart.showControls(true); //Allow user to switch between 'Grouped' and 'Stacked' mode.
      chart.groupSpacing(0.1); //Distance between each group of bars.


      chart.xAxis
        .tickFormat(d3.format(',d'));

      chart.yAxis
        .tickFormat(d3.format(',.1f'));

      d3.select('#chart svg')
        .datum(that.props.datum)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });

    return (
      <div id="chart">
        <svg />
      </div>
    );
  }
}
export default CustomChart;
