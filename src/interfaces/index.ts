export interface IUniversity {
    id: string,
    name: string,
}

export interface ICompany {
    id: string,
    name: string,
}


export interface ITechnology {
    id: string,
    name: string,
    type: string,
}

export interface IProject {
    id: string,
    name: string, 
    description: string, 
    type: string, 
    country: string, 
    link: string, 
    technologyList: ITechnology[]
}

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    description: string, 
    educationList: IEducation[],
    workExperienceList: IWorkExperience[],
    technologyList: ITechnology[]
}

export interface IEducation {
    id: string,
    universityId: string,
    university: IUniversity,
    speciality: string,
    startDate: string,
    endDate: string,
    userId: string,
}

export interface IWorkExperience {
    id: string,
    companyId: string,
    company: ICompany,
    position: string,
    startDate: string,
    endDate: string,
    description: string, 
    userId: string,
}

export const UniversitiesMapper = ({id, name}: IUniversity)  => {
    let newUser : IUniversity ={
        id,
        name
    }
    return newUser;
}

export const TechnologiesMapper = ({id, name, type}: ITechnology)  => {
    let newTechnology : ITechnology ={
        id,
        name,
        type
    }
    return newTechnology;
}

export const ProjectsMapper = ({id, name, description, type, country, link, technologyList}: IProject)  => {
    let newProject : IProject = {
        id,
        name,
        description,
        type,
        country, 
        link, 
        technologyList
    }
    return newProject;
}

export const UsersMapper = ({id, firstName, lastName, description, educationList, workExperienceList, technologyList}: IUser)  => {
    let newUser : IUser = {
        id, 
        firstName, 
        lastName, 
        description, 
        educationList, 
        workExperienceList, 
        technologyList
    }
    return newUser;
}

export const EducationMapper = ({id, universityId, university, speciality, startDate, endDate, userId,}: IEducation)  => {
    let newEducation : IEducation = {
        id,
        universityId,
        university,
        speciality,
        startDate,
        endDate,
        userId,
    }
    return newEducation;
}

export const WorkExperienceMapper = ({id, companyId, company, position, startDate, endDate, description, userId,}: IWorkExperience)  => {
    let newWorkExperience : IWorkExperience = {
        id,
        companyId,
        company,
        position,
        startDate,
        endDate,
        description, 
        userId,
    }
    return newWorkExperience;
}

export interface action{
    type: string,
    payload?: any,
    response?: any
}