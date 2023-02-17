import { universitiesActions } from "../actionsTypes/universitiesActionTypes"
import { IUniversity, action } from "../interfaces"

interface universitiesReduser {
  universities: IUniversity[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean
  }
  result: {
    add: null | IUniversity[],
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: universitiesReduser = {
  universities: [],
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

export const universitiesReducer = (state = initialState, action: action): universitiesReduser => {

  switch (action.type) {
    case universitiesActions.GET_UNIVERSITIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: true },
      };

    case universitiesActions.GET_UNIVERSITIES_RESULT:
      let universities: IUniversity[] = action.payload

      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        universities: universities.sort(function (a, b) {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      };

    case universitiesActions.DEL_UNIVERSITY_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: false }, result: {
          ...state.result, delete: null
        }
      };

    case universitiesActions.DEL_UNIVERSITY_RESULT:

      let delUni: number = action.response;
      let AllUniversities = state.universities;
      let newArray = AllUniversities.filter(function (f) { return f.id != delUni })

      return {
        ...state,
        isLoading: { ...state.isLoading, delete: true },
        result: {
          ...state.result
        },
        universities: newArray
      };

    case universitiesActions.ADD_UNIVERSITY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        }
      };

    case universitiesActions.ADD_UNIVERSITY_RESULT:

      let addedUniversities: IUniversity[] = action.response
      let Allniversities = state.universities;
      addedUniversities.map((uni) => Allniversities.push(uni));

      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: true
        },
        result: {
          ...state.result, add: action.response
        },
        universities: Allniversities
      }

    case universitiesActions.EDIT_UNIVERSITY_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        }
      };

    case universitiesActions.EDIT_UNIVERSITY_RESULT:

      let updateUni: IUniversity = action.response;
      let newArrayWithUpdatedUni = state.universities.filter(function (f) { return f.id !== updateUni.id })
      newArrayWithUpdatedUni.push(updateUni)

      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        },
        result: {
          ...state.result, edit: action.response
        },
        universities: newArrayWithUpdatedUni
      }

    case universitiesActions.SEARCH_UNIVERSITIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case universitiesActions.SEARCH_UNIVERSITIES_RESULT:
      let uni: IUniversity[] = action.response
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        universities: uni.sort(function (a, b) {
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