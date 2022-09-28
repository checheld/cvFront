import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddCompany = (data: Array<ICompany>, config: any) =>
  instance.post<Array<ICompany>>(
    `/companies/add`, data, config)

export default function* addCompanyFetch(data: Array<ICompany>) {
  try {
    const addCompaniesResponse: AxiosResponse<Array<ICompany>> = yield axiosAddCompany(data, config);
    yield put({ type: companiesActions.ADD_COMPANY_RESULT, response: addCompaniesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
