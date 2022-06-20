import { universitiesActions } from "../actionsTypes/universitiesActionTypes"
import { IUniversity, action, UniversitiesMapper } from "../interfaces/index"

interface universitiesReduser {
  universities: IUniversity[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    search: boolean
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: universitiesReduser = {
  universities: [],
  isLoading: {
    get: false,
    add: false,
    delete: false,
    edit: false,
    search: false
  },
  result: {
    add: null,
    delete: null,
    edit: null,
    search: null,
  }
}

export const universitiesReducer = (state = initialState, action: action): universitiesReduser => {

  switch (action.type) {
    case universitiesActions.GET_UNIVERSITIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: true },
      };

    case universitiesActions.GET_UNIVERSITIES_RESULT:
      let universities: IUniversity[] = action.payload.map((x: IUniversity) => UniversitiesMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, get: false },
        universities: universities.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case universitiesActions.DEL_UNIVERSITY_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: true }, result: {
          ...state.result, delete: null
        }
      };

    case universitiesActions.DEL_UNIVERSITY_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, delete: false },
        result: {
          ...state.result
        }
      };

    case universitiesActions.ADD_UNIVERSITY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, get: true
        }
      };

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

    case universitiesActions.EDIT_UNIVERSITY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        }
      };

    case universitiesActions.EDIT_UNIVERSITY_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    case universitiesActions.SEARCH_UNIVERSITIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
      };

    case universitiesActions.SEARCH_UNIVERSITIES_RESULT:
      let uni: IUniversity[] = action.response.map((x: IUniversity) => UniversitiesMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
        universities: uni.sort((a, b) => Number(a.name) - Number(b.name))
      };

    default:
      return state
  };
}