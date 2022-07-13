import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getProjectResult } from '../../actionCreators/projectActionCreator';
import { IProject } from '../../interfaces/index'
import instance from '../axiosSetting';

const axiosGetProject = (id: string) =>

  instance.get<IProject>(
    `/projects/project/${id}`,
  );

export default function* getProjectFetch(id: string) {
  try {
    const getProjectResponse: AxiosResponse<IProject> = yield call(axiosGetProject, id);
    if (getProjectResponse.status === 200) {
      const response = getProjectResponse.data;
      yield put(getProjectResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}