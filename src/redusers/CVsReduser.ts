import { CVsActions } from "../actionsTypes/CVsActionTypes"
import { ICV, action } from "../interfaces/index"

interface CVsReduser {
  CVs: ICV[],
  CV?: ICV,
  pdf?: File,
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean,
    download: boolean
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: CVsReduser = {
  CVs: [],
  isLoading: {
    get: false,
    getAll: true,
    add: false,
    delete: false,
    edit: false,
    search: false,
    download: false
  },
  result: {
    add: null,
    delete: null,
    edit: null,
    search: null,
  }
}

export const CVsReducer = (state = initialState, action: action): CVsReduser => {

  switch (action.type) {
    case CVsActions.GET_CVS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: true },
      };

    case CVsActions.GET_CVS_RESULT:
      let CVs: ICV[] = action.payload
      return {
        ...state,
        isLoading: { ...state.isLoading, getAll: false },
        CVs: CVs.sort((a, b) => Number(b.id) - Number(a.id))
      };

    case CVsActions.GET_CV_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: true },
      };

    case CVsActions.GET_CV_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, get: false },
        CV: action.payload
      };

    case CVsActions.DEL_CV_REQUEST:
      return {
        ...state, isLoading: { ...state.isLoading, delete: false }, result: {
          ...state.result, delete: null
        }
      };

    case CVsActions.DEL_CV_RESULT:

      let delCV: number = action.response;
      let AllCVs = state.CVs;
      let newArray = AllCVs.filter(function (f) { return f.id != delCV })

      return {
        ...state,
        isLoading: { ...state.isLoading, delete: true },
        result: {
          ...state.result
        },
        CVs: newArray
      };

    case CVsActions.DOWNLOAD_CV_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, download: true }
      };

    case CVsActions.DOWNLOAD_CV_RESULT:
      return {
        ...state,
        isLoading: { ...state.isLoading, download: false },
        // pdf: action.payload
      };




    case CVsActions.ADD_CV_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: false
        }
      };

    case CVsActions.ADD_CV_RESULT:

      let addedCVs: ICV = action.response
      let AllPr = state.CVs;
      AllPr.push(addedCVs);

      return {
        ...state,
        isLoading: {
          ...state.isLoading, add: true
        },
        result: {
          ...state.result, add: action.response
        },
        CVs: AllPr.sort((a, b) => Number(b.id) - Number(a.id))
      }

    case CVsActions.EDIT_CV_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        }
      };

    case CVsActions.EDIT_CV_RESULT:

      let updateCV: ICV = action.response;
      let newArrayWithUpdatedCV = state.CVs.filter(function (f) { return f.id !== updateCV.id })
      newArrayWithUpdatedCV.push(updateCV)

      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: true
        },
        result: {
          ...state.result, edit: action.response
        },
        CVs: newArrayWithUpdatedCV.sort((a, b) => Number(b.id) - Number(a.id)),
        CV: updateCV
      }

    case CVsActions.SEARCH_CVS_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case CVsActions.SEARCH_CVS_RESULT:
      let foundCVs: ICV[] = action.response
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        CVs: foundCVs.sort((a, b) => Number(a.cvName) - Number(b.cvName))
      };

    default:
      return state
  };
}
