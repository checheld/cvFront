import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelCompany = (id: string, config: any) =>
  instance.delete(
    `/companies/${id}`,
    config)


export default function* deltCompanyFetch(id: string) {
  try {
    const delCompanyResponse: AxiosResponse<ICompany> = yield call(axiosDelCompany, id, config);
    yield put({ type: companiesActions.DEL_COMPANY_RESULT, response: delCompanyResponse });
  }
  catch (e) {
    console.log(e)
  }
}

