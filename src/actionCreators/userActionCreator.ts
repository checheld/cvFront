import { 
    getUsersResultAction,
    getUsersRequestAction,
    getUserResultAction,
    getUserRequestAction,
    delUserRequestAction,
    delUserResultAction,
    usersActions,
    addUserRequestAction,
    editUserRequestAction,
    editUserResultAction,
    addUserResultAction,
    searchUsersRequestAction,
    searchUsersResultAction
} from '../actionsTypes/usersActionTypes';
import { IEducation, ITechnology, IUser, IWorkExperience } from "../interfaces/index";


export const getUsersRequest = () : getUsersRequestAction => {
    return{
        type: usersActions.GET_USERS_REQUEST
    }
}
export const getUsersResult = (users:IUser[]) : getUsersResultAction => {
    return{
        type: usersActions.GET_USERS_RESULT,
        payload: users
    }
}
export const getUserRequest = (id: string) : getUserRequestAction => {
    return{
        type:  usersActions.GET_USER_REQUEST,
        id: id
    }
}
export const getUserResult = (user:IUser) : getUserResultAction => {
    return{
        type: usersActions.GET_USER_RESULT,
        payload: user
    }
}
export const delUserRequest = (payload: string): delUserRequestAction => {
    return{
        type: usersActions.DEL_USER_REQUEST,
        payload: payload
    }
}

export const delUserResult = (): delUserResultAction => {
    return{
        type: usersActions.DEL_USER_RESULT
    }
}

export const addUserRequest = (payload: IUser): addUserRequestAction => {
    return{
        type: usersActions.ADD_USER_REQUEST,
        payload: payload
    }
}

export const addUserResult = (): addUserResultAction => {
    return{
        type: usersActions.ADD_USER_RESULT
    }
}

export const editUserRequest = (payload: { id: string, firstName: string, lastName: string, description: string, educationList: IEducation[], workExperienceList: IWorkExperience[], technologyList: ITechnology[]}, id: number): editUserRequestAction => {
    return{
        type: usersActions.EDIT_USER_REQUEST,
        payload: payload,
        id: id
    }
}

export const editUserResult = (): editUserResultAction => {
    return{
        type: usersActions.EDIT_USER_RESULT,
    }
}

export const searchUsersRequest = (payload: string): searchUsersRequestAction => {
    return{
        type: usersActions.SEARCH_USERS_REQUEST,
        payload: payload
    }
}

export const searchUsersResult = (searchUsers:IUser[]) : searchUsersResultAction => {
    return{
        type: usersActions.SEARCH_USERS_RESULT,
        payload: searchUsers
    }
}