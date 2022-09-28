import { loginActions } from "../actionsTypes/loginActionTypes"
import { ILogin, action } from "../interfaces/index"

interface loginReduser {
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

export const initialState: loginReduser = {
    isLoading: {
        get: false,
        getAll: true,
        add: false,
        delete: false,
        edit: false,
        search: false,
    },
    result: {
        add: null,
        delete: null,
        edit: null,
        search: null,
    }
}

export const loginReducer = (state = initialState, action: action): loginReduser => {

    switch (action.type) {
        case loginActions.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: { ...state.isLoading },
            };

        case loginActions.LOGIN_RESULT:
            return {
                ...state,
                isLoading: { ...state.isLoading },
            };

        default:
            return state
    };
}