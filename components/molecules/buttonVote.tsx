import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import {
  postVoteDown, postVoteNeutral, postVoteUp,
  postVoteUpComment, postVoteDownComment, postVoteNeutralComment,
} from '../../features/thread';
import { useRequest, useAppDispatch, useAppSelector } from '../../hooks';
import { ToggleButton } from '../atoms';

interface VoteButtonProps{
    /** The correspondent id of the voted thread */
    threadId: string;
    /** The correspondent id of the voted comment,
     * if exist the button is voting comment instead voting thread */
    commentId?: string;
    /** The user id list of the votes */
    votes: string[];
    /** If isVoteDown is true, the button behavior changed to vote down */
    isVoteDown?: boolean;
}

export default function ButtonVote(props : VoteButtonProps) {
  const {
    commentId, threadId, isVoteDown, votes,
  } = props;

  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const request = useRequest();

  const isVotingComment = !!commentId;
  const isUpVoting = !!votes.find((userId) => userId === auth.user?.id);

  const userId = !auth.loading && auth.user ? auth.user!.id : '';

  const onVoteHandle = async () => {
    if (isVotingComment) {
      if (isVoteDown) request(() => dispatch(postVoteDownComment({ commentId, threadId, userId })));
      else request(() => dispatch(postVoteUpComment({ commentId, threadId, userId })));
    } else if (isVoteDown) request(() => dispatch(postVoteDown({ threadId, userId })));
    else request(() => dispatch(postVoteUp({ threadId, userId })));
  };

  const onVoteNeutralHandle = async () => {
    if (isVotingComment) {
      request(() => dispatch(postVoteNeutralComment({ threadId, commentId, userId })));
    } else request(() => dispatch(postVoteNeutral({ threadId, userId })));
  };

  return (
    <ToggleButton
      onActiveClick={onVoteNeutralHandle}
      onInactiveClick={onVoteHandle}
      activeClassname="bg-violet-700 text-slate-50/90 shadow-violet-300 hover:bg-violet-800 hover:text-slate-50"
      inactiveClassname="bg-slate-100/80 text-slate-500/90 shadow-slate-200 hover:bg-slate-200/50 hover:text-slate-500"
      className="flex items-center justify-center gap-2 rounded-lg p-2 text-xs shadow-sm"
      isActive={isUpVoting || false}
    >
      {isVoteDown ? <ArrowSmallDownIcon className="h-4 w-4" /> : <ArrowSmallUpIcon className="h-4 w-4" />}
      <p className="inline-flex gap-1 pr-1 md:pr-0">
        <span>{votes?.length}</span>
        <span className="hidden sm:inline">
          {isVoteDown ? 'Down ' : 'Up '}
          Vote
        </span>
      </p>
    </ToggleButton>
  );
}

ButtonVote.Skeleton = function ButtonVoteSkeleton() {
  return (
    <div className="skeleton w-16 gap-2 rounded-lg p-2 text-xs shadow-sm shadow-slate-200 sm:w-24">
      &nbsp;
    </div>
  );
};

ButtonVote.propTypes = {
  threadId: PropTypes.string.isRequired,
  commentId: PropTypes.string,
  votes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isVoteDown: PropTypes.bool,
};

ButtonVote.defaultProps = {
  commentId: '',
  isVoteDown: false,
};
