import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getProjectResult } from '../../actionCreators/projectActionCreator';
import { IProject } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetProject = (id: number, config: any) =>

  instance.get<IProject>(
    `/projects/project/${id}`,
    config
  );

export default function* getProjectFetch(id: number) {
  try {
    const getProjectResponse: AxiosResponse<IProject> = yield call(axiosGetProject, id, config);
    if (getProjectResponse.status === 200) {
      const response = getProjectResponse.data;
      yield put(getProjectResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}