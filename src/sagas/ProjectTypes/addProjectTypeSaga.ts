import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import instance from '../axiosSetting';

const axiosAddProjectType = (data: Array<IProjectType>) => {

    return instance.post<Array<IProjectType>>(
        `/projectTypes/add`,
        data
    );
}

export default function* addProjectTypeFetch(data: Array<IProjectType>) {
    try {
        const addprojectTypesResponse: AxiosResponse<Array<IProjectType>> = yield axiosAddProjectType(data);
        yield put({ type: projectTypesActions.ADD_PROJECTTYPE_RESULT, response: addprojectTypesResponse.data });
    }
    catch (e) {
        console.log(e)
    }
} 
