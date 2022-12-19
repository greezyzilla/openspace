export interface User{
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface GetUsersResponse{
    status: string;
    message: string;
    data: {
        users: User[];
    }
}

export interface Leaderboard{
    user: User;
    score: number;
}

export interface GetLeaderboardsResponse{
    status: string;
    message: string;
    data: {
        leaderboards: Leaderboard[];
    }
}

export interface UserState{
    users: User[];
    leaderboards: Leaderboard[];
    loading: boolean;
}
