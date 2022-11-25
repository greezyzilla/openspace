import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/atoms/button';
import Card from '../../components/atoms/card';
import InputPassword from '../../components/atoms/input/password';
import InputText from '../../components/atoms/input/text';
import { AuthTemplate } from '../../components/templates';
import { postLoginUser } from '../../features/auth';
import { UserLogin } from '../../features/auth/auth.interface';
import { useAppDispatch } from '../../hooks/redux';

export default function LoginPage() {
  const [data, setData] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await dispatch(postLoginUser(data));

    if (isRejectedWithValue(response.payload)) toast.error(response.payload.message);
    else {
      toast.success('Login success');
      router.replace('/');
    }
  };

  return (
    <AuthTemplate>
      <Card size="sm" className="flex flex-col gap-4 rounded-lg shadow-xl shadow-slate-200">
        <h1 className="border-b-2 border-slate-100/80 px-8 pt-6 pb-5 text-lg font-medium text-slate-600">Login</h1>
        <form className="flex flex-col gap-6 px-8" onSubmit={onSubmit}>
          <InputText label="Email" name="email" onChange={onChangeHandle} placeholder="email@example.com" value={data.email} />
          <InputPassword label="Password" name="password" onChange={onChangeHandle} placeholder="*********" value={data.password} />
          <Button isPrimary isSubmit>Login</Button>
        </form>
        <p className="mt-1 mb-6 px-8 text-center text-sm text-slate-600">
          Didn&apos;t account yet?&nbsp;
          <Button className="font-medium text-violet-600" isLink href="/auth/register">Register here</Button>
        </p>
      </Card>
    </AuthTemplate>
  );
}
