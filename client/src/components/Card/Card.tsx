import { FC, ReactNode } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { CardVariant } from '../../models';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hoverable?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  variant,
  hoverable,
}) => {
  return (
    <div
      className={classNames(
        styles.card,
        variant && styles[variant],
        hoverable && styles.hoverable,
        className
      )}
    >
      {children}
    </div>
  );
}; 