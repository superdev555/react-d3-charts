import React from 'react';
import * as d3 from 'd3';
import nv from 'nvd3';
import { StyledSvg } from './styled';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from './constants';

const Chart = (props) => {
  nv.addGraph(() => {
    let chart = {};
    const { type } = props;
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
      .tickFormat(d3.format(',.2r'));

    chart.yAxis
      .tickFormat(d3.format('.02f'));

    d3.select('#customChart > svg')
      .datum(props.datum)
      .call(chart);
    nv.utils.windowResize(chart.update);

    return chart;
  });

  const { height } = props;
  return (
    <div id="customChart">
      <StyledSvg height={height} />
    </div>
  );
};
export default Chart;
