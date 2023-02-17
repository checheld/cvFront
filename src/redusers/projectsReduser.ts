import { projectsActions } from "../actionsTypes/projectsActionTypes"
import { IProject, action } from "../interfaces/index"

interface projectsReduser {
  projects: IProject[],
  project?: IProject,
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean,
  }
  result: {
    add?: string,
    delete?: string,
    edit?: string,
    search?: string,
  }
}

export const initialState: projectsReduser = {
  projects: [],
  isLoading: {
    get: false,
    getAll: true,
    add: false,
    delete: false,
    edit: false,
    search: false,
  },
  result: {}
}

export const projectsReducer = (state = initialState, action: action): projectsReduser => {

  switch (action.type) {
    case projectsActions.GET_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: true },
      };

    case projectsActions.GET_PROJECTS_RESULT:
      let projects: IProject[] = action.payload
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        projects: projects.sort(function (a, b) {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      };
    case projectsActions.GET_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: true },
      };

    case projectsActions.GET_PROJECT_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: false },
        project: action.payload
      };

    case projectsActions.DEL_PROJECT_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: false },
        result: {
          ...state.result, delete: ""
        }
      };

    case projectsActions.DEL_PROJECT_RESULT:

      let delproj: number = action.response;
      let AllProjects = state.projects;
      let newArray = AllProjects.filter(function (f) { return f.id != delproj })

      return {
        ...state,
        isLoading: { ...state.isLoading, delete: true },
        result: {
          ...state.result,
          delete: action.statusText
        },
        projects: newArray
      };

    case projectsActions.ADD_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: ""
        }
      };

    case projectsActions.ADD_PROJECT_RESULT:

      let addedProjects: IProject = action.response
      let AllPr = state.projects;
      AllPr.push(addedProjects);

      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: true
        },
        result: {
          ...state.result, add: action.response
        },
        projects: AllPr
      }

    case projectsActions.EDIT_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: ""
        }
      };

    case projectsActions.EDIT_PROJECT_RESULT:

      let updateProj: IProject = action.response;
      let newArrayWithUpdatedProj = state.projects.filter(function (f) { return f.id !== updateProj.id })
      newArrayWithUpdatedProj.push(updateProj)

      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        },
        result: {
          ...state.result, edit: action.response
        },
        projects: newArrayWithUpdatedProj,
        project: updateProj
      }

    case projectsActions.SEARCH_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case projectsActions.SEARCH_PROJECTS_RESULT:
      let proj: IProject[] = action.response
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        projects: proj.sort(function (a, b) {
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