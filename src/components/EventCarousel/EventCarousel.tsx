import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './EventCarousel.module.scss';

import { IEvent } from '../../types/IEvent';
import { Button, EventCard } from '..';

interface EventCarouselProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  events: IEvent[];
}

export function EventCarousel({
  events,
  className,
  ...props
}: EventCarouselProps) {
  const swiperRef = useRef<any>(null);
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  return (
    <div className={cn(styles['carousel'], className)} {...props}>
      <Swiper
        grabCursor
        slidesPerView="auto"
        breakpoints={{
          992: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setIsStart(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {events?.length ? (
          <>
            {events.map((event) => (
              <SwiperSlide className={styles['carousel__slide']} key={event.id}>
                <EventCard data={event} className={styles['carousel__card']} />
              </SwiperSlide>
            ))}
          </>
        ) : null}
      </Swiper>
      <Button
        className={cn(styles['carousel__btn'], styles['carousel__btn_prev'])}
        disabled={isStart}
        variant="white"
        size="sm"
        action="previous"
        onClick={() => swiperRef.current.slidePrev()}
      ></Button>
      <Button
        className={cn(styles['carousel__btn'], styles['carousel__btn_next'])}
        disabled={isEnd}
        variant="white"
        size="sm"
        action="next"
        onClick={() => swiperRef.current.slideNext()}
      ></Button>
    </div>
  );
}
