import { UserIcon } from '@heroicons/react/24/solid';

export default function UserInformation() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-end">
        <p className="text-sm text-slate-500">Gunawan Wahyu</p>
        <p className="text-xs font-light text-slate-400">greezyzilla@gmail.com</p>
      </div>
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100">
        <UserIcon className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}
