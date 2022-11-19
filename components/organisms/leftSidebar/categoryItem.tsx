import { HashtagIcon } from '@heroicons/react/24/solid';

interface CategoryItemProps{
    total: number;
    category: string;
}

export default function CategoryItem({ category, total } : CategoryItemProps) {
  return (
    <a href="" className="px-3 rounded-lg py-2 flex text-sm items-center gap-3 text-slate-500/80 mr-3">
      <div className="rounded-lg w-8 h-8 flex justify-center items-center bg-slate-400/20">
        <HashtagIcon className="w-4 h-4 text-slate-500/70" />
      </div>
      <div className="flex justify-between items-center flex-1 overflow-hidden gap-2">
        <p className="truncate overflow-hidden flex-1">{category}</p>
        <p className="text-xs rounded-lg w-6 h-6 flex items-center justify-center text-violet-400 bg-violet-100">{total}</p>
      </div>
    </a>
  );
}
