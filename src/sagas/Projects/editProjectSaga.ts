import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject, IProjectPhoto, ITechnology } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditProject = (payload: { name: string, type: string, description: string, country: string, link: string, technologyList: ITechnology[], photoList: IProjectPhoto[] }, id: number, config: any) =>

  instance.put(
    `/projects/${id}`,
    payload,
    config
  )


export default function* editProjectFetch(payload: { name: string, type: string, description: string, country: string, link: string, technologyList: ITechnology[], photoList: IProjectPhoto[] }, id: number) {
  try {
    const updatProjectResponse: AxiosResponse<IProject> = yield call(axiosEditProject, payload, id, config);
    yield put({ type: projectsActions.EDIT_PROJECT_RESULT, response: updatProjectResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

