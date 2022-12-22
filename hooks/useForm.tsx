import { ChangeEvent, useState } from 'react';

type changeEvent = (e: ChangeEvent<HTMLInputElement>) => void;
type reset = () => void;

export default function useForm<D>(initialData : D) : [D, changeEvent, reset] {
  const [data, setData] = useState(initialData as D);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const reset = () => setData(initialData);

  return [data, onChange, reset];
}
