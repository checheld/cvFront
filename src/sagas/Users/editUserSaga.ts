import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser, IEducation, IWorkExperience, ITechnology, IPhotoParams } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditUser = (payload: { id: number, firstName: string, lastName: string, description: string, educations: IEducation[], workExperiences: IWorkExperience[], technologies: ITechnology[], photoUrl?: string, photoParams?: any }, id: number, config: any) =>

  instance.put(
    `/users/${id}`,
    payload,
    config
  )


export default function* editUserFetch(payload: { id: number, firstName: string, lastName: string, description: string, educations: IEducation[], workExperiences: IWorkExperience[], technologies: ITechnology[], photoUrl?: string, photoParams?: any }, id: number) {
  try {
    const updatUserResponse: AxiosResponse<IUser> = yield call(axiosEditUser, payload, id, config);
    yield put({ type: usersActions.EDIT_USER_RESULT, response: updatUserResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

