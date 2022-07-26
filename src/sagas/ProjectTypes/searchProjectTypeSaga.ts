import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes'
import instance from '../axiosSetting'

const axiosSearchProjectType = (payload: string) =>
    instance.get(
        `/projectTypes/search/${payload}`
    )

export default function* searchProjectTypesFetch(payload: string) {
    try {
        const searchProjectTypesResponse: AxiosResponse<IProjectType[]> = yield call(axiosSearchProjectType, payload);
        yield put({ type: projectTypesActions.SEARCH_PROJECTTYPES_RESULT, response: searchProjectTypesResponse.data });
    }
    catch (e) {
        console.log(e)
    }
}