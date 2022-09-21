import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface AnimatedCounterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  from?: number;
  to?: number;
}

export function AnimatedCounter({
  from = 0,
  to = 0,
  ...props
}: AnimatedCounterProps): JSX.Element {
  const duration = 20;
  const [current, setCurrent] = useState<number>(from);

  const increment = useCallback(
    (to: number) => {
      if (to === current) return;
      setTimeout(() => {
        setCurrent((prev) => ++prev);
      }, duration);
    },
    [current],
  );

  const decrement = useCallback(
    (to: number) => {
      if (to === current) return;

      setTimeout(() => {
        setCurrent((prev) => --prev);
      }, duration);
    },
    [current],
  );

  useEffect(() => {
    if (to === current) return;

    if (to > current) increment(to);
    if (to < current) decrement(to);
  }, [current, decrement, increment, to]);

  return <div {...props}>{current}</div>;
}
