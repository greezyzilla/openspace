import classcat from 'classcat';
import { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

interface InputPasswordProps {
    /** The label that showing on the top of the input element */
    label: string;
    /** The placeholder that showing inside the input element when input is empty */
    placeholder: string;
    /** If isValid is false, the input ring style become danger (red) */
    isValid?: boolean;
    /** The name that used to interact with ChangeEvent */
    name: string;
    /** The event handler that be fired every input value changed */
    onChange(e: ChangeEvent<HTMLInputElement>) : void;
    /** The state of the input element */
    value: string;
}

export default function InputPassword(props : InputPasswordProps) {
  const {
    label, placeholder, isValid, name, onChange, value,
  } = props;
  const inputClassname = classcat({
    'w-full rounded-lg border-2 py-3 px-4 text-sm focus:outline-none focus:ring-4': true,
    'border-violet-400 ring-violet-200': isValid,
    'border-red-400 ring-red-200': !isValid,
  });

  return (
    <div className="flex flex-1 flex-col gap-2">
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

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
};

InputPassword.defaultProps = {
  isValid: true,
};
