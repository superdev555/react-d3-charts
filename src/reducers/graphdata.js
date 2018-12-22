import { SET_GRAPH_DATA } from '../constants';

const initialState = { graphdata: {}, targets: [] };
function getTargets(graphdata) {
  const targets = [];
  let index = 0;
  for (const key in graphdata.data) {
    if (key) targets.push({ value: index++, text: key });
  }
  return targets;
}
export default function grahpDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GRAPH_DATA:
      return {
        ...state,
        graphdata: action.graphdata,
        targets: getTargets(action.graphdata),
      };
    default:
      return state;
  }
}
