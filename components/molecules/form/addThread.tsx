import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { PostThread } from '../../../features/thread/thread.interface';
import { Button, InputText, InputTextarea } from '../../atoms';
import { useForm } from '../../../hooks';

interface AddThreadFormProps{
    onSubmit(_newThread : PostThread): void;
    onCancel(): void;
}

export default function AddThreadForm({ onSubmit, onCancel } : AddThreadFormProps) {
  const [data, onChange] = useForm<PostThread>({
    title: '',
    category: '',
    body: '',
  });

  const onSubmitHandle = (e : FormEvent) => {
    e.preventDefault();
    if (data.body === '' || data.body === '<p><br></p>') toast.error('Thread body should not be empty');
    else {
      onSubmit(data);
      onCancel();
    }
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <h3 className="border-b-2 px-8 pt-6 pb-4 text-lg font-medium leading-6 text-gray-900">
        Create New Thread
      </h3>
      <div className="flex flex-col gap-6 py-6 px-8">
        <div className="flex gap-6">
          <InputText name="title" label="Title" onChange={onChange} value={data.title} placeholder="How to, I want to, etc..." />
          <InputText name="category" label="Category" onChange={onChange} value={data.category} placeholder="React, Javascript, Typescript, etc..." />
        </div>
        <InputTextarea name="body" label="Body" placeholder="Hi, i would like to share that..." onChange={onChange} value={data.body} />
      </div>
      <div className="flex gap-4 px-8 pb-6">
        <Button onClick={() => onCancel()} isSecondary>Cancel</Button>
        <Button isSubmit isPrimary>Publish</Button>
      </div>
    </form>
  );
}
