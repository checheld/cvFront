import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddProjectType = (data: Array<IProjectType>, config: any) => {

    return instance.post<Array<IProjectType>>(
        `/projectTypes/add`,
        data,
        config
    );
}

export default function* addProjectTypeFetch(data: Array<IProjectType>) {
    try {
        const addprojectTypesResponse: AxiosResponse<Array<IProjectType>> = yield axiosAddProjectType(data, config);
        yield put({ type: projectTypesActions.ADD_PROJECTTYPE_RESULT, response: addprojectTypesResponse.data });
    }
    catch (e) {
        console.log(e)
    }
} 
