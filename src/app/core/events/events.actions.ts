import { Action } from '@ngrx/store';

export const ON_ADD_CURRENT_DATA = '[EVENTS] On add current data';
export const GET_WEEK_EVENTS = '[EVENTS] Get week events';
export const GET_WEEK_DATES = '[EVENTS] Get week dates';

export class SetCurrentDate implements Action {
  readonly type = ON_ADD_CURRENT_DATA;
  constructor(public payload: { day: number, month: number, year: number }) {}
}

export class GetWeekEvents implements Action {
  readonly type = GET_WEEK_EVENTS;
  constructor(public payload: { data: any; id: string }[]) {}
}

export class GetWeekDates implements Action {
  readonly type = GET_WEEK_DATES;
  constructor(public payload: any[]) {}
}

export type Actions =
  | SetCurrentDate
  | GetWeekEvents
  | GetWeekDates;
