import { projectsActions } from "../actionsTypes/projectsActionTypes"
import { IProject, action, ProjectsMapper } from "../interfaces/index"

interface projectsReduser {
  projects: IProject[],
  project?: IProject,
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    search: boolean,
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: projectsReduser = {
    projects: [],
    isLoading: {
    get: false,
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

export const projectsReducer = (state = initialState, action: action):projectsReduser => {

  switch (action.type) {
    case projectsActions.GET_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, get: true},
      };

    case projectsActions.GET_PROJECTS_RESULT:
      let projects: IProject[] = action.payload.map((x: IProject) => ProjectsMapper(x))
      return {
        ...state,
        isLoading: {...state.isLoading, get: false},
        projects: projects.sort((a, b) => Number(a.name) - Number(b.name))
      };
      case projectsActions.GET_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, get: true},
      };

    case projectsActions.GET_PROJECT_RESULT:
      return {
        ...state,
        isLoading: {...state.isLoading, get: false},
        project: action.payload
      };
    case projectsActions.DEL_PROJECT_REQUEST:
      return {...state, isLoading: {...state.isLoading, delete: true}, result: {
        ...state.result, delete: null
      }
    };

    case projectsActions.DEL_PROJECT_RESULT:
      return {
        ...state, 
        isLoading: {...state.isLoading, delete: false},
        result: {
          ...state.result, delete: action.payload.id
        }
      };

    case projectsActions.ADD_PROJECT_REQUEST:
      return {...state,
         isLoading: {
        ...state.isLoading, get: true
      }};   

    case projectsActions.ADD_PROJECT_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case projectsActions.EDIT_PROJECT_REQUEST:
      return {...state,
          isLoading: {
        ...state.isLoading, edit: true
      }}; 

    case projectsActions.EDIT_PROJECT_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    case projectsActions.SEARCH_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
      };

    case projectsActions.SEARCH_PROJECTS_RESULT:
      let proj: IProject[] = action.response.map((x: IProject) => ProjectsMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
        projects: proj.sort((a, b) => Number(a.name) - Number(b.name))
      };

    default:
      return state
  };
}