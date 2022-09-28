import { combineReducers } from 'redux';
import { universitiesReducer } from './universitiesReduser';
import { companiesReducer } from './companiesReduser'
import { technologiesReducer } from './technologiesReduser';
import { projectsReducer } from './projectsReduser';
import { usersReducer } from './usersReduser';
import { CVsReducer } from './CVsReduser';
import { userPhotosReduser } from './userPhotosReduser';
import { projectPhotosReduser } from './projectPhotosReduser';
import { projectTypesReducer } from './projectTypesReduser';
import { loginReducer } from './loginReduser';

const rootReducer = combineReducers({
    universities: universitiesReducer,
    companies: companiesReducer,
    technologies: technologiesReducer,
    projects: projectsReducer,
    users: usersReducer,
    CVs: CVsReducer,
    userPhotos: userPhotosReduser,
    projectPhotos: projectPhotosReduser,
    projectTypes: projectTypesReducer,
    login: loginReducer
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;