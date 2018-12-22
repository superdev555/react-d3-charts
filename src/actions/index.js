import { GET_USERS_SAGA, SET_USERS, GET_GRAPH_DATA_SAGA, SET_GRAPH_DATA } from '../constants';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}
export function setGraphData(graphdata) {
  return {
    type: SET_GRAPH_DATA,
    graphdata
  };
}

//Sagas
export function getUsersSaga() {
  return {
    type: GET_USERS_SAGA
  };
}
export function getGraphDataSaga() {
  return {
    type: GET_GRAPH_DATA_SAGA
  };
}


