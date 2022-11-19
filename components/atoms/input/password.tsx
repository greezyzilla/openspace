import classcat from 'classcat';
import { ChangeEvent } from 'react';

interface InputPasswordProps {
    label: string;
    placeholder: string;
    isValid?: boolean;
    name: string;
    onChange(e: ChangeEvent<HTMLInputElement>) : void;
    value: string;
}

export default function InputPassword(props : Partial<InputPasswordProps>) {
  const {
    label, placeholder, isValid = true, name, onChange, value,
  } = props;
  const inputClassname = classcat({
    'w-full rounded-lg border-2 py-3 px-4 text-sm focus:outline-none focus:ring-4': true,
    'border-violet-400 ring-violet-200': isValid,
    'border-red-400 ring-red-200': !isValid,
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-500">{ label }</p>
      <input
        name={name}
        type="password"
        placeholder={placeholder}
        className={inputClassname}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
