import { FormEvent } from 'react';
import PropTypes from 'prop-types';
import { PostComment } from '../../../features/thread/thread.interface';
import { Button, InputText } from '../../atoms';
import { useForm } from '../../../hooks';

interface AddCommentProps{
    onSubmit(_comment: PostComment): void;
    threadId: string;
}

export default function AddComment({ onSubmit, threadId } : AddCommentProps) {
  const [data, onChange, reset] = useForm<PostComment>({
    content: '',
    threadId,
  });

  const onSubmitHandle = (e : FormEvent) => {
    e.preventDefault();
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={onSubmitHandle} className="mb-4 flex items-center gap-4 rounded-xl bg-white px-5 py-6 shadow-md shadow-slate-100">
      <div className="w-full">
        <InputText name="content" placeholder="What your response about this thing?" value={data.content} onChange={onChange} />
      </div>
      <Button isSubmit className="w-fit !text-xs" isPrimary>Comment</Button>
    </form>
  );
}

AddComment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
};
