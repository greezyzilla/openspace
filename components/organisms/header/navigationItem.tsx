import classcat from 'classcat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavItemProps {
  href: string;
  children: string;
}

export default function NavigationItem({ children, href } : NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  const linkClassname = classcat({
    'h-full items-center relative flex items-center px-2': true,
    'text-slate-400': !isActive,
    'text-slate-500 font-medium after:w-full after:h-[3px] after:bg-violet-400 after:absolute after:bottom-0 after:left-0': isActive,
  });

  return (
    <Link href={href} className={linkClassname}>{children}</Link>
  );
}
