import Head from 'next/head';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface AuthTemplateProps{
    children: ReactNode;
    title?: string;
}

export default function AuthTemplate({ children, title } : Partial<AuthTemplateProps>) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | OpenSpace` : 'OpenSpace'}</title>
      </Head>
      <div className="flex h-full items-center justify-center bg-slate-50/50">
        {children}
      </div>
    </>
  );
}

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

AuthTemplate.defaultProps = {
  title: 'OpenSpace',
};
