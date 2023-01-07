import { ApiResponse } from '../../interfaces';
import { Owner, User } from '../user/user.interface';

export interface Thread{
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    upVotesBy: string[];
    downVotesBy: string[];
}

export interface Comment{
    /** The id of the comment */
    id: string;
    /** The displayed content of the comment */
    content: string;
    /** The comment user that the comment belongs to */
    owner: Owner;
    /** The comment create date, create with date locale ISO */
    createdAt: string;
    /** The user id list of the comment downvotes */
    downVotesBy: string[];
    /** The user id list of the comment upvotes */
    upVotesBy: string[];
}

export interface ThreadDetail extends Thread{
    comments: Comment[];
    owner: Owner;
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
    threads: (Thread & {
        ownerId: string;
        totalComments: number;
    })[];
    loading: boolean;
    thread?: ThreadDetail;
    filter: string;
}

export interface GetThread{
    threadId: string;
}

export interface GetThreadsResponse extends ApiResponse{
    data: {
        threads: (Thread & {
            ownerId: string;
            totalComments: number;
        })[];
    }
}

export interface PostThread{
    title: string;
    body: string;
    category: string;
}

export interface PostThreadResponse extends ApiResponse{
    data: {
        thread: Thread & {
            ownerId: string;
            totalComments: number;
        };
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
        comment: Comment & {
            owner: User;
        };
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
