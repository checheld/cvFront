import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import instance from '../axiosSetting';

const axiosDelProject = (id: string) =>
  instance.delete(
    `/projects/${id}`
  )

export default function* deltProjectFetch(id: string) {
  try {
    const delProjectResponse: AxiosResponse<IProject> = yield call(axiosDelProject, id);
    yield put({ type: projectsActions.DEL_PROJECT_RESULT, response: delProjectResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

