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
  const isActive = decodeURI(router.asPath) === href;

  const linkClassname = classcat({
    'mr-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm': true,
    'z-10 bg-white/90 text-slate-600/80 shadow-md shadow-slate-100/50 after:absolute after:right-0 after:h-full after:w-[2px] after:rounded-l-full after:bg-violet-500': isActive,
    'text-slate-500/80': !isActive,
  });

  const iconWrapperClassname = classcat({
    'flex h-8 w-8 items-center justify-center rounded-lg': true,
    'bg-slate-400/10 ring-1 ring-slate-200/0': isActive,
    'bg-slate-400/20': !isActive,
  });

  const iconClassname = classcat({
    'h-4 w-4': true,
    'text-violet-600': isActive,
    'text-slate-500/70': !isActive,
  });

  return (
    <div className="relative pr-3">
      <Link href={href} className={linkClassname}>
        <div className={iconWrapperClassname}>
          <Icon className={iconClassname} />
        </div>
        {children}
      </Link>
    </div>
  );
}
