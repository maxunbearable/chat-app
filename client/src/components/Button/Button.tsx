import { FC } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonVariant, ButtonSize } from '../../models';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.Primary,
  size,
  isLoading,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        size && styles[size],
        isLoading && styles.loading,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}; 