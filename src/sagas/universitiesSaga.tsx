import { put, call, takeLatest } from 'redux-saga/effects'
import {universitiesActions} from '../actionsTypes/universitiesActionTypes'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../interfaces/index'
import { getUniversitiesRequest, getUniversitiesResult } from '../actionCreators/universityActionCreator';

const axiosGetUniversities = () => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
 
  return axios.get<IUniversity[]>(
    "http://localhost:3001/universities", 
      {
          headers
      }
);}

export default function* getUniversitiesFetch() {
  try{
    const getUniversitiesResponse: AxiosResponse<IUniversity[]>  = yield call(axiosGetUniversities);
    if(getUniversitiesResponse.status === 200) {
      const response = getUniversitiesResponse.data;
      yield put(getUniversitiesResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
} 





// function* fetchUniversities() {
// //  let response = yield fetch('https://test-api-post.herokuapp.com/posts/all', {
//   let response = (array: string[]) =>  yield fetch('http://localhost:3000/universities/all', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//     // 'Authorization': localStorage.getItem('token'),
//   }
// })
// .then(response => response.json())

// yield put({type: universitiesActions.GET_UNIVERSITIES_RESULT, response: response})
// }

// function* watchFetchUniversities() {
//   yield takeLatest(universitiesActions.GET_UNIVERSITIES_REQUEST, fetchUniversities)
// }

// export default watchFetchUniversities