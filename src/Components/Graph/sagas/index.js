import { all, fork } from 'redux-saga/effects';

import watchGetGraphDataSaga from './watchers/getGraphData';

export default function* root() {
  yield all([
    fork(watchGetGraphDataSaga),
  ]);
}
