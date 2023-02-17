import {
    getCompaniesResultAction,
    getCompaniesRequestAction,
    delCompanyRequestAction,
    delCompanyResultAction,
    addCompanyResultAction,
    addCompanyRequestAction,
    editCompanyRequestAction,
    editCompanyResultAction,
    searchCompaniesRequestAction,
    searchCompaniesResultAction,
    companiesActions
} from '../actionsTypes/companiesActionTypes';
import { ICompany } from "../interfaces/index";


export const getCompaniesRequest = (): getCompaniesRequestAction => {
    return {
        type: companiesActions.GET_COMPANIES_REQUEST
    }
}
export const getCompaniesResult = (companies: ICompany[]): getCompaniesResultAction => {
    return {
        type: companiesActions.GET_COMPANIES_RESULT,
        payload: companies
    }
}

export const delCompanyRequest = (id: number): delCompanyRequestAction => {
    return {
        type: companiesActions.DEL_COMPANY_REQUEST,
        id: id
    }
}

export const delCompanyResult = (): delCompanyResultAction => {
    return {
        type: companiesActions.DEL_COMPANY_RESULT
    }
}

export const addCompanyRequest = (payload: Array<ICompany>): addCompanyRequestAction => {
    return {
        type: companiesActions.ADD_COMPANY_REQUEST,
        payload: payload
    }
}

export const addCompanyResult = (): addCompanyResultAction => {
    return {
        type: companiesActions.ADD_COMPANY_RESULT
    }
}

export const editCompanyRequest = (payload: string, id: number): editCompanyRequestAction => {
    return {
        type: companiesActions.EDIT_COMPANY_REQUEST,
        payload: payload,
        id: id
    }
}

export const editCompanyResult = (): editCompanyResultAction => {
    return {
        type: companiesActions.EDIT_COMPANY_RESULT,
    }
}

export const searchCompaniesRequest = (payload: string): searchCompaniesRequestAction => {
    return {
        type: companiesActions.SEARCH_COMPANIES_REQUEST,
        payload: payload
    }
}

export const searchCompaniesResult = (searchCompanies: ICompany[]): searchCompaniesResultAction => {
    return {
        type: companiesActions.SEARCH_COMPANIES_RESULT,
        payload: searchCompanies
    }
}