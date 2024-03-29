import { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

interface InputEmailProps {
    /** The label that showing on the top of the input element */
    label: string;
    /** The placeholder that showing inside the input element when input is empty */
    placeholder: string;
    /** The name that used to interact with ChangeEvent */
    name: string;
    /** The event handler that be fired every input value changed */
    onChange(e: ChangeEvent<HTMLInputElement>) : void;
    /** The state of the input element */
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

InputEmail.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
