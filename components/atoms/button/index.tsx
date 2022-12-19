import classcat from 'classcat';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps{
    children: ReactNode;
    className?: string;
    isLink? : boolean;
    isExternal? : boolean;
    isPrimary? : boolean;
    isSecondary? : boolean;
    href? : string;
    onClick?() : void;
    isSubmit?: boolean;
    isDisabled?: boolean;
}

export default function Button(props : Partial<ButtonProps>) {
  const {
    children, className = '', isExternal = false, href = '/', isLink = false, isPrimary = false, isSecondary = false, onClick = () => {}, isSubmit = false, isDisabled,
  } = props;

  const buttonClassname = classcat([{
    'focus:outline-none focus:ring-2 focus:ring-violet-300': true,
    'flex-1 rounded-md border border-transparent px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2': isPrimary || isSecondary,
    'bg-violet-600 text-violet-100 hover:bg-violet-500 focus-visible:ring-violet-500': isPrimary && !isSecondary,
    'bg-violet-100 text-violet-900 hover:bg-violet-200 focus-visible:ring-violet-500': !isPrimary && isSecondary,
    'pointer-events-none': isDisabled,
  }, className]);

  if (isLink) {
    if (isExternal) return <a href={href} className={buttonClassname}>{children}</a>;
    return <Link href={href} className={buttonClassname} onClick={onClick}>{children}</Link>;
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} onClick={onClick} className={buttonClassname}>
      {children}
    </button>
  );
}
