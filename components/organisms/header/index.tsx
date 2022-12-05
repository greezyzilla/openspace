import { UserIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../../hooks/redux';
import Button from '../../atoms/button';
import SearchThread from './searchThread';
import UserInformation from './userInformation';

export default function Header() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="flex h-20 items-center justify-between bg-white pr-6">
      <div className="flex items-center py-4">
        <div className="w-[240px] pl-6">
          <Button isLink href="/" className="text-lg font-medium text-slate-800">OpenSpace</Button>
        </div>
        <SearchThread />
      </div>
      {user
        ? <UserInformation /> : (
          <Button isLink href="/auth/login" className="rounded-md p-3 text-sm text-white hover:bg-slate-50/50">
            <div className="flex gap-3">
              <div className="flex flex-col items-end">
                <p className="text-sm text-slate-500">Has an account?</p>
                <p className="text-xs font-light text-slate-400">Come Here to Sign In.</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <UserIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </Button>
        )}
    </header>
  );
}
