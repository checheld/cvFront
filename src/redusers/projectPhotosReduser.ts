import { projectPhotosActions } from "../actionsTypes/projectPhotosActionTypes"
import { action } from "../interfaces/index"

interface projectPhotosReduser {
    projectPhoto?: File,
    isLoading: {
        add: boolean,
        delete: boolean,
        edit: boolean,
        get: boolean,
        search: boolean
    }
    result: {
        add: null | string,
        delete: null | string,
        edit: null | undefined | number,
        search: null | undefined | number,
    }
}

export const initialState: projectPhotosReduser = {
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

export const projectPhotosReduser = (state = initialState, action: action): projectPhotosReduser => {

  switch (action.type) {
    
    case projectPhotosActions.ADD_PROJECTPHOTO_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, get: true
        }
      };

    case projectPhotosActions.ADD_PROJECTPHOTO_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

      case projectPhotosActions.DEL_PROJECTPHOTO_REQUEST:
        return {
          ...state, isLoading: { ...state.isLoading, delete: true }, result: {
            ...state.result, delete: null
          }
        };
  
      case projectPhotosActions.DEL_PROJECTPHOTO_RESULT:
        return {
          ...state,
          isLoading: { ...state.isLoading, delete: false },
          result: {
            ...state.result
          }
        };

    default:
      return state
  };
}
