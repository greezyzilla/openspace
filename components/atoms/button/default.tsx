import classcat from 'classcat';
import Link from 'next/link';
import { ReactNode, Ref, forwardRef } from 'react';
import PropTypes from 'prop-types';

interface ButtonProps{
    children: ReactNode;
    className?: string;
    isLink? : boolean;
    isExternal? : boolean;
    isPrimary? : boolean;
    isSecondary? : boolean;
    href? : string;
    onClick?() : void;
    isSubmit?: boolean;
    isDisabled?: boolean;
}

const Button = forwardRef((
  props : Partial<ButtonProps>,
  ref : Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const {
    children, className = '', isExternal = false, href = '/', isLink = false,
    isPrimary = false, isSecondary = false, onClick = () => {}, isSubmit = false, isDisabled,
  } = props;

  const buttonClassName = classcat([{
    'focus:outline-none focus:ring-2 focus:ring-violet-300': true,
    'flex-1 rounded-md border border-transparent px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2': isPrimary || isSecondary,
    'bg-violet-600 text-violet-100 hover:bg-violet-500 focus-visible:ring-violet-500': isPrimary && !isSecondary,
    'bg-violet-100 text-violet-900 hover:bg-violet-200 focus-visible:ring-violet-500': !isPrimary && isSecondary,
    'pointer-events-none': isDisabled,
  }, className]);

  const tabIndex = isDisabled ? -1 : 0;

  if (isLink) {
    if (isExternal) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          tabIndex={tabIndex}
          className={buttonClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        tabIndex={tabIndex}
        className={buttonClassName}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} ref={ref as Ref<HTMLButtonElement>} onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isLink: PropTypes.bool,
  isExternal: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isSecondary: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isSubmit: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isLink: false,
  isDisabled: false,
  href: '/',
  className: '',
  isExternal: false,
  isPrimary: false,
  isSecondary: false,
  isSubmit: false,
  onClick: () => {},
};

export default Button;
