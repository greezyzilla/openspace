import { useState } from 'react';

type useToggleReturn = [boolean, ()=>void, ()=>void, ()=>void]

export default function useToggle(initialState : boolean) : useToggleReturn {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((prevState) => !prevState);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);

  return [state, toggle, setTrue, setFalse];
}
