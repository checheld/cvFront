import { call, takeEvery } from 'redux-saga/effects'
import getUniversitiesFetch from './Education/universitiesSaga';
import deltUniversityFetch from './Education/delUniveersitySaga';
import {getUniversitiesRequestAction, universitiesActions, delUniversityRequestAction, addUniversityRequestAction, editUniversityRequestAction} from '../actionsTypes/universitiesActionTypes';
import addUniversityFetch from './Education/addUniversitySaga';
import editUniversityFetch from './Education/editUniversitySaga'

import {getCompaniesRequestAction, companiesActions, delCompanyRequestAction, addCompanyRequestAction, editCompanyRequestAction} from '../actionsTypes/companiesActionTypes';
import getCompaniesFetch from './WorkExp/companiesSaga';
import delCompanyFetch from './WorkExp/delCompanySaga';
import addCompanyFetch from './WorkExp/addCompanySaga';
import editCompanyFetch from './WorkExp/editCompanySaga'

import {getTechnologiesRequestAction, technologiesActions, delTechnologyRequestAction, addTechnologyRequestAction, editTechnologyRequestAction} from '../actionsTypes/technologiesActionTypes';
import getTechnologiesFetch from './Technologies/technologiesSaga';
import delTechnologyFetch from './Technologies/delTechnologySaga';
import addTechnologyFetch from './Technologies/addTechnologySaga';
import editTechnologyFetch from './Technologies/editTechnologySaga'

// university
export function* getUniversities({type}:getUniversitiesRequestAction){
  yield call(getUniversitiesFetch);
}

export function* delUniversity({type, payload}:delUniversityRequestAction){
  yield call(deltUniversityFetch, payload);
}

export function* addUniversity({type, payload}:addUniversityRequestAction){
  yield call(addUniversityFetch, payload);
}

export function* editUniversity({type, payload, id}:editUniversityRequestAction){
  yield call(editUniversityFetch, payload, id);
}

// company
export function* getCompanies({type}:getCompaniesRequestAction){
  yield call(getCompaniesFetch);
}

export function* delCompany({type, payload}:delCompanyRequestAction){
  yield call(delCompanyFetch, payload);
}

export function* addCompany({type, payload}:addCompanyRequestAction){
  yield call(addCompanyFetch, payload);
}

export function* editCompany({type, payload, id}:editCompanyRequestAction){
  yield call(editCompanyFetch, payload, id);
}

// technology
export function* getTechnologies({type}:getTechnologiesRequestAction){
  yield call(getTechnologiesFetch);
}

export function* delTechnology({type, payload}:delTechnologyRequestAction){
  yield call(delTechnologyFetch, payload);
}

export function* addTechnology({type, payload}:addTechnologyRequestAction){
  yield call(addTechnologyFetch, payload);
}

export function* editTechnology({type, payload, id}:editTechnologyRequestAction){
  yield call(editTechnologyFetch, payload, id);
}

export function* watcherSaga() {
  yield takeEvery(universitiesActions.GET_UNIVERSITIES_REQUEST, getUniversities);
  yield takeEvery(universitiesActions.DEL_UNIVERSITY_REQUEST, delUniversity);
  yield takeEvery(universitiesActions.ADD_UNIVERSITY_REQUEST, addUniversity);
  yield takeEvery(universitiesActions.EDIT_UNIVERSITY_REQUEST, editUniversity);

  yield takeEvery(companiesActions.GET_COMPANIES_REQUEST, getCompanies);
  yield takeEvery(companiesActions.DEL_COMPANY_REQUEST, delCompany);
  yield takeEvery(companiesActions.ADD_COMPANY_REQUEST, addCompany);
  yield takeEvery(companiesActions.EDIT_COMPANY_REQUEST, editCompany);

  yield takeEvery(technologiesActions.GET_TECHNOLOGIES_REQUEST, getTechnologies);
  yield takeEvery(technologiesActions.DEL_TECHNOLOGY_REQUEST, delTechnology);
  yield takeEvery(technologiesActions.ADD_TECHNOLOGY_REQUEST, addTechnology);
  yield takeEvery(technologiesActions.EDIT_TECHNOLOGY_REQUEST, editTechnology);
}
export default function* rootSaga(){
  yield watcherSaga();
}
