import * as eventsActions from './events.actions';

export interface State {
  currentDay: number | null,
  currentMonth: number | null,
  currentYear: number | null,
  selectedDay: number | null,
  selectedMonth: number | null,
  selectedYear: number | null,
  weekDates: [],
  sundayEvents: [],
  mondayEvents: [],
  tuesdayEvents: [],
  wednesdayEvents: [],
  thursdayEvents: [],
  fridayEvents: [],
  saturdayEvents: [],
}

export const INIT_STATE: State = {
  currentDay: null,
  currentMonth: null,
  currentYear: null,
  selectedDay: null,
  selectedMonth: null,
  selectedYear: null,
  weekDates: [],
  sundayEvents: [],
  mondayEvents: [],
  wednesdayEvents: [],
  tuesdayEvents: [],
  thursdayEvents: [],
  fridayEvents: [],
  saturdayEvents: []
}

export function reducer(state: State = INIT_STATE, action: eventsActions.Actions) {
  switch (action.type) {
    case eventsActions.ON_ADD_CURRENT_DATA:
      return { ...state, currentDay: action.payload.day, currentMonth: action.payload.month, currentYear: action.payload.year }
    case eventsActions.GET_WEEK_EVENTS:
      const sundayEvents: never[] = [];
      const mondayEvents: never[] = [];
      const tuesdayEvents: never[] = [];
      const wednesdayEvents: never[] = [];
      const thursdayEvents: never[] = [];
      const fridayEvents: never[] = [];
      const saturdayEvents: never[] = [];
      action.payload.filter((res) => {
         switch (res['dayOfWeek']) {
           case 'Sunday':
             sundayEvents.push(res)
             break
           case 'Monday' :
             mondayEvents.push(res)
             break
           case 'Tuesday' :
             tuesdayEvents.push(res)
             break
           case 'Wednesday' :
             wednesdayEvents.push(res)
             break
           case 'Thursday' :
             thursdayEvents.push(res)
             break
           case 'Friday' :
             fridayEvents.push(res)
             break
           case 'Saturday' :
             saturdayEvents.push(res)
             break
           default:
             return
         }
      });

      return {
        ...state,
        sundayEvents: sundayEvents,
        mondayEvents: mondayEvents,
        tuesdayEvents: tuesdayEvents,
        wednesdayEvents: wednesdayEvents,
        thursdayEvents: thursdayEvents,
        fridayEvents: fridayEvents,
        saturdayEvents: saturdayEvents
      }
    case eventsActions.GET_WEEK_DATES:
      return { ...state, weekDates: [ ...action.payload ] }
    default:
      return state;
  }
}

export const getSundayEvents = (state: State): [] | null => state.sundayEvents;
export const getMondayEvents = (state: State): [] | null => state.mondayEvents;
export const getTuesdayEvents = (state: State): [] | null => state.tuesdayEvents;
export const getWednesdayEvents = (state: State): [] | null => state.wednesdayEvents;
export const getThursdayEvents = (state: State): [] | null => state.thursdayEvents;
export const getFridayEvents = (state: State): [] | null => state.fridayEvents;
export const getSaturdayEvents = (state: State): [] | null => state.saturdayEvents;
export const getWeekDates = (state: State): [] | null => state.weekDates;
