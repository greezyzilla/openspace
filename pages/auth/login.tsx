import { AuthTemplate } from '../../components/templates';
import { LoginForm } from '../../components/molecules';
import { Button, Card } from '../../components/atoms';

export default function LoginPage() {
  return (
    <AuthTemplate title="Login">
      <Card size="sm" className="m-4 flex flex-col gap-4 rounded-lg shadow-xl shadow-slate-200 sm:m-0">
        <h1 className="border-b-2 border-slate-100/80 px-8 pt-6 pb-5 text-lg font-medium text-slate-600">Login</h1>
        <LoginForm />
        <p className="mt-1 mb-6 px-8 text-center text-sm text-slate-600">
          Didn&apos;t account yet?&nbsp;
          <Button className="font-medium text-violet-600" isLink href="/auth/register">Register here</Button>
        </p>
      </Card>
    </AuthTemplate>
  );
}
