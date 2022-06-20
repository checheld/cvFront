import { combineReducers } from 'redux';
import {universitiesReducer} from './universitiesReduser';
import {companiesReducer} from './companiesReduser'
import { technologiesReducer } from './technologiesReduser';
import { projectsReducer } from './projectsReduser';
import { usersReducer } from './usersReduser';
import { CVsReducer } from './CVsReduser';
import { userPhotosReduser } from './userPhotosReduser';

const rootReducer = combineReducers({
    universities: universitiesReducer,
    companies: companiesReducer,
    technologies: technologiesReducer,
    projects: projectsReducer,
    users: usersReducer,
    CVs: CVsReducer,
    userPhotos: userPhotosReduser
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;