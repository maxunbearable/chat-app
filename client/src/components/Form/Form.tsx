import { FC } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: FC<FormGroupProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.formGroup, className)}>
      {children}
    </div>
  );
};

interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const FormLabel: FC<FormLabelProps> = ({ children, htmlFor, className }) => {
  return (
    <label className={classNames(styles.formLabel, className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FormInput: FC<FormInputProps> = ({ error, className, ...props }) => {
  return (
    <input
      className={classNames(styles.formInput, error && styles.error, className)}
      {...props}
    />
  );
};

interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
}

export const FormError: FC<FormErrorProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.formError, className)}>
      {children}
    </div>
  );
};

interface FormHelpProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelp: FC<FormHelpProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.formHelp, className)}>
      {children}
    </div>
  );
}; 