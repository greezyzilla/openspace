import { FormEvent } from 'react';
import { PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, InputPassword, InputText } from '../../atoms';
import { PostLogin } from '../../../features/auth/auth.interface';
import { useAppDispatch, useForm } from '../../../hooks';
import { postLoginUser } from '../../../features/auth';
import { PostCommentResponse } from '../../../features/thread/thread.interface';
import { capitalize } from '../../../utils';

export default function LoginForm() {
  const [data, onChange] = useForm<PostLogin>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmitHandle = async (e : FormEvent) => {
    e.preventDefault();
    const response = await dispatch(postLoginUser(data)) as PayloadAction<PostCommentResponse>;

    if (isRejectedWithValue(response)) toast.error(capitalize(response.payload.message));
    else {
      setTimeout(() => router.replace('/'), 500);
      toast.success('Login success');
    }
  };

  return (
    <form className="flex flex-col gap-4 px-8 sm:gap-6" onSubmit={onSubmitHandle}>
      <InputText label="Email" name="email" onChange={onChange} placeholder="email@example.com" value={data.email} />
      <InputPassword label="Password" name="password" onChange={onChange} placeholder="*********" value={data.password} />
      <Button isPrimary isSubmit>Login</Button>
    </form>
  );
}
