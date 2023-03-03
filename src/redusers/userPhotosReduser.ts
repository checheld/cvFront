import { userPhotosActions } from "../actionsTypes/userPhotosActionTypes"
import { action } from "../interfaces/index"

interface userPhotosReduser {
  userPhoto?: string,
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    search: boolean
  }
  result: {
    add: null | string,
    addParams: any,
    delete: null | string,
    edit?: null | number,
    search?: null | number,
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
    addParams: null,
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
          ...state.result, add: action.response.secure_url
        }
      }

    default:
      return state
  };
}
