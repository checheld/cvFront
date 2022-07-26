import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUserResult } from '../../actionCreators/userActionCreator';
import { IUser } from '../../interfaces/index'
import instance from '../axiosSetting';

const axiosGetUser = (id: string) =>

  instance.get<IUser>(
    `/users/${id}`,
  );

export default function* getUserFetch(id: string) {
  try {
    const getUserResponse: AxiosResponse<IUser> = yield call(axiosGetUser, id);
    if (getUserResponse.status === 200) {
      const response = getUserResponse.data;
      yield put(getUserResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}