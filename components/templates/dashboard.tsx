import { ReactNode } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Header, LeftSidebar, RightSidebar } from '../organisms';

interface DashboardTemplateProps{
    /** The node that wrapped by the template */
    children: ReactNode;
    /** The title of the document */
    title: string;
}

export default function DashboardTemplate({ title, children } : DashboardTemplateProps) {
  return (
    <>
      <Head>
        <title>{`${title} | OpenSpace`}</title>
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

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
