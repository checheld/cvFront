import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getProjectsResult } from '../../actionCreators/projectActionCreator';
import { IProject } from '../../interfaces/index'
import instance from '../axiosSetting';

const axiosGetProjects = () =>
  instance.get<IProject[]>(
    "/projects",
  );

export default function* getProjectsFetch() {
  try {
    const getProjectsResponse: AxiosResponse<IProject[]> = yield call(axiosGetProjects);
    if (getProjectsResponse.status === 200) {
      const response = getProjectsResponse.data;
      yield put(getProjectsResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}