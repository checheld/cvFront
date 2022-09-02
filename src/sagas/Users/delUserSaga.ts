import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';

const axiosDelUser = (id: string) =>
  instance.delete(
    `/users/${id}`
  )

export default function* delUserFetch(id: string) {
  try {
    const delUserResponse: AxiosResponse<IUser> = yield call(axiosDelUser, id);
    yield put({ type: usersActions.DEL_USER_RESULT, response: delUserResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

