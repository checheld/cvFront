import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUserResult } from '../../actionCreators/userActionCreator';
import { IUser } from '../../interfaces/index'

const axiosGetUser = (id: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get<IUser>(
    `http://localhost:3001/users/${id}`, 
      {
          headers
      }
);}

export default function* getUserFetch(id: string) {
  try{
    const getUserResponse: AxiosResponse<IUser>  = yield call(axiosGetUser, id);
    if(getUserResponse.status === 200) {
      const response = getUserResponse.data;
      yield put(getUserResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
}