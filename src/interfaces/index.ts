export interface IUniversity {
    id: string,
    name: string,
}

export const UserMapper = (obj: any) : IUniversity => {
    let newUser : IUniversity ={
        id: obj.id,
        name: obj.name
    }
    return newUser;
}

export interface action{
    type: string,
    payload?: any
}