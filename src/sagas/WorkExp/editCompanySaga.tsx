import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';

const axiosEditCompany = (payload: string, id: number) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.put(
    `http://localhost:3001/companies/${id}`,
    JSON.stringify({Name: payload}),
    {
        headers
    }
  )
}

export default function* editCompanyFetch(payload: string, id: number) {
  try{
    const editCompanyResponse: AxiosResponse<ICompany> = yield call(axiosEditCompany, payload, id);
    yield put({type: companiesActions.EDIT_COMPANY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

