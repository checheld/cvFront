import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import instance from '../axiosSetting';

const axiosDelProjectType = (id: string) =>
    instance.delete(
        `/projectTypes/${id}`
    )


export default function* deltProjectTypeFetch(id: string) {
    try {
        const delProjectTypeResponse: AxiosResponse<IProjectType> = yield call(axiosDelProjectType, id);
        yield put({ type: projectTypesActions.DEL_PROJECTTYPE_RESULT });
    }
    catch (e) {
        console.log(e)
    }
}

