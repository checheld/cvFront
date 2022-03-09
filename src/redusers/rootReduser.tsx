import { combineReducers } from 'redux';
import {universitiesReducer} from './universitiesReduser';

const rootReducer = combineReducers({
    universities: universitiesReducer,
})
export default rootReducer;