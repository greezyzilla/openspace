import Head from 'next/head';
import { PageNotFound } from '../components/organisms';

export default function _404() {
  return (
    <>
      <Head>
        <title>Page Not Found | OpenSpace</title>
      </Head>
      <div className="flex h-full w-full items-center justify-center bg-slate-50">
        <PageNotFound />
      </div>
    </>
  );
}
