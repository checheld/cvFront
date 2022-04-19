import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject, ITechnology } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';

const axiosEditProject = (payload: {name: string, type: string, description: string, country: string, link: string, technologyList: ITechnology[]}, id: number) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  return axios.put(
    `http://localhost:3001/projects/${id}`,
    JSON.stringify(payload),
    {
        headers
    }
  )
}

export default function* editProjectFetch(payload: {name: string, type: string, description: string, country: string, link: string, technologyList: ITechnology[]}, id: number) {
  try{
    const updatProjectResponse: AxiosResponse<IProject> = yield call(axiosEditProject, payload, id);
    yield put({type: projectsActions.EDIT_PROJECT_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

