import React, { Component } from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import nv from 'nvd3';
import styled from 'styled-components';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../Graph/constants';

class CustomChart extends Component {
  componentDidMount() {
  }

  render() {
    const that = this;
    nv.addGraph(() => {
      let chart;
      const { type } = this.props;
      if (type === GRAPH_TYPE_BAR_CHART) {
        chart = nv.models.multiBarChart();
        chart.reduceXTicks(true); //If 'false', every single x-axis tick label will be rendered.
        chart.rotateLabels(0); //Angle to rotate x-axis labels.
        chart.showControls(true); //Allow user to switch between 'Grouped' and 'Stacked' mode.
        chart.groupSpacing(0.1); //Distance between each group of bars.
      } else if (type === GRAPH_TYPE_LINE_CHART) {
        chart = nv.models.lineChart();
        chart.margin({ left: 100 }); //Adjust chart margins to give the x-axis some breathing room.
        chart.useInteractiveGuideline(true); //We want nice looking tooltips and a guideline!
        chart.showLegend(true); //Show the legend, allowing users to turn on/off line series.
        chart.showYAxis(true); //Show the y-axis
        chart.showXAxis(true); //Show the x-axis
      }

      chart.xAxis
        // .axisLabel('Time (ms)')
        .tickFormat(d3.format(',.2r'));

      chart.yAxis
        // .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));

      d3.select('#customChart svg')
        .datum(that.props.datum)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });

    const StyledSvg = styled('svg')`
      height: ${props => props.height};
    `;
    const { svgHeight } = this.props;
    return (
      <div id="customChart">
        <StyledSvg height={svgHeight} />
      </div>
    );
  }
}
export default CustomChart;
