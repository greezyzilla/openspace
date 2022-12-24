import Image from 'next/image';
import { Button } from '../../atoms';

export default function ThreadNotFound() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center text-slate-600">
        <Image width={400} height={400} src="/thread-not-found.png" alt="Thread not found Designed by Freepik" />
        <p className="-mt-4 px-3 text-sm leading-6 sm:text-base">
          The thread that you looking for is not found&nbsp;
          <br className="hidden sm:block" />
          maybe you misspelled it
        </p>
      </div>
      <Button isLink isPrimary href="/">Back to Home</Button>
    </div>
  );
}
