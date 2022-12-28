import { ApiResponse } from '../../interfaces';

export interface Owner{
    id: string;
    name: string;
    avatar: string;
}

export interface User extends Owner{
    email: string;
}

export interface Leaderboard{
    user: User;
    score: number;
}

export interface UserState{
    users: User[];
    leaderboards: Leaderboard[];
    loading: boolean;
}

export interface GetUsersResponse extends ApiResponse{
    data: {
        users: User[];
    }
}

export interface GetLeaderboardsResponse extends ApiResponse{
    data: {
        leaderboards: Leaderboard[];
    }
}
