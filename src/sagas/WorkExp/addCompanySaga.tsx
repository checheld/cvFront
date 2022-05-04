import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';

const axiosAddCompany = (data: Array<ICompany>) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<Array<ICompany>>(
    `http://localhost:3001/companies/add`, 
    JSON.stringify(data),
      {
          headers
      }
);}

export default function* addCompanyFetch(data: Array<ICompany>) {
  try {
        const addCompaniesResponse: AxiosResponse<Array<ICompany>> = yield axiosAddCompany(data);
        yield put({type: companiesActions.ADD_COMPANY_RESULT, response: addCompaniesResponse.data});
      }
  catch(e) {
    console.log(e)
  }
} 
