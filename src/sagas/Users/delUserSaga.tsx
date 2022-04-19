import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';

const axiosDelUser = (id: string) => { 
  return axios.delete(
    `http://localhost:3001/users/${id}`
  )
}

export default function* delUserFetch(id: string) {
  try{
    const delUserResponse: AxiosResponse<IUser> = yield call(axiosDelUser, id);
    yield put({type: usersActions.DEL_USER_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

