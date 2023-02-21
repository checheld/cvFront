import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getProjectsResult } from '../../actionCreators/projectActionCreator';
import { IProject } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetProjects = (config: any) =>
  instance.get<IProject[]>(
    "/projects",
    config
  );

export default function* getProjectsFetch() {
  try {
    const getProjectsResponse: AxiosResponse<IProject[]> = yield call(axiosGetProjects, config);
 
    if (getProjectsResponse.status === 200) {
      const response = getProjectsResponse.data;
      yield put(getProjectsResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}