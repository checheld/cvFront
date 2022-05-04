import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';

const axiosAddProject = (data: Array<IProject>) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<Array<IProject>>(
    `http://localhost:3001/projects/add`, 
    JSON.stringify(data),
      {
          headers
      }
);}

export default function* addProjectFetch(data: Array<IProject>) {
  try {
        const addProjectsResponse: AxiosResponse<Array<IProject>> = yield axiosAddProject(data);
        yield put({type: projectsActions.ADD_PROJECT_RESULT, response: addProjectsResponse.data});
      }
  catch(e) {
    console.log(e)
  }
} 
