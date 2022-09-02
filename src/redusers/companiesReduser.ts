import { companiesActions } from "../actionsTypes/companiesActionTypes"
import { ICompany, action } from "../interfaces/index"

interface companiesReduser {
  companies: ICompany[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: companiesReduser = {
  companies: [],
  isLoading: {
    get: false,
    getAll: true,
    add: false,
    delete: false,
    edit: false,
    search: false,
  },
  result: {
    add: null,
    delete: null,
    edit: null,
    search: null,
  }
}

export const companiesReducer = (state = initialState, action: action): companiesReduser => {

  switch (action.type) {
    case companiesActions.GET_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: true },
      };

    case companiesActions.GET_COMPANIES_RESULT:
      let companies: ICompany[] = action.payload
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        companies: companies.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case companiesActions.DEL_COMPANY_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: false }, result: {
          ...state.result, delete: null
        }
      };

    case companiesActions.DEL_COMPANY_RESULT:

      let delComp: string = action.response;
      let AllCompanies = state.companies;
      let newArray = AllCompanies.filter(function (f) { return f.id !== delComp })

      return {
        ...state,
        isLoading: { ...state.isLoading, delete: true },
        result: {
          ...state.result
        },
        companies: newArray
      };

    case companiesActions.ADD_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        }
      };

    case companiesActions.ADD_COMPANY_RESULT:

      let addedCompanies: ICompany[] = action.response
      let AllComp = state.companies;
      addedCompanies.map((comp) => AllComp.push(comp));

      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: true
        },
        result: {
          ...state.result, add: action.response
        },
        companies: AllComp
      }

    case companiesActions.EDIT_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        }
      };

    case companiesActions.EDIT_COMPANY_RESULT:

      let updateC: ICompany = action.response;
      let newArrayWithUpdatedComp = state.companies.filter(function (f) { return f.id !== updateC.id })
      newArrayWithUpdatedComp.push(updateC)

      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        },
        result: {
          ...state.result, edit: action.response
        },
        companies: newArrayWithUpdatedComp
      }

    case companiesActions.SEARCH_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case companiesActions.SEARCH_COMPANIES_RESULT:
      let uni: ICompany[] = action.response
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        companies: uni.sort((a, b) => Number(a.name) - Number(b.name))
      };

    default:
      return state
  };
}