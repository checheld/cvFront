import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelUser = (id: string, config: any) =>
  instance.delete(
    `/users/${id}`,
    config
  )

export default function* delUserFetch(id: string) {
  try {
    const delUserResponse: AxiosResponse<IUser> = yield call(axiosDelUser, id, config);
    yield put({ type: usersActions.DEL_USER_RESULT, response: delUserResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

