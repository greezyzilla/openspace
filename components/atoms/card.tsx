import classcat from 'classcat';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface CardProps{
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Card({ children, size = 'md', className }: Partial<CardProps>) {
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
