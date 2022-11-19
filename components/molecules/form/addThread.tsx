import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Thread } from '../../../features/thread/thread.interface';
import Button from '../../atoms/button';
import InputText from '../../atoms/input/text';
import TextArea from '../../atoms/input/textarea';

interface AddThreadFormProps{
    onSubmit(_thread : Thread): void;
    onCancel(): void;
}

export default function AddThreadForm({ onSubmit, onCancel } : AddThreadFormProps) {
  const [data, setData] = useState({
    title: '',
    category: '',
    body: '',
  });

  const onChangeHandle = (e : ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandle = (e : FormEvent) => {
    e.preventDefault();
    if (data.body === '' || data.body === '<p><br></p>') toast.error('Thread body should not be empty');
    else onSubmit(data);
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <h3 className="text-lg font-medium leading-6 text-gray-900 border-b-2 px-8 pt-6 pb-4">
        Create New Thread
      </h3>
      <div className="py-6 px-8 flex flex-col gap-6">
        <div className="flex gap-6">
          <InputText name="title" label="Title" onChange={onChangeHandle} value={data.title} placeholder="How to, I want to, etc..." />
          <InputText name="category" label="Category" onChange={onChangeHandle} value={data.category} placeholder="React, Javascript, Typescript, etc..." />
        </div>
        <TextArea name="body" label="Body" placeholder="Hi, i would like to share that..." onChange={onChangeHandle} value={data.body} />
      </div>
      <div className="px-8 pb-6 flex gap-4">
        <Button onClick={() => onCancel()} isSecondary>Cancel</Button>
        <Button isSubmit isPrimary>Publish</Button>
      </div>
    </form>
  );
}
