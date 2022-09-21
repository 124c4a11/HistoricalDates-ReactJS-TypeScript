import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import styles from './Pagination.module.scss';

import { IRange } from '../../types/IRange';

interface PaginationProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  items: IRange[];
  currentNdx?: number;
  changeActiveNdx: (ndx: number) => any;
}

export function Pagination({
  className,
  items,
  currentNdx = 0,
  changeActiveNdx,
  ...props
}: PaginationProps): JSX.Element {
  const [activeNdx, setActiveNdx] = useState<number>(0);

  const changeActive = useCallback(
    (ndx: number) => {
      if (ndx === activeNdx) return;

      setActiveNdx(ndx);
      changeActiveNdx(ndx);
    },
    [activeNdx, changeActiveNdx],
  );

  useEffect(() => {
    changeActive(currentNdx);
    setActiveNdx(currentNdx);
  }, [currentNdx, changeActive]);

  return (
    <ul className={cn(styles['pagination'], className)} {...props}>
      {items.map(({ id }, ndx) => (
        <li key={id}>
          <button
            className={cn(styles['pagination__btn'], {
              [styles['pagination__btn_active']]: activeNdx === ndx,
            })}
            onClick={() => changeActive(ndx)}
          >
            <span className="visually-hidden">{ndx + 1}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
