import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddProject = (data: IProject, config: any) =>

  instance.post<Array<IProject>>(
    `/projects/add`,
    data,
    config
  );


export default function* addProjectFetch(data: IProject) {
  try {
    const addProjectsResponse: AxiosResponse<Array<IProject>> = yield axiosAddProject(data, config);
    yield put({ type: projectsActions.ADD_PROJECT_RESULT, response: addProjectsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
