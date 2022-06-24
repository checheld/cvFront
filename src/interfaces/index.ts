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
    technologyList: ITechnology[],
    photoList: IProjectPhoto[]
}

export interface IProjectPhoto {
    id?: string,
    projectId?: string,
    project?: IProject,
    url: string
}

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    description: string, 
    educationList: IEducation[],
    workExperienceList: IWorkExperience[],
    technologyList: ITechnology[],
    photoUrl: string | null
}

export interface IEducation {
    id?: string,
    universityId: string,
    university?: IUniversity,
    speciality: string,
    startDate: string,
    endDate: string,
    userId?: string,
}

export interface IWorkExperience {
    id?: string,
    companyId: string,
    company?: ICompany,
    position: string,
    startDate: string,
    endDate: string,
    description: string, 
    userId?: string,
}

export interface IProjectCV {
    id?: string,
    projectId: string,
    project?: IProject, 
    position: string,
    startDate: string,
    endDate: string,
    description: string
}
export interface ICV {
    id: string,
    cvName: string,
    userId: string,
    projectCVList: IProjectCV[]
}
export interface IPhoto {
    id?: number;
    url?: string;
    name?: string;
    size?: number;
    publicId?: string;
}
export interface IPhotoParams {
    scale: number;
    position: {
      x: number;
      y: number;
    };
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

export const ProjectsMapper = ({id, name, description, type, country, link, technologyList, photoList}: IProject)  => {
    let newProject : IProject = {
        id,
        name,
        description,
        type,
        country, 
        link, 
        technologyList,
        photoList
    }
    return newProject;
}

export const UsersMapper = ({id, firstName, lastName, description, educationList, workExperienceList, technologyList, photoUrl}: IUser)  => {
    let newUser : IUser = {
        id, 
        firstName, 
        lastName, 
        description, 
        educationList, 
        workExperienceList, 
        technologyList,
        photoUrl
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

export const CVsMapper = ({id, cvName, userId, projectCVList}: ICV)  => {
    let newCV : ICV = {
        id,
        cvName,
        userId,
        projectCVList
    }
    return newCV;
}

export const ProjectCVMapper = ({id, projectId, project, position, startDate, endDate, description}: IProjectCV)  => {
    let newProjectCV : IProjectCV = {
        id,
        projectId,
        project, 
        position,
        startDate,
        endDate,
        description
    }
    return newProjectCV;
}
export interface action{
    type: string,
    payload?: any,
    response?: any
}