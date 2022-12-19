import classcat from 'classcat';
import { ReactNode } from 'react';
import Button from './default';

interface ToggleProps{
    children: ReactNode;
    activeClassname? : string;
    inactiveClassname? : string;
    className?: string;
    onActiveClick?(): void;
    onInactiveClick?() : void;
    isActive: boolean;
}

export default function Toggle(props: Partial<ToggleProps>) {
  const {
    activeClassname = '', className = '', inactiveClassname = '',
    isActive, children, onActiveClick = () => {}, onInactiveClick = () => {},
  } = props;

  const toggleClassname = classcat([{
    [activeClassname]: isActive,
    [inactiveClassname]: !isActive,
  }, className]);

  const onClickHandle = () => (isActive ? onActiveClick() : onInactiveClick());

  return (
    <Button className={toggleClassname} onClick={onClickHandle}>
      {children}
    </Button>
  );
}
