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
      action.payload.filter(({id, data}) => {
         // @ts-ignore
        switch (data['dayOfWeek']) {
           case 'Sunday':
             // @ts-ignore
             sundayEvents.push({id, data})
             break
           case 'Monday' :
             // @ts-ignore
             mondayEvents.push({id, data})
             break
           case 'Tuesday' :
             // @ts-ignore
             tuesdayEvents.push({id, data})
             break
           case 'Wednesday' :
             // @ts-ignore
             wednesdayEvents.push({id, data})
             break
           case 'Thursday' :
             // @ts-ignore
             thursdayEvents.push({id, data})
             break
           case 'Friday' :
             // @ts-ignore
             fridayEvents.push({id, data})
             break
           case 'Saturday' :
             // @ts-ignore
             saturdayEvents.push({id, data})
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
