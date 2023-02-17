import { technologiesActions } from "../actionsTypes/technologiesActionTypes"
import { ITechnology, action } from "../interfaces/index"

interface technologiesReduser {
  technologies: ITechnology[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean,
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: technologiesReduser = {
  technologies: [],
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

export const technologiesReducer = (state = initialState, action: action): technologiesReduser => {

  switch (action.type) {
    case technologiesActions.GET_TECHNOLOGIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: true },
      };

    case technologiesActions.GET_TECHNOLOGIES_RESULT:
      let technologies: ITechnology[] = action.payload
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        technologies: technologies.sort(function (a, b) {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      };

    case technologiesActions.DEL_TECHNOLOGY_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: false }, result: {
          ...state.result, delete: null
        }
      };

    case technologiesActions.DEL_TECHNOLOGY_RESULT:

      let delTech: string = action.response;
      let AllTechnologies = state.technologies;
      let newArray = AllTechnologies.filter(function (f) { return f.id != delTech })

      return {
        ...state,
        isLoading: { ...state.isLoading, delete: true },
        result: {
          ...state.result
        },
        technologies: newArray
      };

    case technologiesActions.ADD_TECHNOLOGY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        }
      };

    case technologiesActions.ADD_TECHNOLOGY_RESULT:

      let addedTechnologies: ITechnology[] = action.response
      let AllTech = state.technologies;
      addedTechnologies.map((tech) => AllTech.push(tech));

      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: true
        },
        result: {
          ...state.result, add: action.response
        },
        technologies: AllTech
      }

    case technologiesActions.EDIT_TECHNOLOGY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        }
      };

    case technologiesActions.EDIT_TECHNOLOGY_RESULT:

      let updateT: ITechnology = action.response;
      let newArrayWithUpdatedTech = state.technologies.filter(function (f) { return f.id !== updateT.id })
      newArrayWithUpdatedTech.push(updateT)

      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        },
        result: {
          ...state.result, edit: action.response
        },
        technologies: newArrayWithUpdatedTech
      }

    case technologiesActions.SEARCH_TECHNOLOGIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case technologiesActions.SEARCH_TECHNOLOGIES_RESULT:
      let t: ITechnology[] = action.response
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        technologies: t.sort(function (a, b) {
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