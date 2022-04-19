import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getProjectResult } from '../../actionCreators/projectActionCreator';
import { IProject } from '../../interfaces/index'

const axiosGetProject = (id: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get<IProject>(
    `http://localhost:3001/projects/project/${id}`, 
      {
          headers
      }
);}

export default function* getProjectFetch(id: string) {
  try{
    const getProjectResponse: AxiosResponse<IProject>  = yield call(axiosGetProject, id);
    if(getProjectResponse.status === 200) {
      const response = getProjectResponse.data;
      yield put(getProjectResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
}