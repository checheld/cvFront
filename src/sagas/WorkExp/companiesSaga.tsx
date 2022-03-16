import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getCompaniesResult } from '../../actionCreators/companyActionCreator';
import { ICompany } from '../../interfaces/index'
const axiosGetCompanies = () => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
 
  return axios.get<ICompany[]>(
    "http://localhost:3001/companies", 
      {
          headers
      }
);}

export default function* getCompaniesFetch() {
  try{
    const getCompaniesResponse: AxiosResponse<ICompany[]>  = yield call(axiosGetCompanies);
    if(getCompaniesResponse.status === 200) {
      const response = getCompaniesResponse.data;
      yield put(getCompaniesResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
} 
