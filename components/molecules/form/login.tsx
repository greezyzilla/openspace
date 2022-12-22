import { FormEvent } from 'react';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, InputPassword, InputText } from '../../atoms';
import { PostLogin } from '../../../features/auth/auth.interface';
import { useAppDispatch, useForm } from '../../../hooks';
import { postLoginUser } from '../../../features/auth';

export default function LoginForm() {
  const [data, onChange] = useForm<PostLogin>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmitHandle = async (e : FormEvent) => {
    e.preventDefault();
    if (data.email === '' || data.password === '') toast.error('Email or Password can\'t be empty');
    else {
      const response : any = await dispatch(postLoginUser(data));

      if (isRejectedWithValue(response)) toast.error(response.payload.message);
      else {
        toast.success('Login success');
        setTimeout(() => {
          router.replace('/');
        }, 500);
      }
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
