import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { postSignOut } from '../../features/auth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from '../atoms';

export default function UserInformation() {
  const user = useAppSelector((state) => state.auth.user)!;

  const dispatch = useAppDispatch();
  const onLogout = async () => dispatch(postSignOut());

  return (
    <Menu as="div" className="relative flex h-full items-center gap-6">
      <Menu.Button className="rounded-md ring-violet-300 ring-offset-1 focus:outline-none focus:ring-2">
        <div className="flex gap-3 rounded-lg px-2 py-1.5">
          <div className="hidden flex-col items-end md:flex">
            <p className="text-sm text-slate-500">{user?.name}</p>
            <p className="text-xs font-light text-slate-400">{user?.email}</p>
          </div>
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="flex items-center justify-center rounded-xl shadow-sm shadow-slate-200 sm:shadow-none"
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100 origin-top-right"
        enterFrom="transform opacity-0 scale-0"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75 origin-top-right"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-0"
      >
        <Menu.Items className="absolute top-20 right-0 z-10 flex flex-col rounded-lg bg-white p-2 text-xs text-slate-500 shadow-lg shadow-slate-100 focus:outline-none">
          <Menu.Item as={Button} className="rounded-md px-4 py-2 hover:bg-violet-50 hover:text-violet-600" isLink href="/">
            Home
          </Menu.Item>
          <Menu.Item as={Button} className="rounded-md px-4 py-2 hover:bg-violet-50 hover:text-violet-600" isLink href="/leaderboard">
            Leaderboard
          </Menu.Item>
          <Menu.Item as={Button} className="rounded-md px-4 py-2 hover:bg-violet-50 hover:text-violet-600" isLink onClick={() => onLogout()}>
            Logout
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

UserInformation.NotAuthenticated = function UserInformationNotAuthenticated() {
  return (
    <Button isLink href="/auth/login" className="rounded-md px-2 py-1.5 text-sm text-white hover:bg-slate-50/50">
      <div className="flex gap-3">
        <div className="hidden flex-col items-end md:flex">
          <p className="text-sm text-slate-500">Has an account?</p>
          <p className="text-xs font-light text-slate-400">Come Here to Sign In.</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <UserIcon className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </Button>
  );
};
