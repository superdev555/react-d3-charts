import {
  GET_GRAPH_DATA_SAGA, SET_GRAPH_DATA
} from '../constants';

export function setGraphData(graphdata) {
  return {
    type: SET_GRAPH_DATA,
    graphdata
  };
}

//Sagas
export function getGraphDataSaga(param) {
  return {
    type: GET_GRAPH_DATA_SAGA,
    param
  };
}
