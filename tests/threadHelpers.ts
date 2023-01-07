import dayjs from 'dayjs';
import {
  Comment, Thread, ThreadDetail, VoteComment, VoteThread,
} from '../features/thread/thread.interface';

export const getDateISO = (type : dayjs.UnitType, value: number, date = new Date()) => (
  dayjs(date).set(type, value).toISOString()
);

export const createThread = ({
  id, body, category, createdAt, downVotesBy, title, upVotesBy, ownerId,
}: Partial<Thread & {ownerId : string}>, index: number = 1) => ({
  id: id || `thread-${index}`,
  title: title || `Thread ke-${index}`,
  body: body || 'Isi dari thread',
  category: category || 'test',
  createdAt: createdAt || new Date().toISOString(),
  upVotesBy: upVotesBy || [],
  downVotesBy: downVotesBy || [],
  ownerId,
});

export const createThreadDetail = ({
  id, body, category, createdAt, downVotesBy, title, upVotesBy, comments, owner,
}: Partial<ThreadDetail>, index: number = 1) => ({
  id: id || `thread-${index}`,
  title: title || `Thread ke-${index}`,
  body: body || 'Isi dari thread',
  category: category || 'test',
  createdAt: createdAt || new Date().toISOString(),
  upVotesBy: upVotesBy || [],
  downVotesBy: downVotesBy || [],
  comments: comments || [],
  owner,
});

export const createVoteThread = ({
  id, threadId, userId, voteType,
}: Partial<VoteThread>, index = 1) => ({
  id: id || `thread_vote-${index}`,
  userId,
  voteType,
  threadId,
});

export const createComment = ({
  id, content, createdAt, downVotesBy, owner, upVotesBy,
}: Partial<Comment>, index = 1) => ({
  id: id || `comment-${index}`,
  content: content || `Ini adalah komentar ke-${index}`,
  createdAt: createdAt || new Date().toISOString(),
  downVotesBy: downVotesBy || [],
  upVotesBy: upVotesBy || [],
  owner,
}) as Comment;

export const createVoteComment = ({
  id, commentId, userId, voteType,
}: Partial<VoteComment>, index = 1) => ({
  id: id || `comment_vote-${index}`,
  userId,
  voteType,
  commentId,
});
