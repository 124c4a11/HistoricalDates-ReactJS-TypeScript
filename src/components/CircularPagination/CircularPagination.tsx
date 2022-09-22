import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import styles from './CircularPagination.module.scss';

import { IRange } from '../../types/IRange';

interface CircularPaginationProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  items: IRange[];
  currentNdx?: number;
  duration?: number;
  changeActiveNdx: (ndx: number) => any;
}

export function CircularPagination({
  items,
  currentNdx = 0,
  duration = 0.8,
  changeActiveNdx,
  ...props
}: CircularPaginationProps): JSX.Element {
  const [activeNdx, setActiveNdx] = useState<number>(0);
  const [circleDeg, setCircleDeg] = useState<number>(0);

  const stepDeg = 360 / items.length;

  function getItemDeg(ndx: number) {
    const initialDegOffset = 30;

    return ndx * stepDeg + initialDegOffset;
  }

  function getButtonTextDeg(ndx: number) {
    const itemDeg = getItemDeg(ndx);

    return -itemDeg - circleDeg;
  }

  const rotateCircle = useCallback(
    (ndx: number) => {
      if (ndx === activeNdx) return;

      const indexDiff = ndx - activeNdx;

      setCircleDeg((prev) => prev - stepDeg * indexDiff);
      setActiveNdx(ndx);
      changeActiveNdx(ndx);
    },
    [activeNdx, changeActiveNdx, stepDeg],
  );

  useEffect(() => {
    rotateCircle(currentNdx);
    setActiveNdx(currentNdx);
  }, [currentNdx, rotateCircle]);

  return (
    <ul
      className={styles['circle']}
      style={{
        transform: `rotate(${circleDeg}deg)`,
        transition: `transform ${duration}s`,
      }}
      {...props}
    >
      {items.map(({ id, title }, ndx) => (
        <li
          key={id}
          className={styles['circle__item']}
          style={{ transform: `rotate(${getItemDeg(ndx)}deg)` }}
        >
          <button
            className={cn(styles['circle__btn'], {
              [styles['circle__btn_active']]: activeNdx === ndx,
            })}
            onClick={() => rotateCircle(ndx)}
          >
            <span
              className={styles['circle__btn-text']}
              style={{
                transform: `rotate(${getButtonTextDeg(ndx)}deg)`,
                transition: `transform ${duration}s`,
              }}
            >
              <span className={styles['circle__btn-number']}>{ndx + 1}</span>
              {title && title !== '' && (
                <span className={styles['circle__btn-title']}>{title}</span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
