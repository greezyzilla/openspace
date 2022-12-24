import Image from 'next/image';
import { Button } from '../../atoms';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="px-2 text-center text-slate-600 sm:px-0">
        <Image width={400} height={400} src="/page-not-found.png" alt="Page not found Designed by Freepik" />
        <p className="px-3 text-sm leading-7 sm:text-base">
          The Page that you looking for is not found
          <br className="hidden sm:block" />
          <span className="inline sm:hidden">, </span>
          are you lost?
        </p>
      </div>
      <Button isLink isPrimary href="/">Back to Home</Button>
    </div>
  );
}
