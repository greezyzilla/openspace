import classcat from 'classcat';
import Link from 'next/link';
import { ReactNode, Ref, forwardRef } from 'react';
import PropTypes from 'prop-types';

interface ButtonProps{
    /** The node that wrapped by the button */
    children: ReactNode;
    /** Additional classname to style the button */
    className?: string;
    /** If isLink is true, this component become a link */
    isLink? : boolean;
    /** If isExternal is true, this component used to navigate outside the base url.
     *  isLink must be true before use this */
    isExternal? : boolean;
    /** If isPrimary is true, this component will use primary styling */
    isPrimary? : boolean;
    /** If isSecondary is true, this component will use secondary styling */
    isSecondary? : boolean;
    /** The target for link to navigate to */
    href? : string;
    /** The event that fired if the button or internal link clicked */
    onClick?() : void;
    /** If isSubmit is true, this button type become submit. Must be used with form wrapper */
    isSubmit?: boolean;
    /** If isDisabled is true, this button can't be interacted with */
    isDisabled?: boolean;
}

const Button = forwardRef((
  props : ButtonProps,
  ref : Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const {
    children, className, isExternal, href, isLink,
    isPrimary, isSecondary, onClick, isSubmit, isDisabled,
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
        href={href!}
        onClick={onClick}
        tabIndex={tabIndex}
        className={buttonClassName}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} ref={ref as Ref<HTMLButtonElement>} onClick={onClick} className={buttonClassName} disabled={isDisabled}>
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
