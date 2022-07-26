import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { getProjectTypesResult } from '../../actionCreators/projectTypeActionCreator';
import { IProjectType } from '../../interfaces/index'
import instance from '../axiosSetting';

const axiosGetProjectTypes = () =>
    instance.get<IProjectType[]>(
        "/projectTypes"
    );

export default function* getProjectTypesFetch() {
    try {
        const getProjectTypesResponse: AxiosResponse<IProjectType[]> = yield call(axiosGetProjectTypes);
        if (getProjectTypesResponse.status === 200) {
            const response = getProjectTypesResponse.data;
            yield put(getProjectTypesResult(response));
        }
    }
    catch (e) {
        console.log(e)
    }
} 