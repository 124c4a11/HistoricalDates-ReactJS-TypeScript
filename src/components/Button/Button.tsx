import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  action?: 'next' | 'previous';
  disabled?: boolean;
}

export function Button({
  action,
  children,
  className,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  const classNames = cn(className, styles['btn'], styles[`btn_${action}`]);

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
