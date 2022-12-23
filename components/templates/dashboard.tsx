import { ReactNode } from 'react';
import Head from 'next/head';
import { Header, LeftSidebar, RightSidebar } from '../organisms';

interface DashboardTemplateProps{
    children : ReactNode;
    title?: string;
}

export default function DashboardTemplate({ title, children } : Partial<DashboardTemplateProps>) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | OpenSpace` : 'OpenSpace'}</title>
      </Head>
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
