import { ICompany } from "../interfaces/index";

export enum companiesActions {
    GET_COMPANIES_REQUEST = 'GET_COMPANIES_REQUEST',
    GET_COMPANIES_RESULT = 'GET_COMPANIES_RESULT',
    DEL_COMPANY_REQUEST = 'DEL_COMPANY_REQUEST',
    DEL_COMPANY_RESULT = 'DEL_COMPANY_RESULT',
    ADD_COMPANY_REQUEST = 'ADD_COMPANY_REQUEST',
    ADD_COMPANY_RESULT = 'ADD_COMPANY_RESULT',
    EDIT_COMPANY_REQUEST = 'EDIT_COMPANY_REQUEST',
    EDIT_COMPANY_RESULT = "EDIT_COMPANY_RESULT",
    SEARCH_COMPANIES_REQUEST = 'SEARCH_COMPANIES_REQUEST',
    SEARCH_COMPANIES_RESULT = "SEARCH_COMPANIES_RESULT"
}

export interface getCompaniesResultAction {
    type: string,
    payload: ICompany[]
}

export interface getCompaniesRequestAction {
    type: string
}

export interface delCompanyRequestAction {
    type: string,
    id: number
}

export interface delCompanyResultAction {
    type: string
}

export interface addCompanyRequestAction {
    type: string,
    payload: Array<ICompany>
}

export interface addCompanyResultAction {
    type: string
}

export interface editCompanyRequestAction {
    type: string,
    payload: string,
    id: number
}

export interface editCompanyResultAction {
    type: string,
}

export interface searchCompaniesRequestAction {
    type: string,
    payload: string
}

export interface searchCompaniesResultAction {
    type: string,
    payload: ICompany[]
}
