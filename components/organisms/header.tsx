import { useAppSelector } from '../../hooks';
import { Search, UserNavigation } from '../molecules';
import { Button } from '../atoms';

export default function Header() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="flex h-20 items-center border-b-2 border-slate-50 bg-white pr-6 md:border-none">
      <div className="pl-6 md:w-[240px]">
        <Button isLink href="/" className="py-2 text-lg font-medium text-slate-800">OpenSpace</Button>
      </div>
      <div className="flex flex-1 items-center justify-end gap-1 md:justify-between">
        <Search />
        <div data-cy="user-nav" className="flex">
          {user ? <UserNavigation /> : <UserNavigation.NotAuthenticated />}
        </div>
      </div>
    </header>
  );
}
