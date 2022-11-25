import { HandThumbDownIcon } from '@heroicons/react/24/solid';
import { postVoteDown, postVoteNeutral } from '../../../features/thread';
import { Thread } from '../../../features/thread/thread.interface';
import useAppRequest from '../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Toggle from '../../atoms/button/toggle';

interface DownVoteButtonProps{
    thread: Thread;
}

export default function DownVoteButton({ thread } : DownVoteButtonProps) {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const request = useAppRequest();

  const isDownVoting = !!thread.downVotesBy?.find((userId) => userId === auth.user?.id);

  const onVoteUpHandle = async () => request(() => dispatch(postVoteDown(thread.id!)));
  const onVoteNeutralHandle = async () => request(() => dispatch(postVoteNeutral(thread.id!)));

  return (
    <Toggle
      onActiveClick={onVoteNeutralHandle}
      onInactiveClick={onVoteUpHandle}
      activeClassname="bg-violet-700 text-slate-50/90"
      inactiveClassname="bg-slate-100/80 text-slate-500/90"
      className="flex items-center justify-center gap-1  rounded-lg p-2 text-xs"
      isActive={isDownVoting || false}
    >
      <HandThumbDownIcon className="h-5 w-5" />
      {`${thread.downVotesBy?.length} Dislike`}
    </Toggle>
  );
}
