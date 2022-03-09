import { call, takeEvery } from 'redux-saga/effects'
import getUniversitiesFetch from './universitiesSaga';
import deltUniversityFetch from './delUniveersitySaga';
import {getUniversitiesRequestAction, universitiesActions, delUniversityRequestAction} from '../actionsTypes/universitiesActionTypes';

export function* getUniversities({type}:getUniversitiesRequestAction){
  yield call(getUniversitiesFetch);
}

export function* delUniversity({type, payload}:delUniversityRequestAction){
  yield call(deltUniversityFetch, payload);
}

export function* watcherSaga() {
  yield takeEvery(universitiesActions.GET_UNIVERSITIES_REQUEST, getUniversities);
  yield takeEvery(universitiesActions.DEL_UNIVERSITY_REQUEST, delUniversity);
}
export default function* rootSaga(){
  yield watcherSaga();
}
// export function* rootSaga() {
//   yield all ([
//     watchFetchUniversities(),
//   ])
// }