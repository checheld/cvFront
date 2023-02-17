import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelProject = (id: number, config: any) =>
  instance.delete(
    `/projects/${id}`,
    config
  )

export default function* deltProjectFetch(id: number) {
  try {
    const delProjectResponse: AxiosResponse<IProject> = yield call(axiosDelProject, id, config);
    yield put({ type: projectsActions.DEL_PROJECT_RESULT, response: delProjectResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

