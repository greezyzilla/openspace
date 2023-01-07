import classcat from 'classcat';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface CardProps{
    /** The node that wrapped by the card */
    children: ReactNode;
    /** The maximum size of the card */
    size?: 'sm' | 'md' | 'lg';
    /** Additional classname to style the card */
    className?: string;
}

export default function Card({ children, size, className }: CardProps) {
  const cardClassname = classcat([{
    'w-full bg-white text-left': true,
    'max-w-sm': size === 'sm',
    'max-w-md': size === 'md',
    'max-w-lg': size === 'lg',
  }, className]);

  return (
    <div className={cardClassname}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

Card.defaultProps = {
  size: 'md',
  className: '',
};
