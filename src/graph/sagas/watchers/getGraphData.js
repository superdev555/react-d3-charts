import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_GRAPH_DATA_SAGA } from '../../constants';
import { setGraphData } from '../../actions';
import getGraphData from '../../api';

function* workerGetGraphDataSaga(action) {
  const { param } = action;
  const response = yield call(getGraphData, param);
  console.log(response);
  if (response.type === 'FETCH_GRAPHDATA_SUCCESSED') {
    yield put(setGraphData(response.payload));
  } else if (response.type === 'FETCH_GRAPHDATA_REJECTED') {
    console.log(response.payload);
  }
}

export default function* watchGetGraphDataSaga() {
  yield takeLatest(GET_GRAPH_DATA_SAGA, workerGetGraphDataSaga);
}
