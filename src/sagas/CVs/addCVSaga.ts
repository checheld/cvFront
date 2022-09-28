import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddCV = (data: ICV, config: any) =>

  instance.post<ICV>(
    `/CV/add`,
    data,
    config
  );


export default function* addCVFetch(data: ICV) {
  try {
    const addCVsResponse: AxiosResponse<ICV> = yield axiosAddCV(data, config);
    yield put({ type: CVsActions.ADD_CV_RESULT, response: addCVsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
