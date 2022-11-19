export interface UserRegister{
    id: string;
    name: string;
    password: string;
}

export interface UserRegisterResponse{
    status: string;
    message: string;
    data?: {
        user: {
            id: string;
            name: string;
            photo: string;
        }
    };
}

export interface UserLogin{
    id: string;
    name: string;
    password: string;
}

export interface UserLoginResponse{
    status: string;
    message: string;
    data?: {
        token : string;
    }
}

export interface AuthenticatedUser{
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface AuthenticatedUserResponse{
    status: string;
    message: string;
    data?: {
        user : AuthenticatedUser;
    }
}

export interface AuthenticationState{
    user?: AuthenticatedUser;
    filter: string;
    loading: boolean;
}
