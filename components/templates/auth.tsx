import { ReactNode } from 'react';

interface AuthTemplateProps{
    children: ReactNode;
}

export default function AuthTemplate({ children } : AuthTemplateProps) {
  return (
    <div className="flex h-full items-center justify-center bg-slate-50/50">
      {children}
    </div>
  );
}
