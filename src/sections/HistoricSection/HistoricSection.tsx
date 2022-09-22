import { useState } from 'react';
import cn from 'classnames';

import styles from './HistoricSection.module.scss';

import { dateRanges } from '../../data/date-ranges';
import { getFomatedNumString } from '../../utils/getFormatedNumString';
import {
  AnimatedCounter,
  Button,
  CircularPagination,
  Container,
  EventCarousel,
  Pagination,
} from '../../components';
import { AnimatePresence, motion } from 'framer-motion';

export function HistoricSection(): JSX.Element {
  const duration = 0.8;
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
          <AnimatedCounter
            className={cn(styles['date-range__item'], 'text_blue')}
            from={dateRanges[0].scince}
            to={dateRanges[activeNdx].scince}
          />
          <AnimatedCounter
            className={cn(styles['date-range__item'], 'text_pink')}
            from={dateRanges[0].until}
            to={dateRanges[activeNdx].until}
          />
          {dateRanges?.length ? (
            <div className={styles['date-range__pagination-centerer']}>
              <CircularPagination
                currentNdx={activeNdx}
                items={dateRanges}
                changeActiveNdx={setActiveNdx}
                duration={duration}
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
        {dateRanges?.length ? (
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              className={styles['event-carousel']}
              key={dateRanges[activeNdx].id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration / 2 }}
            >
              <h2 className={styles['event-crousel__title']}>
                {dateRanges[activeNdx].title}
              </h2>
              <EventCarousel events={dateRanges[activeNdx].events} />
            </motion.div>
          </AnimatePresence>
        ) : null}
      </Container>
    </section>
  );
}
