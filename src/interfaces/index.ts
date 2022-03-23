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

export const UserMapper = ({id, name}: IUniversity)  => {
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

export interface action{
    type: string,
    payload?: any,
    response?: any
}