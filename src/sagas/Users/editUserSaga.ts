import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser, IEducation, IWorkExperience, ITechnology } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditUser = (payload: { id: number, firstName: string, lastName: string, description: string, educationList: IEducation[], workExperienceList: IWorkExperience[], technologyList: ITechnology[], photoUrl?: string, photoParamsId?: number }, id: number, config: any) =>

  instance.put(
    `/users/${id}`,
    payload,
    config
  )


export default function* editUserFetch(payload: { id: number, firstName: string, lastName: string, description: string, educationList: IEducation[], workExperienceList: IWorkExperience[], technologyList: ITechnology[], photoUrl?: string, photoParamsId?: number }, id: number) {
  try {
    const updatUserResponse: AxiosResponse<IUser> = yield call(axiosEditUser, payload, id, config);
    yield put({ type: usersActions.EDIT_USER_RESULT, response: updatUserResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

