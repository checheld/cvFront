import { universitiesActions } from "../actionsTypes/universitiesActionTypes"
import { IUniversity, action, UserMapper } from "../interfaces/index"

interface universitiesReduser {
  universities: IUniversity[],
  isLoading: boolean,
  addProgress: boolean,
  addResult: any,
  editProgress: boolean,
  editResult: any,
  delProgress: boolean,
  isDelete: boolean,
}

export const initialState: universitiesReduser = {
  universities: [],
  isLoading: false,
  addProgress: false,
  addResult: null,
  editProgress: false,
  editResult: null,
  delProgress: false,
  isDelete: false,
}

export const universitiesReducer = (state = initialState, action: action) => {

  switch (action.type) {
    case universitiesActions.GET_UNIVERSITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case universitiesActions.GET_UNIVERSITIES_RESULT:
      let universities: IUniversity[] = action.payload.map((x: any) => UserMapper(x))
      return {
        ...state,
        isLoading: false,
        universities: universities.sort((a: IUniversity, b: IUniversity) => Number(a.name) - Number(b.name))
      };

      case universitiesActions.DEL_UNIVERSITY_REQUEST:
        const id = action.payload
        return {...state, isDelete: false, id};

        case universitiesActions.DEL_UNIVERSITY_RESULT:
          return {
            ...state, 
            isDelete: true,};

    default:
      return state
  };


}