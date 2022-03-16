import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';

const axiosDelCompany = (id: string) => {
  return axios.delete(
    `http://localhost:3001/companies/${id}`
  )
}

export default function* deltCompanyFetch(id: string) {
  try{
    const delCompanyResponse: AxiosResponse<ICompany> = yield call(axiosDelCompany, id);
    yield put({type: companiesActions.DEL_COMPANY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

