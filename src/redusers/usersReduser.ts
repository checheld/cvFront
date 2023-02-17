import { usersActions } from "../actionsTypes/usersActionTypes"
import { IUser, action } from "../interfaces/index"

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
        isLoading: { ...state.isLoading, getAll: true },
      };

    case usersActions.GET_USERS_RESULT:
      let users: IUser[] = action.payload
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        users: users.sort(function (a, b) {
          var nameA = a.firstName.toLowerCase(), nameB = b.firstName.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
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
        ...state, isLoading: { ...state.isLoading, delete: false }, result: {
          ...state.result, delete: null
        }
      };

    case usersActions.DEL_USER_RESULT:

      let delUser: string = action.response;
      let AllUsers = state.users;
      let newArray = AllUsers.filter(function (f) { return f.id != delUser })

      return {
        ...state,
        isLoading: { ...state.isLoading, delete: true },
        result: {
          ...state.result
        },
        users: newArray
      };

    case usersActions.ADD_USER_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        }
      };

    case usersActions.ADD_USER_RESULT:

      let addedUser: IUser = action.response
      let AllUs = state.users;
      AllUs.push(addedUser);

      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: true
        },
        result: {
          ...state.result, add: action.response
        },
        users: AllUs
      }

    case usersActions.EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        }
      };

    case usersActions.EDIT_USER_RESULT:

      let updateUs: IUser = action.response;
      let newArrayWithUpdatedUs = state.users.filter(function (f) { return f.id !== updateUs.id })
      newArrayWithUpdatedUs.push(updateUs)

      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        },
        result: {
          ...state.result, edit: action.response
        },
        users: newArrayWithUpdatedUs,
        user: updateUs
      }

    case usersActions.SEARCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case usersActions.SEARCH_USERS_RESULT:
      let foundUsers: IUser[] = action.response
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        users: foundUsers.sort(function (a, b) {
          var nameA = a.firstName.toLowerCase(), nameB = b.firstName.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      };

    default:
      return state
  };
}
