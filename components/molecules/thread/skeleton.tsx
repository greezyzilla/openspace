export default function ThreadSkeleton() {
  return (
    <article className="flex flex-col gap-3 rounded-xl bg-white p-6">
      <p className="skeleton h-min text-xl font-semibold text-slate-700 line-clamp-2">&nbsp;</p>
      <div className="flex items-end justify-between">
        <div className="flex flex-1 gap-3">
          <div className="skeleton h-10 w-10 rounded-lg">&nbsp;</div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <p className="skeleton w-7/12 text-sm font-medium text-slate-800/80">&nbsp;</p>
            <p className="skeleton w-6/12 text-xs font-light text-slate-500">&nbsp;</p>
          </div>
        </div>
        <div className="skeleton h-fit w-40 rounded-md p-1">&nbsp;</div>
      </div>
      <div className="skeleton w-full text-sm leading-6 text-slate-600/80 line-clamp-6">&nbsp;</div>
      <div className="flex justify-between">
        <div className="skeleton w-14 rounded-lg p-2 text-xs sm:w-28">&nbsp;</div>
        <div className="flex gap-4">
          <div className="skeleton w-14 rounded-lg p-2 text-xs sm:w-28">&nbsp;</div>
          <div className="skeleton w-14 rounded-lg p-2 text-xs sm:w-28">&nbsp;</div>
        </div>
      </div>
    </article>
  );
}
