import { userPhotosActions } from "../actionsTypes/userPhotosActionTypes"
import { action } from "../interfaces/index"

interface userPhotosReduser {
  userPhoto?: File,
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

export const initialState: userPhotosReduser = {
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

export const userPhotosReduser = (state = initialState, action: action): userPhotosReduser => {

  switch (action.type) {
    
    case userPhotosActions.ADD_USERPHOTO_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, get: true
        }
      };

    case userPhotosActions.ADD_USERPHOTO_RESULT:
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
