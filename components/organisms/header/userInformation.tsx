import { UserIcon } from '@heroicons/react/24/solid';

export default function UserInformation() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-end">
        <p className="text-sm text-slate-500">Gunawan Wahyu</p>
        <p className="text-xs font-light text-slate-400">greezyzilla@gmail.com</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <UserIcon className="h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}
