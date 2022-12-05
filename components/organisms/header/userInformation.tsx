import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { postSignOut } from '../../../features/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Button from '../../atoms/button';

export default function UserInformation() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const onLogout = async () => dispatch(postSignOut());

  return (
    <Menu as="div" className="relative flex h-full items-center gap-6">
      <Menu.Button>
        <div className="flex gap-3 rounded-lg p-3 hover:bg-slate-50/50">
          <div className="flex flex-col items-end">
            <p className="text-sm text-slate-500">{user?.name}</p>
            <p className="text-xs font-light text-slate-400">{user?.email}</p>
          </div>
          <img src={user?.avatar} alt={user?.name} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100" />
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
        <Menu.Items className="absolute top-[88px] right-0 z-10 flex flex-col rounded-lg bg-white p-2 text-sm text-slate-600">
          <Menu.Item as={Button} className="px-5 py-2 hover:bg-slate-50" onClick={() => onLogout()}>Logout</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
