import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import Button from '../../atoms/button';
import Modal from '../../molecules/modal';
import SearchThread from './searchThread';
import UserInformation from './userInformation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <header className="flex h-20 items-center justify-between bg-white pr-6">
      <div className="flex items-center py-4">
        <div className="w-[240px] pl-6">
          <h1 className="text-lg font-medium text-slate-800">OpenSpace</h1>
        </div>
        <Button onClick={openModal} className="flex items-center justify-between gap-10 rounded-xl bg-slate-100 px-4 py-2">
          <p className="bg-transparent text-xs text-slate-400 outline-none">
            Type to search
          </p>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm shadow-slate-200">
            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
          </div>
        </Button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <SearchThread onClose={closeModal} />
        </Modal>
      </div>
      <Menu as="div" className="relative flex h-full items-center gap-6">
        <Menu.Button>
          <UserInformation />
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
          <Menu.Items className="absolute top-[88px] right-0 z-10 flex flex-col bg-white p-3 text-sm">
            <Menu.Item>
              <a>Logout</a>
            </Menu.Item>
            <Menu.Item>
              <a>Logout</a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}
