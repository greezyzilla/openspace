export interface UserRegister{
    name: string;
    email: string;
    password: string;
}

export interface UserRegisterResponse{
    status: string;
    message: string;
    data?: {
        user: {
            id: string;
            name: string;
            email: string;
            avatar: string;
        }
    };
}

export interface UserLogin{
    email: string;
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
    loading: boolean;
}
