import classcat from 'classcat';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import Button from './default';

interface ToggleProps{
    /** The node that wrapped by the toggle button */
    children: ReactNode;
    /** The class that used when toggle button state is active */
    activeClassname? : string;
    /** The class that used when toggle button state is inactive */
    inactiveClassname? : string;
    /** The default class that used in all state */
    className?: string;
    /** The state of the toggle button */
    isActive: boolean;
    /** The event that be fired when clicked in active state */
    onActiveClick(): void;
    /** The event that be fired when clicked in inactive state */
    onInactiveClick() : void;
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
