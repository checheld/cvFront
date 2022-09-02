import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import instance from '../axiosSetting';

const axiosEditProjectType = (payload: string, id: number) =>
    instance.put(
        `/projectTypes/${id}`,
        { Name: payload }
    )


export default function* updateProjectTypeFetch(payload: string, id: number) {
    try {
        const updateProjectTypeResponse: AxiosResponse<IProjectType> = yield call(axiosEditProjectType, payload, id);
        yield put({ type: projectTypesActions.EDIT_PROJECTTYPE_RESULT, response: updateProjectTypeResponse.data });
    }
    catch (e) {
        console.log(e)
    }
}

