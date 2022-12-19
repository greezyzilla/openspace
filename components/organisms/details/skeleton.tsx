import CommentSkeleton from '../../molecules/commentSkeleton';
import AddComment from '../../molecules/form/addComment';
import ThreadSkeleton from '../../molecules/thread/skeleton';

export default function ThreadDetailsSkeleton() {
  return (
    <div>
      <ThreadSkeleton />
      <div className="ml-3 mt-5">
        <h2 className="mb-2 font-semibold text-slate-600">Comments</h2>
        <AddComment onSubmit={() => {}} threadId="" />
        <div className="flex flex-col gap-4">
          {
            [...new Array(3)].map((_, index) => (
              <CommentSkeleton key={`skeleton-comment-${index}`} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
