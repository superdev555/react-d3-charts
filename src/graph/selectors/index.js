import { createSelector } from 'reselect';

const getMinDate = (state, props) => props.minDate;
const getMaxDate = (state, props) => props.maxDate;
const getGraphData = state => state.graphDataReducer.graphdata;

const getVisibleGraphData = createSelector(
  [getMinDate, getMaxDate, getGraphData],
  (minDate, maxDate, graphdata) => {
    const nGraphData = {};
    for (const c in graphdata.data) {
      if (c) {
        nGraphData[c] = graphdata.data[c].filter(val => (val[2] >= minDate && val[2] <= maxDate));
      }
    }
    return nGraphData;
  }
);
export default getVisibleGraphData;
