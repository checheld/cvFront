import { CVsActions } from "../actionsTypes/CVsActionTypes"
import { ICV, action, CVsMapper } from "../interfaces/index"

interface CVsReduser {
  CVs: ICV[],
  CV?: ICV,
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

export const initialState: CVsReduser = {
  CVs: [],
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

export const CVsReducer = (state = initialState, action: action): CVsReduser => {

  switch (action.type) {
    case CVsActions.GET_CVS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: true },
      };

    case CVsActions.GET_CVS_RESULT:
      let CVs: ICV[] = action.payload.map((x: ICV) => CVsMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, get: false },
        CVs: CVs.sort((a, b) => Number(a.cvName) - Number(b.cvName))
      };

    case CVsActions.GET_CV_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: true },
      };

    case CVsActions.GET_CV_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: false },
        CV: action.payload
      };

    case CVsActions.DEL_CV_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: true }, result: {
          ...state.result, delete: null
        }
      };

    case CVsActions.DEL_CV_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, delete: false },
        result: {
          ...state.result, delete: action.payload.id
        }
      };

    case CVsActions.ADD_CV_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, get: true
        }
      };

    case CVsActions.ADD_CV_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case CVsActions.EDIT_CV_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        }
      };

    case CVsActions.EDIT_CV_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    case CVsActions.SEARCH_CVS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
      };

    case CVsActions.SEARCH_CVS_RESULT:
      let foundCVs: ICV[] = action.response.map((x: ICV) => CVsMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
        CVs: foundCVs.sort((a, b) => Number(a.cvName) - Number(b.cvName))
      };

    default:
      return state
  };
}
