import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';
import instance from '../axiosSetting';

const axiosAddCompany = (data: Array<ICompany>) =>
  instance.post<Array<ICompany>>(
    `/companies/add`, data)

export default function* addCompanyFetch(data: Array<ICompany>) {
  try {
    const addCompaniesResponse: AxiosResponse<Array<ICompany>> = yield axiosAddCompany(data);
    yield put({ type: companiesActions.ADD_COMPANY_RESULT, response: addCompaniesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
