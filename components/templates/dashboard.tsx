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
      <div className="bg-slate-50 backdrop-blur-lg flex-1 flex h-full overflow-hidden">
        <LeftSidebar />
        <div className="p-6 max-h-full flex-1 overflow-y-auto scroll-smooth">
          {children}
        </div>
        <RightSidebar />
      </div>
    </>
  );
}
