import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject, IProjectPhoto, ITechnology } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import instance from '../axiosSetting';

const axiosEditProject = (payload: { name: string, type: string, description: string, country: string, link: string, technologyList: ITechnology[], photoList: IProjectPhoto[] }, id: number) =>

  instance.put(
    `/projects/${id}`,
    payload
  )


export default function* editProjectFetch(payload: { name: string, type: string, description: string, country: string, link: string, technologyList: ITechnology[], photoList: IProjectPhoto[] }, id: number) {
  try {
    console.log(payload)
    const updatProjectResponse: AxiosResponse<IProject> = yield call(axiosEditProject, payload, id);
    yield put({ type: projectsActions.EDIT_PROJECT_RESULT, response: Response });
  }
  catch (e) {
    console.log(e)
  }
}

