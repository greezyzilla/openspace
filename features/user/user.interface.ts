export interface User{
    id: string;
    name: string;
    email?: string;
    avatar: string;
}

export interface UserState{
    users: User[];
    filter: string;
    loading: boolean;
}

export interface GetUsersResponse{
    status: string;
    message: string;
    data: {
        users: User[];
    }
}
