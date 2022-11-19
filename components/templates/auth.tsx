import { ReactNode } from 'react';

interface AuthTemplateProps{
    children: ReactNode;
}

export default function AuthTemplate({ children } : AuthTemplateProps) {
  return (
    <div className="flex items-center justify-center h-full bg-slate-50/50">
      {children}
    </div>
  );
}
