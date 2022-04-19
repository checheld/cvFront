import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes'

const axiosSearchCompanies = (payload: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get(
    `http://localhost:3001/companies/search/${payload}`,
    {
      headers
    }
  )
}

export default function* searchCompaniesFetch(payload: string) {
  try {
    const searchCompaniesResponse: AxiosResponse<ICompany[]> = yield call(axiosSearchCompanies, payload);
    
    yield put({ type: companiesActions.SEARCH_COMPANIES_RESULT, response: searchCompaniesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}