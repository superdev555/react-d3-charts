import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_GRAPH_DATA_SAGA } from '../../constants';
import { setGraphData } from '../../actions';
import { getGraphData } from '../../../../lib/api';

function* workerGetGraphDataSaga(action) {
  const { param } = action;
  const graphdata = yield call(getGraphData, param);
  yield put(setGraphData(graphdata));
}

export default function* watchGetGraphDataSaga() {
  yield takeLatest(GET_GRAPH_DATA_SAGA, workerGetGraphDataSaga);
}
