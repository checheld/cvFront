import { companiesActions } from "../actionsTypes/companiesActionTypes"
import { ICompany, action, UserMapper } from "../interfaces/index"

interface companiesReduser {
  companies: ICompany[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
  }
}

export const initialState: companiesReduser = {
  companies: [],
  isLoading: {
    get: false,
    add: false,
    delete: false,
    edit: false,
  },
  result: {
    add: null,
    delete: null,
    edit: null,
  }
}

export const companiesReducer = (state = initialState, action: action):companiesReduser => {

  switch (action.type) {
    case companiesActions.GET_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, get: true},
      };

    case companiesActions.GET_COMPANIES_RESULT:
      let companies: ICompany[] = action.payload.map((x: ICompany) => UserMapper(x))
      return {
        ...state,
        isLoading: {...state.isLoading, get: false},
        companies: companies.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case companiesActions.DEL_COMPANY_REQUEST:
      return {...state, isLoading: {...state.isLoading, delete: true}, result: {
        ...state.result, delete: null
      }
    };

    case companiesActions.DEL_COMPANY_RESULT:
      return {
        ...state, 
        isLoading: {...state.isLoading, delete: false},
        result: {
          ...state.result, delete: action.payload.id
        }
      };

    case companiesActions.ADD_COMPANY_REQUEST:
      return {...state,
         isLoading: {
        ...state.isLoading, get: true
      }};   

    case companiesActions.ADD_COMPANY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case companiesActions.EDIT_COMPANY_REQUEST:
      return {...state,
          isLoading: {
        ...state.isLoading, edit: true
      }}; 

    case companiesActions.EDIT_COMPANY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    default:
      return state
  };
}