export interface IUniversity {
    id: string,
    name: string,
}

export const UserMapper = ({id, name}: IUniversity)  => {
    let newUser : IUniversity ={
        id,
        name
    }
    return newUser;
}

export interface action{
    type: string,
    payload?: any,
    response?: number
}