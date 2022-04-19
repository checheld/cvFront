import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';

const axiosDelProject = (id: string) => { 
  return axios.delete(
    `http://localhost:3001/projects/${id}`
  )
}

export default function* deltProjectFetch(id: string) {
  try{
    const delProjectResponse: AxiosResponse<IProject> = yield call(axiosDelProject, id);
    yield put({type: projectsActions.DEL_PROJECT_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

