import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes'
import instance from '../axiosSetting'
import config from '../headers';

const axiosSearchUsers = (payload: string, config: any) =>
  instance.get(
    `/users/search/${payload}`,
    config
  )


export default function* searchUsersFetch(payload: string) {
  try {
    const searchUsersResponse: AxiosResponse<IUser[]> = yield call(axiosSearchUsers, payload, config);
    yield put({ type: usersActions.SEARCH_USERS_RESULT, response: searchUsersResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}