import { IEvent } from './IEvent';

export interface IRange {
  id: number;
  scince: number;
  until: number;
  title: string;
  events: IEvent[];
}
