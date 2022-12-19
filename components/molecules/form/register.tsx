import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import {
  Button, InputEmail, InputPassword, InputText,
} from '../../atoms';
import { useAppDispatch } from '../../../hooks/redux';
import { postRegisterUser } from '../../../features/auth';

export default function RegisterForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onChangeHandle = (e : ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandle = async (e : FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.password || !data.password || !data.passwordConfirmation) toast.error('Email or Password can\'t be empty');
    else if (data.password !== data.passwordConfirmation) toast.error('Password doesn\'t match');
    else {
      const response : any = await dispatch(postRegisterUser({
        email: data.email,
        name: data.name,
        password: data.password,
      }));

      if (isRejectedWithValue(response)) {
        toast.error(response.payload.message);
      } else {
        toast.success('Register success');
        router.replace('/auth/login');
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 px-8 sm:gap-6" onSubmit={onSubmitHandle}>
      <InputText label="Full Name" name="name" onChange={onChangeHandle} placeholder="Alexander Scotch, etc.." value={data.name} />
      <InputEmail label="Email" name="email" onChange={onChangeHandle} placeholder="email@example.com" value={data.email} />
      <div className="flex gap-6">
        <InputPassword label="Password" name="password" onChange={onChangeHandle} placeholder="*********" value={data.password} />
        <InputPassword label="Confirm Password" name="passwordConfirmation" onChange={onChangeHandle} placeholder="*********" value={data.passwordConfirmation} />
      </div>
      <Button isPrimary isSubmit>Register</Button>
    </form>
  );
}
