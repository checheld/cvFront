import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUsersResult } from '../../actionCreators/userActionCreator';
import { IUser } from '../../interfaces/index'
import instance from '../axiosSetting';

const axiosGetUsers = () =>

  instance.get<IUser[]>(
    "/users",
  );


export default function* getUsersFetch() {
  try {
    const getUsersResponse: AxiosResponse<IUser[]> = yield call(axiosGetUsers);
    if (getUsersResponse.status === 200) {
      const response = getUsersResponse.data;
      yield put(getUsersResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}