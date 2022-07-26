import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUser, IEducation, IWorkExperience, ITechnology } from '../../interfaces/index'
import { usersActions } from '../../actionsTypes/usersActionTypes';
import instance from '../axiosSetting';

const axiosEditUser = (payload: { id: string, firstName: string, lastName: string, description: string, educationList: IEducation[], workExperienceList: IWorkExperience[], technologyList: ITechnology[], photoUrl?: string, photoParamsId?: string }, id: number) =>

  instance.put(
    `/users/${id}`,
    payload
  )


export default function* editUserFetch(payload: { id: string, firstName: string, lastName: string, description: string, educationList: IEducation[], workExperienceList: IWorkExperience[], technologyList: ITechnology[], photoUrl?: string, photoParamsId?: string }, id: number) {
  try {
    const updatUserResponse: AxiosResponse<IUser> = yield call(axiosEditUser, payload, id);
    yield put({ type: usersActions.EDIT_USER_RESULT, response: Response });
  }
  catch (e) {
    console.log(e)
  }
}

