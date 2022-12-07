import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/atoms/button';
import Card from '../../components/atoms/card';
import InputEmail from '../../components/atoms/input/email';
import InputPassword from '../../components/atoms/input/password';
import InputText from '../../components/atoms/input/text';
import { AuthTemplate } from '../../components/templates';
import { postRegisterUser } from '../../features/auth';
import { UserRegister } from '../../features/auth/auth.interface';
import { useAppDispatch } from '../../hooks/redux';

interface UserRegisterState extends UserRegister{
  passwordConfirmation: string;
}

export default function Register() {
  const [data, setData] = useState<UserRegisterState>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const dispatch = useAppDispatch();

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { name, email, password } = data;
    dispatch(postRegisterUser({ name, email, password }));
    toast.success('Registration Success');
  };

  return (
    <AuthTemplate>
      <Card className="m-4 flex flex-col gap-4 rounded-lg shadow-xl shadow-slate-200 sm:m-0">
        <h1 className="border-b-2 border-slate-100/80 px-8 pt-6 pb-5 text-lg font-medium text-slate-600">Register</h1>
        <form className="flex flex-col gap-4 px-8 sm:gap-6" onSubmit={onSubmit}>
          <InputText label="Full Name" name="name" onChange={onChangeHandle} placeholder="Alexander Scotch, etc.." value={data.name} />
          <InputEmail label="Email" name="email" onChange={onChangeHandle} placeholder="email@example.com" value={data.email} />
          <div className="flex gap-6">
            <InputPassword label="Password" name="password" onChange={onChangeHandle} placeholder="*********" value={data.password} />
            <InputPassword label="Confirm Password" name="passwordConfirmation" onChange={onChangeHandle} placeholder="*********" value={data.passwordConfirmation} />
          </div>
          <Button isPrimary isSubmit>Register</Button>
        </form>
        <p className="mt-1 mb-6 px-8 text-center text-sm text-slate-600">
          Already has an account?&nbsp;
          <Button className="font-medium text-violet-600" isLink href="/auth/login">Login here</Button>
        </p>
      </Card>
    </AuthTemplate>
  );
}
