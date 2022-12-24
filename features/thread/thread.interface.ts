import { ApiResponse } from '../../interfaces';
import { User } from '../user/user.interface';

export interface Thread{
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    ownerId: string;
    upVotesBy: string[];
    downVotesBy: string[];
    totalComments: number;
}

export interface Comment{
    id: string;
    content: string;
    owner: User;
    createdAt: string;
    downVotesBy: string[];
    upVotesBy: string[];
}

export interface ThreadDetail{
    id: string;
    body: string;
    category: string;
    comments: Comment[];
    createdAt: string;
    downVotesBy: string[];
    owner: User;
    title: string;
    upVotesBy: string[];
}

export interface VoteThread{
    id: string;
    userId: string;
    threadId: string;
    voteType: number;
}

export interface VoteComment{
    id: string;
    userId: string;
    commentId: string;
    voteType: number;
}

export interface ThreadState{
    threads: Thread[];
    loading: boolean;
    thread?: ThreadDetail;
    filter: string;
}

export interface GetThread{
    threadId: string;
}

export interface GetThreadsResponse extends ApiResponse{
    data: {
        threads: Thread[];
    }
}

export interface PostThread{
    title: string;
    body: string;
    category: string;
}

export interface PostThreadResponse extends ApiResponse{
    data: {
        thread: Thread;
    }
}

export interface GetThreadDetailResponse extends ApiResponse{
    data: {
        detailThread: ThreadDetail;
    }
}

export interface PostVoteThread{
    userId: string;
    threadId: string;
}

export interface PostVoteThreadResponse extends ApiResponse{
    data: {
        vote: VoteThread;
    }
}

export interface PostComment{
    threadId: string;
    content: string;
}

export interface PostCommentResponse extends ApiResponse{
    data: {
        comment: Comment;
        threadId?: string;
    }
}

export interface PostVoteComment{
    threadId: string;
    commentId: string;
    userId: string;
}

export interface PostVoteCommentResponse extends ApiResponse{
    data: {
        vote: VoteComment;
    }
}
