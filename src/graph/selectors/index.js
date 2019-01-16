import { createSelector } from 'reselect'

const getGraphData = state => state.graphData

const getFormatedGraphData = createSelector(
  [getGraphData],
  graphData => {
    const data = graphData.data
    if (data == undefined) {
      return []
    }
    const nGraphData = []
    if (data.length > 0) {
      var values = [],
        index = 0
      for (const c in data) {
        if (c) {
          values.push({
            x: index++,
            y: data[c][0] == null ? 0 : data[c][0]
          })
        }
      }
      nGraphData.push({
        key: 'data',
        values
      })
    }
    return nGraphData
  }
)

export default getFormatedGraphData
