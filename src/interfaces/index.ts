export interface IUniversity {
    id: number,
    name: string,
}

export interface ICompany {
    id: number,
    name: string,
}


export interface ITechnology {
    id: number,
    name: string,
    type: string,
}

export interface IProject {
    id: number,
    name: string,
    description: string,
    projectType: IProjectType,
    country: string,
    link: string,
    technologies: ITechnology[],
    photoList: IProjectPhoto[]
}

export interface IProjectPhoto {
    id?: number,
    project?: IProject,
    url: string
}

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    description: string,
    photoParams?: IPhotoParams,
    educations: IEducation[],
    workExperiences: IWorkExperience[],
    technologies: ITechnology[],
    photoUrl: string | null
}

export interface IEducation {
    id?: number,
    university: IUniversity,
    speciality: string,
    startDate: string,
    endDate: string,
    user: IUser,
}

export interface IWorkExperience {
    id?: number,
    company: ICompany,
    position: string,
    startDate: string,
    endDate: string,
    description: string,
    user: IUser,
}

export interface IProjectCV {
    id?: number,
    project: IProject,
    position: string,
    startDate: string,
    endDate: string,
    description: string,
    cv?: ICV
}

export interface IProjectType {
    id: number,
    name: string,
}

export interface ICV {
    id: number,
    cvName: string,
    user: IUser,
    createdAt: string,
    projectcvs: IProjectCV[]
}

export interface IPhotoParams {
    id?: number,
    user?: IUser,
    scale: number,
    position: IPosition
}

export interface IPosition {
    id?: number,
    x: number,
    y: number
}

export interface ILogin {
    email: string,
    password: string,
}

export interface action {
    type: string,
    payload?: any,
    response?: any
    statusText?: string
}