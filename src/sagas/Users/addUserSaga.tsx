import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';

const axiosAddUser = (data: Array<IUser>) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<any>(
    `http://localhost:3001/users/add`, 
    JSON.stringify(data),
      {
          headers
      }
);}

export default function* addUserFetch(data: Array<IUser>) {
  try {
        const addUsersResponse: AxiosResponse<any> = yield axiosAddUser(data);
        yield put({type: usersActions.ADD_USER_RESULT, response: addUsersResponse.data});
      }
  catch(e) {
    console.log(e)
  }
} 
