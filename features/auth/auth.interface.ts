import { User } from '../user/user.interface';

export interface PostRegister{
    name: string;
    email: string;
    password: string;
}

export interface PostRegisterResponse{
    status: string;
    message: string;
    data?: {
        user: User
    };
}

export interface PostLogin{
    email: string;
    password: string;
}

export interface PostLoginResponse{
    status: string;
    message: string;
    data?: {
        token : string;
    }
}

export interface GetAuthenticatedUserResponse{
    status: string;
    message: string;
    data?: {
        user : User;
    }
}

export interface AuthenticationState{
    user?: User;
    loading: boolean;
}
