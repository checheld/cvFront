import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUserResult } from '../../actionCreators/userActionCreator';
import { IUser } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetUser = (id: number, config: any) =>

  instance.get<IUser>(
    `/users/${id}`,
    config
  );

export default function* getUserFetch(id: number) {
  try {
    const getUserResponse: AxiosResponse<IUser> = yield call(axiosGetUser, id, config);
    if (getUserResponse.status === 200) {
      const response = getUserResponse.data;
      yield put(getUserResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}