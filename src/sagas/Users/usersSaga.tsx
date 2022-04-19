import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUsersResult } from '../../actionCreators/userActionCreator';
import { IUser } from '../../interfaces/index'

const axiosGetUsers = () => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
 
  return axios.get<IUser[]>(
    "http://localhost:3001/users", 
      {
          headers
      }
);}

export default function* getUsersFetch() {
  try{
    const getUsersResponse: AxiosResponse<IUser[]>  = yield call(axiosGetUsers);
    if(getUsersResponse.status === 200) {
      const response = getUsersResponse.data;
      yield put(getUsersResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
}