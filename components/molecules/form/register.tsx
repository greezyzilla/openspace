import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import {
  Button, InputEmail, InputPassword, InputText,
} from '../../atoms';
import { useAppDispatch, useForm } from '../../../hooks';
import { postRegisterUser } from '../../../features/auth';
import { PostRegisterResponse } from '../../../features/auth/auth.interface';
import { capitalize } from '../../../utils';

export default function RegisterForm() {
  const [data, onChange] = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isPasswordMatch = data.password !== data.passwordConfirmation;

  const onSubmitHandle = async (e : FormEvent) => {
    e.preventDefault();
    if (isPasswordMatch) toast.error('Password doesn\'t match');
    else {
      const { passwordConfirmation: _, ...payload } = data;
      const response = await dispatch(
        postRegisterUser(payload),
      ) as PayloadAction<PostRegisterResponse>;

      if (isRejectedWithValue(response)) toast.error(capitalize(response.payload.message));
      else {
        toast.success('Register success');
        router.replace('/auth/login');
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 px-8 sm:gap-6" onSubmit={onSubmitHandle}>
      <InputText label="Full Name" name="name" onChange={onChange} placeholder="Alexander Scotch, etc.." value={data.name} />
      <InputEmail label="Email" name="email" onChange={onChange} placeholder="email@example.com" value={data.email} />
      <div className="flex gap-6">
        <InputPassword label="Password" name="password" onChange={onChange} placeholder="*********" value={data.password} />
        <InputPassword isValid={!isPasswordMatch} label="Confirm Password" name="passwordConfirmation" onChange={onChange} placeholder="*********" value={data.passwordConfirmation} />
      </div>
      <Button isPrimary isSubmit>Register</Button>
    </form>
  );
}
