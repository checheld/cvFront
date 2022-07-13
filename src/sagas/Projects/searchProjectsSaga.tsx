import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes'
import instance from '../axiosSetting'

const axiosSearchProjects = (payload: { name: string, type: string, technologyName: string }) =>

  instance.post(
    `/projects/search`,
    payload
  )


export default function* searchProjectsFetch(payload: { name: string, type: string, technologyName: string }) {
  try {
    const searchProjectsResponse: AxiosResponse<IProject[]> = yield call(axiosSearchProjects, payload);
    yield put({ type: projectsActions.SEARCH_PROJECTS_RESULT, response: searchProjectsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}