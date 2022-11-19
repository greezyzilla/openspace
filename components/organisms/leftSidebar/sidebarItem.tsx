import classcat from 'classcat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, ComponentProps, ReactNode } from 'react';

interface SidebarItemProps{
    href: string;
    Icon(_props: ComponentProps<'svg'>) : ReactElement;
    children: ReactNode;
}

export default function SidebarItem({ Icon, href, children } : SidebarItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  const linkClassname = classcat({
    'px-3 rounded-xl py-2 flex text-sm items-center gap-3 mr-2': true,
    'bg-white/90 shadow-md shadow-slate-100/50 text-slate-600/80 after:absolute after:right-0 z-10 after:h-full after:w-[2px] after:bg-violet-500 after:rounded-l-full': isActive,
    'text-slate-500/80': !isActive,
  });

  const iconWrapperClassname = classcat({
    'rounded-lg w-8 h-8 flex justify-center items-center': true,
    'bg-slate-400/10 ring-1 ring-slate-200/0': isActive,
    'bg-slate-400/20': !isActive,
  });

  const iconClassname = classcat({
    'w-4 h-4': true,
    'text-violet-600': isActive,
    'text-slate-500/70': !isActive,
  });

  return (
    <div className="pr-3 relative">
      <Link href={href} className={linkClassname}>
        <div className={iconWrapperClassname}>
          <Icon className={iconClassname} />
        </div>
        {children}
      </Link>
    </div>
  );
}
