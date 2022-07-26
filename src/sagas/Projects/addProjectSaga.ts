import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProject } from '../../interfaces/index'
import { projectsActions } from '../../actionsTypes/projectsActionTypes';
import instance from '../axiosSetting';

const axiosAddProject = (data: Array<IProject>) =>

  instance.post<Array<IProject>>(
    `/projects/add`,
    data
  );


export default function* addProjectFetch(data: Array<IProject>) {
  try {
    const addProjectsResponse: AxiosResponse<Array<IProject>> = yield axiosAddProject(data);
    yield put({ type: projectsActions.ADD_PROJECT_RESULT, response: addProjectsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
