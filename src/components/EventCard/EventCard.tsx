import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import { IEvent } from '../../types/IEvent';

import styles from './EventCard.module.scss';

interface EventCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IEvent;
}

export function EventCard({
  data,
  className,
  ...props
}: EventCardProps): JSX.Element {
  return (
    <div className={cn(styles['card'], className)} {...props}>
      <h2 className={styles['card__title']}>{data.year}</h2>
      <p>{data.description}</p>
    </div>
  );
}
