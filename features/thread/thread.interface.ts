import { User } from '../user/user.interface';

export interface Thread{
    id?: string;
    title: string;
    body: string;
    category: string;
    createdAt?: string;
    ownerId?: string;
    upVotesBy?: any[];
    downVotesBy?: any[];
    totalComments?: number;
}

export interface Comment{
    content: string;
    createdAt: string;
    downVotesBy: string[];
    id: string;
    owner: User;
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

export interface ThreadDetailResponse{
    status: string;
    message: string;
    data: {
        detailThread: ThreadDetail;
    }
}

export interface ThreadState{
    threads: Thread[];
    loading: boolean;
    thread?: ThreadDetail;
}

export interface GetThreadsResponse{
    status: string;
    message: string;
    data: {
        threads: Thread[];
    }
}

export interface AddThread{
    title: string;
    body: string;
    category: string;
}

export interface AddThreadResponse{
    status: string;
    message: string;
    data: {
        thread: Thread;
    }
}

export interface VoteThread{
    id: string;
    userId: string;
    threadId: string;
    voteType: number;
}

export interface PostVoteResponse{
    status: string;
    message: string;
    data: {
        vote: VoteThread;
    }
}

export interface PostComment{
    threadId: string;
    content: string;
}

export interface PostCommentResponse{
    status: string;
    message: string;
    data: {
        comment: Comment;
        threadId?: string;
    }
}

export interface VoteComment{
    id: string;
    userId: string;
    commentId: string;
    voteType: number;
}

export interface PostVoteComment{
    threadId: string;
    commentId: string;
}

export interface PostVoteCommentResponse{
    status: string;
    message: string;
    data: {
        vote: VoteComment;
    }
}
