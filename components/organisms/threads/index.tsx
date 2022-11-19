import thread from '../../../features/thread';
import Thread from '../../molecules/thread';
import { Thread as ThreadInterface } from '../../../features/thread/thread.interface';

interface ThreadsInterface{
  threads: ThreadInterface[];
}

export default function Threads({ threads } : ThreadsInterface) {
  if (!thread.length) return <p>loading</p>;
  return <div className="flex flex-col gap-4 max-w-[700px] mx-auto">{threads.map((t : ThreadInterface) => <Thread thread={t} key={t.id} />)}</div>;
}
