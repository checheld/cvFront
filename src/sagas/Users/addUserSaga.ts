import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';
import config from '../headers';
const axiosAddUser = (data: IUser, config: any) =>

  instance.post<IUser>(
    `/user/add`,
    data,
    config
  );


export default function* addUserFetch(data: IUser) {
  try {
    const addUsersResponse: AxiosResponse<IUser> = yield axiosAddUser(data, config);
    yield put({ type: usersActions.ADD_USER_RESULT, response: addUsersResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
