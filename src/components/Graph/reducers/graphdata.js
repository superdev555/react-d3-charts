import { SET_GRAPH_DATA } from '../constants';

const initialState = { graphdata: {} };

const graphDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRAPH_DATA:
      return {
        ...state,
        graphdata: action.graphdata,
      };
    default:
      return state;
  }
};

export default graphDataReducer;
