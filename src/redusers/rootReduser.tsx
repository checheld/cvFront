import { combineReducers } from 'redux';
import {universitiesReducer} from './universitiesReduser';
import {companiesReducer} from './companiesReduser'

const rootReducer = combineReducers({
    universities: universitiesReducer,
    companies: companiesReducer,
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;