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
    projectTypeId: string,
    projectType?: IProjectType,
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
    photoParamsId?: string,
    photoParams?: any,
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

export interface IProjectType {
    id: string,
    name: string,
}

export interface ICV {
    id: string,
    cvName: string,
    user?: IUser,
    userId: string,
    createdAt: string,
    projectCVList: IProjectCV[]
}

export interface IPhotoParams {
    id?: number,
    scale: number;
    position: {
        x: number;
        y: number;
    };
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