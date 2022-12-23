import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilteredThread, getRelativeDate } from '../../utils';
import { Button } from '../atoms';
import Modal from './modal';
import useToggle from '../../hooks/useToggle';
import { searchThread } from '../../features/thread';

export default function Search() {
  const [isOpen, _, open, close] = useToggle(false);
  const { threads, users, filter } = useAppSelector((state) => ({
    threads: state.thread.threads,
    filter: state.thread.filter,
    users: state.user.users,
  }));

  const dispatch = useAppDispatch();
  const filteredThread = getFilteredThread(filter, threads);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'Slash') open();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <Button onClick={open} className="flex h-10 w-10 items-center justify-center gap-20 rounded-xl bg-slate-100 md:h-auto md:w-auto md:justify-between md:px-4 md:py-2">
        <p className="hidden bg-transparent text-xs text-slate-400 outline-none md:block">
          Type to search
        </p>
        <div className="hidden h-8 items-center justify-center rounded-lg bg-white px-2 text-xs text-slate-500 shadow-sm shadow-slate-200 md:flex">
          Ctrl + /
        </div>
        <MagnifyingGlassIcon className="inline-block h-4 w-4 text-slate-600 md:hidden" />
      </Button>
      <Modal isOpen={isOpen} onClose={close}>
        <div className="absolute top-28 left-1/2 w-11/12 max-w-xl -translate-x-1/2 overflow-hidden rounded-lg bg-white">
          <div className="flex flex-col">
            <div className="relative">
              <input type="text" onChange={(e) => dispatch(searchThread({ filter: e.target.value }))} value={filter} className="w-full bg-transparent px-6 py-5 text-slate-800 focus:outline-none" placeholder="Search thread here..." />
              <MagnifyingGlassIcon className="absolute top-1/2 right-6 h-6 w-6 -translate-y-1/2 text-slate-300" />
            </div>
            {
              !!filter && (
                <div className="flex max-h-72 flex-col overflow-auto border-t-2">
                  { filteredThread.length
                    ? filteredThread?.map((thread) => {
                      const user = users.find((u) => u.id === thread.ownerId)!;
                      return (
                        <Button href={`/details/${thread.id}`} onClick={close} isLink className="flex gap-2 py-3 px-4 hover:bg-slate-50" key={thread.id}>
                          <Image src={user.avatar} alt={user.name} className="rounded-lg" width={52} height={52} />
                          <div className="flex w-full flex-col items-start overflow-hidden">
                            <h3 className="mb-1 w-full truncate text-left font-medium text-slate-800">{thread.title}</h3>
                            <div className="flex w-full justify-between gap-2">
                              <p className="truncate text-sm">
                                Created by&nbsp;
                                <span className="text-sm font-medium">{user?.name}</span>
                                &nbsp;
                                {getRelativeDate(thread.createdAt!)}
                              </p>
                              <p className="w-full max-w-[100px] truncate rounded-md bg-violet-100 p-1 text-xs text-slate-800">
                                #
                                {thread.category}
                              </p>
                            </div>
                          </div>
                        </Button>
                      );
                    }) : <p className="p-4 text-slate-500">No Result found</p>}
                </div>
              )
            }
          </div>
        </div>
      </Modal>
    </>
  );
}
