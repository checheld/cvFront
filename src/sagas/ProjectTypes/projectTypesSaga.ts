import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { getProjectTypesResult } from '../../actionCreators/projectTypeActionCreator';
import { IProjectType } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetProjectTypes = (config: any) =>
    instance.get<IProjectType[]>(
        "/projectTypes",
        config
    );

export default function* getProjectTypesFetch() {
    try {
        const getProjectTypesResponse: AxiosResponse<IProjectType[]> = yield call(axiosGetProjectTypes, config);
        if (getProjectTypesResponse.status === 200) {
            const response = getProjectTypesResponse.data;
            yield put(getProjectTypesResult(response));
        }
    }
    catch (e) {
        console.log(e)
    }
} 