import { createSelector } from 'reselect';

const getMinDate = (state, props) => props.minDate;
const getMaxDate = (state, props) => props.maxDate;
const getGraphData = state => state.graphData;
const getTargets = (state, props, targets) => targets;

const getFilteredGraphData = createSelector(
  [getMinDate, getMaxDate, getGraphData, getTargets],
  (minDate, maxDate, graphData, targets) => {
    const nGraphData = {};
    for (const c in graphData.data) {
      if (targets.includes(c)) {
        nGraphData[c] = graphData.data[c].filter(val => (val[2] >= minDate && val[2] <= maxDate));
      }
    }
    return nGraphData;
  }
);
export default getFilteredGraphData;
