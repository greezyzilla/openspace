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
    'relative flex h-full items-center px-2': true,
    'text-slate-400': !isActive,
    'font-medium text-slate-500 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-violet-400': isActive,
  });

  return (
    <Link href={href} className={linkClassname}>{children}</Link>
  );
}
