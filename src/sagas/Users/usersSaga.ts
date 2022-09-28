import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUsersResult } from '../../actionCreators/userActionCreator';
import { IUser } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetUsers = (config: any) =>

  instance.get<IUser[]>(
    "/users",
    config
  );


export default function* getUsersFetch() {
  try {
    const getUsersResponse: AxiosResponse<IUser[]> = yield call(axiosGetUsers, config);
    if (getUsersResponse.status === 200) {
      const response = getUsersResponse.data;
      yield put(getUsersResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}