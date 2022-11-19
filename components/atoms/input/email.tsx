import { ChangeEvent } from 'react';

interface InputEmailProps {
    label: string;
    placeholder: string;
    name: string;
    onChange(e: ChangeEvent<HTMLInputElement>) : void;
    value: string;
}

export default function InputEmail(props : InputEmailProps) {
  const {
    label, placeholder, name, onChange, value,
  } = props;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-500">{ label }</p>
      <input
        type="email"
        name={name}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-violet-400 py-3 px-4 text-sm ring-violet-200 focus:outline-none focus:ring-4"
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
