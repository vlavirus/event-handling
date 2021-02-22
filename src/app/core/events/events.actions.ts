import { Action } from '@ngrx/store';

export const ON_ADD_CURRENT_DATA = '[EVENTS] On add current data';

export class SetCurrentDate implements Action {
  readonly type = ON_ADD_CURRENT_DATA;
  constructor(public payload: {day: number, month: number, year: number}) {}
}

export type Actions =
  | SetCurrentDate;
