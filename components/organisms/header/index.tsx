import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import Button from '../../atoms/button';
import Modal from '../../molecules/modal';
import UserInformation from './userInformation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <header className="flex justify-between items-center pr-6 h-20 bg-white">
      <div className="flex items-center py-4">
        <div className="w-[240px] pl-6">
          <h1 className="font-medium text-slate-800 text-lg">OpenSpace</h1>
        </div>
        <Button onClick={openModal} className="px-4 py-2 bg-slate-100 rounded-xl flex justify-between gap-10 items-center">
          <p className="text-slate-400 bg-transparent outline-none text-xs">
            Type to search
          </p>
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm shadow-slate-200">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-500" />
          </div>
        </Button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          Test
        </Modal>
      </div>
      <Menu as="div" className="flex items-center gap-6 h-full relative">
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
          <Menu.Items className="top-[88px] z-10 right-0 absolute bg-white flex flex-col p-3 text-sm">
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
