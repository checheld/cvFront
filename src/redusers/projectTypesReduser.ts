import { projectTypesActions } from "../actionsTypes/projectTypesActionTypes"
import { IProjectType, action } from "../interfaces"

interface projectTypesReduser {
    projectTypes: IProjectType[],
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

export const initialState: projectTypesReduser = {
    projectTypes: [],
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

export const projectTypesReducer = (state = initialState, action: action): projectTypesReduser => {

    switch (action.type) {
        case projectTypesActions.GET_PROJECTTYPES_REQUEST:
            return {
                ...state,
            };

        case projectTypesActions.GET_PROJECTTYPES_RESULT:
            let projectTypes: IProjectType[] = action.payload
            return {
                ...state,
                isLoading: { ...state.isLoading, getAll: false },
                projectTypes: projectTypes.sort((a, b) => Number(a.name) - Number(b.name))
            };

        case projectTypesActions.DEL_PROJECTTYPE_REQUEST:
            return {
                ...state, isLoading: { ...state.isLoading, delete: true }, result: {
                    ...state.result, delete: null
                }
            };

        case projectTypesActions.DEL_PROJECTTYPE_RESULT:
            return {
                ...state,
                isLoading: { ...state.isLoading, delete: false },
                result: {
                    ...state.result
                }
            };

        case projectTypesActions.ADD_PROJECTTYPE_REQUEST:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading, get: true
                }
            };

        case projectTypesActions.ADD_PROJECTTYPE_RESULT:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading, add: false
                },
                result: {
                    ...state.result, add: action.response
                }
            }

        case projectTypesActions.EDIT_PROJECTTYPE_REQUEST:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading, edit: true
                }
            };

        case projectTypesActions.EDIT_PROJECTTYPE_RESULT:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading, edit: false
                },
                result: {
                    ...state.result, edit: action.response
                }
            }

        case projectTypesActions.SEARCH_PROJECTTYPES_REQUEST:
            return {
                ...state,
                isLoading: { ...state.isLoading, search: false },
            };

        case projectTypesActions.SEARCH_PROJECTTYPES_RESULT:
            let uni: IProjectType[] = action.response
            return {
                ...state,
                isLoading: { ...state.isLoading, search: true },
                projectTypes: uni.sort((a, b) => Number(a.name) - Number(b.name))
            };

        default:
            return state
    };
}