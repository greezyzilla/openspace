import VoteButtonSkeleton from './button/voteSkeleton';

export default function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-5">
      <div className="flex gap-3">
        <div className="skeleton h-10 w-full max-w-[40px] rounded-lg" />
        <div className="flex w-full flex-col justify-center gap-1">
          <p className="skeleton text-sm font-medium text-slate-800/80">&nbsp;</p>
          <p className="skeleton text-xs font-light text-slate-500">&nbsp;</p>
        </div>
      </div>
      <p className="skeleton text-sm leading-6 text-slate-600/80">&nbsp;</p>
      <div className="flex gap-4">
        <VoteButtonSkeleton />
        <VoteButtonSkeleton />
      </div>
    </div>
  );
}
