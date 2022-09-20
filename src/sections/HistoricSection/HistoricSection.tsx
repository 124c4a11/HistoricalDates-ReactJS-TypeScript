import cn from 'classnames';

import styles from './HistoricSection.module.scss';

import {
  Button,
  CircularPagination,
  Container,
  Pagination,
} from '../../components';
import { dateRanges } from '../../data/date-ranges';
import { useState } from 'react';
import { getFomatedNumString } from '../../utils/getFormatedNumString';

export function HistoricSection(): JSX.Element {
  const [activeNdx, setActiveNdx] = useState<number>(0);

  function next() {
    if (!dateRanges.length) return;
    if (activeNdx === dateRanges.length - 1) return;

    setActiveNdx((prev) => ++prev);
  }

  function prev() {
    if (!dateRanges.length) return;
    if (activeNdx === 0) return;

    setActiveNdx((prev) => --prev);
  }

  return (
    <section className={styles['section']}>
      <Container className={styles['section__container']}>
        <h1 className={styles['section__title']}>Исторические даты</h1>
        <div className={styles['date-range']}>
          <span
            className={cn(
              styles['date-range__item'],
              styles['date-range__item_blue'],
            )}
          >
            2015
          </span>
          <span
            className={cn(
              styles['date-range__item'],
              styles['date-range__item_pink'],
            )}
          >
            2022
          </span>
          {dateRanges?.length ? (
            <div className={styles['date-range__pagination-centerer']}>
              <CircularPagination
                currentNdx={activeNdx}
                items={dateRanges}
                changeActiveNdx={setActiveNdx}
              />
            </div>
          ) : null}
        </div>
        <div className={styles['controls']}>
          <div>
            <div className={styles['controls__steps']}>
              {getFomatedNumString(activeNdx + 1)}/
              {getFomatedNumString(dateRanges?.length || 0)}
            </div>
            <Button
              className={styles['controls__btn']}
              action="previous"
              disabled={activeNdx === 0}
              onClick={prev}
            ></Button>
            <Button
              className={styles['controls__btn']}
              action="next"
              disabled={activeNdx === dateRanges?.length - 1}
              onClick={next}
            ></Button>
          </div>
          {dateRanges?.length ? (
            <div className={styles['controls__pagination']}>
              <Pagination
                currentNdx={activeNdx}
                items={dateRanges}
                changeActiveNdx={setActiveNdx}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
