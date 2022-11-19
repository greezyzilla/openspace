import { ChatBubbleLeftRightIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import React from 'react';
import { ThreadDetail as ThreadDetailInterface } from '../../features/thread/thread.interface';
import { getRelativeDate } from '../../utils';

interface ThreadDetailProps{
    thread: ThreadDetailInterface;
}

export default function ThreadDetails({ thread }: ThreadDetailProps) {
  return (
    <article>
      <div className="flex flex-col gap-3 rounded-xl bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-700">{thread.title}</h1>
        <div className="flex gap-3">
          <img src={thread.owner.avatar} className="h-10 w-10 rounded-lg" alt={thread.owner.name} />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-800/80">{thread.owner.name}</p>
            <p className="text-xs font-light text-slate-500">
              {getRelativeDate(thread.createdAt)}
            </p>
          </div>
        </div>
        <div className="text-sm leading-6 text-slate-600/80">{parse(thread.body)}</div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
            <p className="text-slate-500/90">
              {thread.comments.length}
              &nbsp;
              Comment
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
              <HandThumbUpIcon className="h-5 w-5 text-slate-400" />
              <p className="text-slate-500/90">
                {thread.upVotesBy.length}
                &nbsp;
                Like
              </p>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
              <HandThumbDownIcon className="h-5 w-5 text-slate-400" />
              <p className="text-slate-500/90">
                {thread.downVotesBy.length}
                &nbsp;
                Dislike
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-3 mt-5">
        <h2 className="mb-2 font-semibold text-slate-600">Comments</h2>
        <div className="mr-8 flex flex-col gap-4">
          {thread.comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2 rounded-lg bg-white p-5">
              <div className="flex gap-3">
                <img src={comment.owner.avatar} className="h-10 w-10 rounded-lg" alt={comment.owner.name} />
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-slate-800/80">{comment.owner.name}</p>
                  <p className="text-xs font-light text-slate-500">
                    {getRelativeDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-600/80">
                {parse(comment.content)}
              </p>
              <div className="flex gap-4">
                <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
                  <HandThumbUpIcon className="h-5 w-5 text-slate-400" />
                  <p className="text-slate-500/90">
                    {comment.upVotesBy.length}
                    &nbsp;
                    Like
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
                  <HandThumbDownIcon className="h-5 w-5 text-slate-400" />
                  <p className="text-slate-500/90">
                    {comment.downVotesBy.length}
                    &nbsp;
                    Dislike
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
