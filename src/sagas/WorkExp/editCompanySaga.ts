import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICompany } from '../../interfaces/index'
import { companiesActions } from '../../actionsTypes/companiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditCompany = (payload: string, id: number, config: any) =>

  instance.put(
    `/companies/${id}`,
    { Name: payload },
    config
  )


export default function* editCompanyFetch(payload: string, id: number) {
  try {
    const editCompanyResponse: AxiosResponse<ICompany> = yield call(axiosEditCompany, payload, id, config);
    yield put({ type: companiesActions.EDIT_COMPANY_RESULT, response: editCompanyResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

