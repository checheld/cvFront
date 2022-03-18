import { combineReducers } from 'redux';
import {universitiesReducer} from './universitiesReduser';
import {companiesReducer} from './companiesReduser'
import { technologiesReducer } from './technologiesReduser';

const rootReducer = combineReducers({
    universities: universitiesReducer,
    companies: companiesReducer,
    technologies: technologiesReducer,
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;