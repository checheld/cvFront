import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes'
import instance from '../axiosSetting'
import config from '../headers';

const axiosSearchCompanies = (payload: string, config: any) =>

  instance.get(
    `/companies/search/${payload}`,
    config
  )


export default function* searchCompaniesFetch(payload: string) {
  try {
    const searchCompaniesResponse: AxiosResponse<ICompany[]> = yield call(axiosSearchCompanies, payload, config);

    yield put({ type: companiesActions.SEARCH_COMPANIES_RESULT, response: searchCompaniesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}