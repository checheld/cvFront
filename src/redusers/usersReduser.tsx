import { usersActions } from "../actionsTypes/usersActionTypes"
import { IUser, action, UsersMapper } from "../interfaces/index"

interface usersReduser {
  users: IUser[],
  user?: IUser,
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

export const initialState: usersReduser = {
  users: [],
  isLoading: {
    get: false,
    getAll: true,
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

export const usersReducer = (state = initialState, action: action): usersReduser => {

  switch (action.type) {
    case usersActions.GET_USERS_REQUEST:
      return {
        ...state,
      };

    case usersActions.GET_USERS_RESULT:
      let users: IUser[] = action.payload.map((x: IUser) => UsersMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        users: users.sort((a, b) => Number(a.firstName) - Number(b.firstName))
      };

    case usersActions.GET_USER_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: true },
      };

    case usersActions.GET_USER_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: false },
        user: action.payload
      };

    case usersActions.DEL_USER_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: true }, result: {
          ...state.result, delete: null
        }
      };

    case usersActions.DEL_USER_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, delete: false },
        result: {
          ...state.result
        }
      };

    case usersActions.ADD_USER_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, get: true
        }
      };

    case usersActions.ADD_USER_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case usersActions.EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        }
      };

    case usersActions.EDIT_USER_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    case usersActions.SEARCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case usersActions.SEARCH_USERS_RESULT:
      let foundUsers: IUser[] = action.response.map((x: IUser) => UsersMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        users: foundUsers.sort((a, b) => Number(a.firstName) - Number(b.firstName))
      };

    default:
      return state
  };
}
