import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes'

const axiosSearchUsers = (payload: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get(
    `http://localhost:3001/users/search/${payload}`,
    {
      headers
    }
  )
}

export default function* searchUsersFetch(payload: string) {
  try {
    const searchUsersResponse: AxiosResponse<IUser[]> = yield call(axiosSearchUsers, payload);
    yield put({ type: usersActions.SEARCH_USERS_RESULT, response: searchUsersResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}