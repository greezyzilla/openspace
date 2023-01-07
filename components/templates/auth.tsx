import Head from 'next/head';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface AuthTemplateProps{
    /** The node that wrapped by the template */
    children: ReactNode;
    /** The title of the document */
    title: string;
}

export default function AuthTemplate({ children, title } : AuthTemplateProps) {
  return (
    <>
      <Head>
        <title>{`${title} | OpenSpace`}</title>
      </Head>
      <div className="flex h-full items-center justify-center bg-slate-50/50">
        {children}
      </div>
    </>
  );
}

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
