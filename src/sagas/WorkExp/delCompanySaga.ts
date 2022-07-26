import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';
import instance from '../axiosSetting';

const axiosDelCompany = (id: string) =>
  instance.delete(
    `/companies/${id}`)


export default function* deltCompanyFetch(id: string) {
  try {
    const delCompanyResponse: AxiosResponse<ICompany> = yield call(axiosDelCompany, id);
    yield put({ type: companiesActions.DEL_COMPANY_RESULT });
  }
  catch (e) {
    console.log(e)
  }
}

