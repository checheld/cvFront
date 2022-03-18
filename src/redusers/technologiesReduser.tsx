import { technologiesActions } from "../actionsTypes/technologiesActionTypes"
import { ITechnology, action, TechnologiesMapper } from "../interfaces/index"

interface technologiesReduser {
  technologies: ITechnology[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
  }
}

export const initialState: technologiesReduser = {
  technologies: [],
  isLoading: {
    get: false,
    add: false,
    delete: false,
    edit: false,
  },
  result: {
    add: null,
    delete: null,
    edit: null,
  }
}

export const technologiesReducer = (state = initialState, action: action):technologiesReduser => {

  switch (action.type) {
    case technologiesActions.GET_TECHNOLOGIES_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, get: true},
      };

    case technologiesActions.GET_TECHNOLOGIES_RESULT:
      let technologies: ITechnology[] = action.payload.map((x: ITechnology) => TechnologiesMapper(x))
      return {
        ...state,
        isLoading: {...state.isLoading, get: false},
        technologies: technologies.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case technologiesActions.DEL_TECHNOLOGY_REQUEST:
      return {...state, isLoading: {...state.isLoading, delete: true}, result: {
        ...state.result, delete: null
      }
    };

    case technologiesActions.DEL_TECHNOLOGY_RESULT:
      return {
        ...state, 
        isLoading: {...state.isLoading, delete: false},
        result: {
          ...state.result, delete: action.payload.id
        }
      };

    case technologiesActions.ADD_TECHNOLOGY_REQUEST:
      return {...state,
         isLoading: {
        ...state.isLoading, get: true
      }};   

    case technologiesActions.ADD_TECHNOLOGY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case technologiesActions.EDIT_TECHNOLOGY_REQUEST:
      return {...state,
          isLoading: {
        ...state.isLoading, edit: true
      }}; 

    case technologiesActions.EDIT_TECHNOLOGY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    default:
      return state
  };
}