import { ApiResponse } from '../../interfaces';

export interface User{
    id: string;
    name: string;
    email: string;
    avatar: string;
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
