import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditProjectType = (payload: string, id: number, config: any) =>
    instance.put(
        `/projectTypes/${id}`,
        { 'name': payload },
        config
    )


export default function* updateProjectTypeFetch(payload: string, id: number) {
    try {
        const updateProjectTypeResponse: AxiosResponse<IProjectType> = yield call(axiosEditProjectType, payload, id, config);
        yield put({ type: projectTypesActions.EDIT_PROJECTTYPE_RESULT, response: updateProjectTypeResponse.data });
    }
    catch (e) {
        console.log(e)
    }
}

