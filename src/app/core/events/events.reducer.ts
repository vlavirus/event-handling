import * as eventsActions from './events.actions';

export interface State {
  currentDay: number | null,
  currentMonth: number | null,
  currentYear: number | null,
  selectedDay: number | null,
  selectedMonth: number | null,
  selectedYear: number | null
  currentWeekEvents: [] | null
}

export const INIT_STATE: State = {
  currentDay: null,
  currentMonth: null,
  currentYear: null,
  selectedDay: null,
  selectedMonth: null,
  selectedYear: null,
  currentWeekEvents: null
}

export function reducer(state: State = INIT_STATE, action: eventsActions.Actions) {
  switch (action.type) {
    case eventsActions.ON_ADD_CURRENT_DATA:
      return { ...state, currentDay: action.payload.day, currentMonth: action.payload.month, currentYear: action.payload.year }
    default:
      return state
  }
}
