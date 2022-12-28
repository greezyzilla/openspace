import { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

interface InputTextProps {
    label?: string;
    placeholder: string;
    onChange(e: ChangeEvent<HTMLInputElement>) : void;
    value: string;
    name: string;
}

export default function InputText({
  label = '', placeholder, onChange, value, name,
} : Partial<InputTextProps>) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-sm text-slate-500">{ label }</p>}
      <input
        type="text"
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

InputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

InputText.defaultProps = {
  label: '',
};
