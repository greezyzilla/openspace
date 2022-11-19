import thread from '../../../features/thread';
import { useAppSelector } from '../../../hooks/redux';
import Thread from '../../molecules/thread';

export default function Threads() {
  const threads = useAppSelector((state) => state.thread.threads);

  if (!thread.length) return <p>loading</p>;
  return <div className="flex flex-col gap-4 max-w-[700px] mx-auto">{threads.map((t) => <Thread thread={t} key={t.id} />)}</div>;
}
