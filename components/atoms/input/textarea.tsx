import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { importReactQuill } from '../../../utils';

// (if using Next.js or use own dynamic loader)
const ReactQuill = dynamic(importReactQuill, { ssr: false });

interface TextAreaProps{
    /** The label that showing on the top of the input element */
    label: string;
    /** The placeholder that showing inside the input element when input is empty */
    placeholder: string;
    /** The event handler that be fired every input value changed */
    onChange(_value : ChangeEvent<HTMLInputElement>) : void;
    /** The state of the input element */
    value: string;
    /** The name that used to interact with ChangeEvent */
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

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
