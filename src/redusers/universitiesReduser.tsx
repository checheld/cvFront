import { universitiesActions } from "../actionsTypes/universitiesActionTypes"
import { IUniversity, action, UserMapper } from "../interfaces/index"

interface universitiesReduser {
  universities: IUniversity[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
  }
  result: {
    add: any,
    delete: null | string,
    edit: null | string,
  }
}

export const initialState: universitiesReduser = {
  universities: [],
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

export const universitiesReducer = (state = initialState, action: action):universitiesReduser => {

  switch (action.type) {
    case universitiesActions.GET_UNIVERSITIES_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, get: true},
      };

    case universitiesActions.GET_UNIVERSITIES_RESULT:
      let universities: IUniversity[] = action.payload.map((x: any) => UserMapper(x))
      return {
        ...state,
        isLoading: {...state.isLoading, get: false},
        universities: universities.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case universitiesActions.DEL_UNIVERSITY_REQUEST:
      return {...state, isLoading: {...state.isLoading, delete: true}, result: {
        ...state.result, delete: null
      }
    };

    case universitiesActions.DEL_UNIVERSITY_RESULT:
      return {
        ...state, 
        isLoading: {...state.isLoading, delete: false},
        result: {
          ...state.result, delete: action.payload.id
        }
      };

    case universitiesActions.ADD_UNIVERSITY_REQUEST:
      return {...state,
         isLoading: {
        ...state.isLoading, get: true
      }};   

    case universitiesActions.ADD_UNIVERSITY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    default:
      return state
  };


}