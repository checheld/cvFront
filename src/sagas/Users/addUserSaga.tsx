import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';

const axiosAddUser = (data: IUser) =>

  instance.post<IUser>(
    `/user/add`,
    data
  );


export default function* addUserFetch(data: IUser) {
  try {
    const addUsersResponse: AxiosResponse<IUser> = yield axiosAddUser(data);
    yield put({ type: usersActions.ADD_USER_RESULT, response: addUsersResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
