import React, { Component } from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';
import nv from 'nvd3';
import { StyledSvg } from '../styledComponents';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from './constants';

const CustomChart = (props) => {
  console.log('CustomChart');
  nv.addGraph(() => {
    let chart;
    const { type } = props;
    console.log('addGraph', type);
    if (type === GRAPH_TYPE_BAR_CHART) {
      chart = nv.models.multiBarChart();
      chart.reduceXTicks(true);
      chart.rotateLabels(0);
      chart.showControls(true);
      chart.groupSpacing(0.1);
    } else if (type === GRAPH_TYPE_LINE_CHART) {
      chart = nv.models.lineChart();
      chart.margin({ left: 100 });
      chart.useInteractiveGuideline(true);
      chart.showLegend(true);
      chart.showYAxis(true);
      chart.showXAxis(true);
    }

    chart.xAxis
    // .axisLabel('Time (ms)')
      .tickFormat(d3.format(',.2r'));

    chart.yAxis
    // .axisLabel('Voltage (v)')
      .tickFormat(d3.format('.02f'));

    d3.selectAll('svg > *').remove();

    d3.select('#customChart > svg')
      .datum(props.datum)
      .call(chart);
    console.log(props.datum);
    nv.utils.windowResize(chart.update);

    return chart;
  });

  const { svgHeight } = props;
  return (
    <div id="customChart">
      <StyledSvg height={svgHeight} />
    </div>
  );
};
export default CustomChart;
