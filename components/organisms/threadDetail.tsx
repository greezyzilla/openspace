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
      <div className="bg-white rounded-xl p-6 flex flex-col gap-3">
        <h1 className="text-xl font-semibold text-slate-700">{thread.title}</h1>
        <div className="flex gap-3">
          <img src={thread.owner.avatar} className="w-10 h-10 rounded-lg" alt={thread.owner.name} />
          <div className="flex flex-col justify-center">
            <p className="text-slate-800/80 font-medium text-sm">{thread.owner.name}</p>
            <p className="text-slate-500 font-light text-xs">
              {getRelativeDate(thread.createdAt)}
            </p>
          </div>
        </div>
        <div className="text-slate-600/80 leading-6 text-sm">{parse(thread.body)}</div>
        <div className="flex justify-between">
          <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-400" />
            <p className="text-slate-500/90">
              {thread.comments.length}
              &nbsp;
              Comment
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
              <HandThumbUpIcon className="w-5 h-5 text-slate-400" />
              <p className="text-slate-500/90">
                {thread.upVotesBy.length}
                &nbsp;
                Like
              </p>
            </div>
            <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
              <HandThumbDownIcon className="w-5 h-5 text-slate-400" />
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
        <h2 className="font-semibold text-slate-600 mb-2">Comments</h2>
        <div className="flex flex-col gap-4 mr-8">
          {thread.comments.map((comment) => (
            <div key={comment.id} className="p-5 rounded-lg flex flex-col gap-2 bg-white">
              <div className="flex gap-3">
                <img src={comment.owner.avatar} className="w-10 h-10 rounded-lg" alt={comment.owner.name} />
                <div className="flex flex-col justify-center">
                  <p className="text-slate-800/80 font-medium text-sm">{comment.owner.name}</p>
                  <p className="text-slate-500 font-light text-xs">
                    {getRelativeDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-slate-600/80 leading-6 text-sm">
                {parse(comment.content)}
              </p>
              <div className="flex gap-4">
                <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
                  <HandThumbUpIcon className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-500/90">
                    {comment.upVotesBy.length}
                    &nbsp;
                    Like
                  </p>
                </div>
                <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
                  <HandThumbDownIcon className="w-5 h-5 text-slate-400" />
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
