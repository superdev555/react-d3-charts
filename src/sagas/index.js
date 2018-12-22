import { all, fork } from 'redux-saga/effects';

import watchGetUsersSaga from './watchers/getUsers';
import watchGetGraphDataSaga from './watchers/getGraphData';

export default function* root() {
  yield all([
    fork(watchGetUsersSaga),
    fork(watchGetGraphDataSaga),
  ]);
}
