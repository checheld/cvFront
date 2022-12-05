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
        add: null | number,
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
                isLoading: { ...state.isLoading, getAll: true },
            };

        case projectTypesActions.GET_PROJECTTYPES_RESULT:
            let projectTypes: IProjectType[] = action.payload
            return {
                ...state,
                isLoading: { ...state.isLoading, getAll: false },
                projectTypes: projectTypes.sort(function (a, b) {
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                    if (nameA < nameB)
                      return -1
                    if (nameA > nameB)
                      return 1
                    return 0
                  })
            };

        case projectTypesActions.DEL_PROJECTTYPE_REQUEST:
            return {
                ...state, isLoading: { ...state.isLoading, delete: false }, result: {
                    ...state.result, delete: null
                }
            };

        case projectTypesActions.DEL_PROJECTTYPE_RESULT:

            let delPT: string = action.response;
            let AllProjectTypes = state.projectTypes;
            let newArray = AllProjectTypes.filter(function (f) { return f.id !== delPT })

            return {
                ...state,
                isLoading: { ...state.isLoading, delete: true },
                result: {
                    ...state.result
                },
                projectTypes: newArray
            };

        case projectTypesActions.ADD_PROJECTTYPE_REQUEST:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading, add: false
                }
            };

        case projectTypesActions.ADD_PROJECTTYPE_RESULT:

            let addedProjectTypes: IProjectType[] = action.response
            let AllprojectTypes = state.projectTypes;
            addedProjectTypes.map((pt) => AllprojectTypes.push(pt));

            return {
                ...state,
                isLoading: {
                    ...state.isLoading, add: true
                },
                result: {
                    ...state.result, add: action.response
                },
                projectTypes: AllprojectTypes
            }

        case projectTypesActions.EDIT_PROJECTTYPE_REQUEST:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading, edit: false
                }
            };

        case projectTypesActions.EDIT_PROJECTTYPE_RESULT:

            let updatePT: IProjectType = action.response;
            let newArrayWithUpdatedPT = state.projectTypes.filter(function (f) { return f.id !== updatePT.id })
            newArrayWithUpdatedPT.push(updatePT)

            return {
                ...state,
                isLoading: {
                    ...state.isLoading, edit: true
                },
                result: {
                    ...state.result, edit: action.response
                },
                projectTypes: newArrayWithUpdatedPT
            }

        case projectTypesActions.SEARCH_PROJECTTYPES_REQUEST:
            return {
                ...state,
                isLoading: { ...state.isLoading, search: false },
            };

        case projectTypesActions.SEARCH_PROJECTTYPES_RESULT:
            let pr: IProjectType[] = action.response
            return {
                ...state,
                isLoading: { ...state.isLoading, search: true },
                projectTypes: pr.sort(function (a, b) {
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
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