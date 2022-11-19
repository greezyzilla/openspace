import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import Card from '../../atoms/card';

interface ModalProps{
    children: ReactNode;
    isOpen: boolean;
    onClose(): void;
}

export default function Modal({ children, isOpen, onClose } : ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-black/25"
        />
        <Transition.Child
          as="div"
          className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel>
            <Card size="lg" className="rounded-2xl overflow-hidden transition-all">
              {children}
            </Card>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
