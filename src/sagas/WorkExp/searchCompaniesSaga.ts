import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes'
import instance from '../axiosSetting'

const axiosSearchCompanies = (payload: string) =>

  instance.get(
    `/companies/search/${payload}`
  )


export default function* searchCompaniesFetch(payload: string) {
  try {
    const searchCompaniesResponse: AxiosResponse<ICompany[]> = yield call(axiosSearchCompanies, payload);

    yield put({ type: companiesActions.SEARCH_COMPANIES_RESULT, response: searchCompaniesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}