import { ChangeEvent } from 'react';

interface InputTextProps {
    label: string;
    placeholder: string;
    onChange(e: ChangeEvent<HTMLInputElement>) : void;
    value: string;
    name: string;
}

export default function InputText({
  label, placeholder, onChange, value, name,
} : InputTextProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-500">{ label }</p>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-full border-2 focus:outline-none py-3 focus:ring-4 rounded-lg text-sm px-4 ring-violet-200 border-violet-400"
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
