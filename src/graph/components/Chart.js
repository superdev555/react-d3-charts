import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import nv from 'nvd3'
import { StyledSvg } from '../styled'
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../constants'

const Chart = ({ type, datum, height }) => {
  const chart_id =
    'custom_chart_' +
    Math.random()
      .toString(36)
      .substr(2, 9)

  nv.addGraph(() => {
    let chart = {}
    if (type === GRAPH_TYPE_BAR_CHART) {
      chart = nv.models.multiBarChart()
      chart.reduceXTicks(true)
      chart.rotateLabels(0)
      chart.showControls(false)
      chart.showLegend(false)
      chart.groupSpacing(0.1)
    } else if (type === GRAPH_TYPE_LINE_CHART) {
      chart = nv.models.lineChart()
      chart.margin({ left: 100 })
      chart.useInteractiveGuideline(true)
      chart.showLegend(false)
      chart.showYAxis(true)
      chart.showXAxis(true)
    }

    chart.xAxis.tickFormat(d3.format(',.2r'))

    chart.yAxis.tickFormat(d3.format('.02f'))

    d3.select('#' + chart_id + ' > svg')
      .datum(datum)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })

  return (
    <div id={chart_id}>
      <StyledSvg height={height} />
    </div>
  )
}

Chart.propTypes = {
  type: PropTypes.number,
  datum: PropTypes.array,
  height: PropTypes.number
}

export default Chart
