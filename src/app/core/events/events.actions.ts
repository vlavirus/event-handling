import { Action } from '@ngrx/store';

export const ON_ADD_CURRENT_DATA = '[EVENTS] On add current data';
export const GET_WEEK_EVENTS = '[EVENTS] Get week events';
export const GET_WEEK_SHARED_EVENTS = '[EVENTS] Get week shared events';
export const GET_WEEK_DATES = '[EVENTS] Get week dates';
export const REMOVE_ALL_DATA = '[EVENTS] Remove all data';

export class SetCurrentDate implements Action {
  readonly type = ON_ADD_CURRENT_DATA;
  constructor(public payload: { date: Date }) {}
}

export class GetWeekEvents implements Action {
  readonly type = GET_WEEK_EVENTS;
  constructor(public payload: { data: any; id: string }[]) {}
}

export class GetWeekSharedEvents implements Action {
  readonly type = GET_WEEK_SHARED_EVENTS;
  constructor(public payload: { data: any; id: string }[]) {}
}

export class GetWeekDates implements Action {
  readonly type = GET_WEEK_DATES;
  constructor(public payload: any[]) {}
}

export class RemoveAllData implements Action {
  readonly type = REMOVE_ALL_DATA;
}

export type Actions =
  | SetCurrentDate
  | GetWeekEvents
  | GetWeekDates
  | RemoveAllData
  | GetWeekSharedEvents;
