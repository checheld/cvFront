import { call, takeEvery } from 'redux-saga/effects'
import getUniversitiesFetch from './universitiesSaga';
import deltUniversityFetch from './delUniveersitySaga';
import {getUniversitiesRequestAction, universitiesActions, delUniversityRequestAction, addUniversityRequestAction} from '../actionsTypes/universitiesActionTypes';
import addUniversityFetch from './addUniversitySaga';

export function* getUniversities({type}:getUniversitiesRequestAction){
  yield call(getUniversitiesFetch);
}

export function* delUniversity({type, payload}:delUniversityRequestAction){
  yield call(deltUniversityFetch, payload);
}

export function* addUniversity({type, payload}:addUniversityRequestAction){
  yield call(addUniversityFetch, payload);
}

export function* watcherSaga() {
  yield takeEvery(universitiesActions.GET_UNIVERSITIES_REQUEST, getUniversities);
  yield takeEvery(universitiesActions.DEL_UNIVERSITY_REQUEST, delUniversity);
  yield takeEvery(universitiesActions.ADD_UNIVERSITY_REQUEST, addUniversity);
}
export default function* rootSaga(){
  yield watcherSaga();
}
// export function* rootSaga() {
//   yield all ([
//     watchFetchUniversities(),
//   ])
// }