import { ChangeEvent, FormEvent, useState } from 'react';
import { PostComment } from '../../../features/thread/thread.interface';
import Button from '../../atoms/button';
import InputText from '../../atoms/input/text';

interface AddCommentProps{
    onSubmit(_comment: PostComment): void;
    threadId: string;
}

export default function AddComment({ onSubmit, threadId } : AddCommentProps) {
  const initialData = {
    content: '',
    threadId,
  };

  const [data, setData] = useState<PostComment>(initialData);

  const onChangeHandle = (e : ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandle = (e : FormEvent) => {
    e.preventDefault();
    onSubmit(data);
    setData(initialData);
  };

  return (
    <form onSubmit={onSubmitHandle} className="mb-4 flex items-center gap-4 rounded-lg bg-white px-5 py-6">
      <div className="w-full">
        <InputText name="content" label="" placeholder="What your response about this thing?" value={data.content} onChange={onChangeHandle} />
      </div>
      <Button isSubmit className="w-fit !text-xs" isPrimary>Comment</Button>
    </form>
  );
}
