import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';

// (if using Next.js or use own dynamic loader)
const ReactQuill = dynamic(
  () => import('react-quill').then((mod) => mod),
  { ssr: false },
);

interface TextAreaProps{
    label: string;
    placeholder: string;
    onChange(_value : ChangeEvent<HTMLInputElement>) : void;
    value: string;
    name: string;
}

export default function TextArea(props : TextAreaProps) {
  const {
    label, placeholder, onChange, value, name,
  } = props;

  const onChangeHandle = (newValue : string) => {
    const customChangeEvent = {
      target: {
        name,
        value: newValue,
      },
    } as ChangeEvent<HTMLInputElement>;
    onChange(customChangeEvent);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-500">{label}</p>
      <ReactQuill
        placeholder={placeholder}
        onChange={onChangeHandle}
        value={value}
        className="break-all"
        style={{ height: 180 }}
        modules={{ toolbar: [[{ color: [] }, { background: [] }, 'bold', 'italic', 'underline', 'strike', { script: 'sub' }, { script: 'super' }, { list: 'ordered' }, { list: 'bullet' }, 'link', 'image', 'clean']] }}
      />
    </div>
  );
}
