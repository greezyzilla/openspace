import classcat from 'classcat';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import Button from './default';

interface ToggleProps{
    children: ReactNode;
    activeClassname? : string;
    inactiveClassname? : string;
    className?: string;
    onActiveClick(): void;
    onInactiveClick() : void;
    isActive: boolean;
}

export default function Toggle(props: ToggleProps) {
  const {
    activeClassname, className, inactiveClassname,
    isActive, children, onActiveClick, onInactiveClick,
  } = props;

  const toggleClassname = classcat([{
    [activeClassname!]: isActive,
    [inactiveClassname!]: !isActive,
  }, className]);

  const onClickHandle = () => (isActive ? onActiveClick() : onInactiveClick());

  return (
    <Button className={toggleClassname} onClick={onClickHandle}>
      {children}
    </Button>
  );
}

Toggle.propTypes = {
  children: PropTypes.node.isRequired,
  activeClassname: PropTypes.string,
  inactiveClassname: PropTypes.string,
  className: PropTypes.string,
  onActiveClick: PropTypes.func.isRequired,
  onInactiveClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

Toggle.defaultProps = {
  activeClassname: '',
  inactiveClassname: '',
  className: '',
};
