import { ApiResponse } from '../../interfaces';
import { User } from '../user/user.interface';

export interface PostRegister{
    name: string;
    email: string;
    password: string;
}

export interface PostRegisterResponse extends ApiResponse{
    data?: {
        user: User
    };
}

export interface PostLogin{
    email: string;
    password: string;
}

export interface PostLoginResponse extends ApiResponse{
    data?: {
        token : string;
    }
}

export interface GetAuthenticatedUserResponse extends ApiResponse{
    data?: {
        user : User;
    }
}

export interface AuthenticationState{
    user?: User;
    loading: boolean;
}
