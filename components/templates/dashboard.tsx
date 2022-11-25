import { ReactNode } from 'react';
import Header from '../organisms/header';
import LeftSidebar from '../organisms/leftSidebar';
import RightSidebar from '../organisms/rightSidebar';

interface DashboardProps{
    children : ReactNode;
}

export default function DashboardTemplate({ children } : DashboardProps) {
  return (
    <>
      <Header />
      <div className="flex h-full flex-1 overflow-hidden bg-slate-50 backdrop-blur-lg">
        <LeftSidebar />
        <div className="max-h-full flex-1 overflow-y-auto scroll-smooth p-6">
          <div className="mx-auto max-w-[700px]">
            {children}
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
}
