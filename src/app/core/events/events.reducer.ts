import * as eventsActions from './events.actions';

export interface State {
  currentDate: Date | null,
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
  currentDate: null,
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
      return { ...state, currentDate: action.payload.date }
    case eventsActions.GET_WEEK_EVENTS:
      const sundayEvents: {}[] = [];
      const mondayEvents: {}[] = [];
      const tuesdayEvents: {}[] = [];
      const wednesdayEvents: {}[] = [];
      const thursdayEvents: {}[] = [];
      const fridayEvents: {}[] = [];
      const saturdayEvents: {}[] = [];
      action.payload.filter(({id, data}) => {
        const event = { id, data };
        switch (data['dayOfWeek']) {
           case 'Sunday':
             sundayEvents.push(event)
             break
           case 'Monday':
             mondayEvents.push(event)
             break
           case 'Tuesday':
             tuesdayEvents.push(event)
             break
           case 'Wednesday':
             wednesdayEvents.push(event)
             break
           case 'Thursday':
             thursdayEvents.push(event)
             break
           case 'Friday':
             fridayEvents.push(event)
             break
           case 'Saturday':
             saturdayEvents.push(event)
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
export const getCurrentDate = (state: State): Date | null => state.currentDate;
