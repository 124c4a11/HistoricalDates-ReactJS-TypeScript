import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Container.module.scss';

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export function Container({
  children,
  className,
  ...props
}: ContainerProps): JSX.Element {
  return (
    <div className={cn(styles['container'], className)} {...props}>
      {children}
    </div>
  );
}
