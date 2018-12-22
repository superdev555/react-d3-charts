import { SET_GRAPH_DATA } from '../constants';

const initialState = { graphdata: {}, targets: [] };
function getTargets(graphdata) {
  var targets = [];
  for(var target in graphdata.data) {
    targets.push(target);
  }
  console.log('targets=',targets)
  return targets;
}
export default function grahpDataReducer(state = initialState, action) {
  console.log('action.graphdata-----',action)
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
