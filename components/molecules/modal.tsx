import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface ModalProps{
    /** The node that wrapped by the button */
    children: ReactNode;
    /** The state of the modal */
    isOpen: boolean;
    /** The event that fired if the close button or the backdrop clicked */
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
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px]"
        />
        <Transition.Child
          as="div"
          className="fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto p-4 text-center"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel>{children}</Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
