import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  disabled?: boolean;
  action?: 'next' | 'previous';
  variant?: 'white' | 'outline';
  size?: 'md' | 'sm';
}

export function Button({
  action,
  children,
  className,
  disabled,
  variant = 'outline',
  size = 'md',
  ...props
}: ButtonProps): JSX.Element {
  const classNames = cn(
    className,
    styles['btn'],
    styles[`btn_${action}`],
    styles[`btn_${variant}`],
    styles[`btn_${size}`],
  );

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
