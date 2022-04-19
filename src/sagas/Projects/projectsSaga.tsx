import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getProjectsResult } from '../../actionCreators/projectActionCreator';
import { IProject } from '../../interfaces/index'

const axiosGetProjects = () => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
 
  return axios.get<IProject[]>(
    "http://localhost:3001/projects", 
      {
          headers
      }
);}

export default function* getProjectsFetch() {
  try{
    const getProjectsResponse: AxiosResponse<IProject[]>  = yield call(axiosGetProjects);
    if(getProjectsResponse.status === 200) {
      const response = getProjectsResponse.data;
      yield put(getProjectsResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
}