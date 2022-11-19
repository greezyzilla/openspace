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
    'w-full border-2 focus:outline-none py-3 focus:ring-4 rounded-lg text-sm px-4': true,
    'ring-violet-200 border-violet-400': isValid,
    'ring-red-200 border-red-400': !isValid,
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
