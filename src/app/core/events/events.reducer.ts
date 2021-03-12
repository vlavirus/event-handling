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
  let sundayEvents: { id: string, data: {} }[] = [];
  let mondayEvents: { id: string, data: {} }[] = [];
  let tuesdayEvents: { id: string, data: {} }[] = [];
  let wednesdayEvents: { id: string, data: {} }[] = [];
  let thursdayEvents: { id: string, data: {} }[] = [];
  let fridayEvents: { id: string, data: {} }[] = [];
  let saturdayEvents: { id: string, data: {} }[] = [];

  switch (action.type) {
    case eventsActions.ON_ADD_CURRENT_DATA:
      return { ...state, currentDate: action.payload.date }
    case eventsActions.GET_WEEK_EVENTS:
      action.payload.filter(({id, data}) => {
        const event = { id, data };
        switch (data['dayOfWeek']) {
          case 'Sunday':
            sundayEvents.push(event);
            break
          case 'Monday':
            mondayEvents.push(event);
            break
          case 'Tuesday':
            tuesdayEvents.push(event);
            break
          case 'Wednesday':
            wednesdayEvents.push(event);
            break
          case 'Thursday':
            thursdayEvents.push(event);
            break
          case 'Friday':
            fridayEvents.push(event);
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
    case eventsActions.GET_WEEK_SHARED_EVENTS:
      action.payload.filter(({id, data}) => {
        const event = { id, data };
        switch (data['dayOfWeek']) {
          case 'Sunday':
            state.sundayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : sundayEvents.push(event);
            break
          case 'Monday':
            state.mondayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : mondayEvents.push(event);
            break
          case 'Tuesday':
            state.thursdayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : thursdayEvents.push(event);
            break
          case 'Wednesday':
            state.wednesdayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : wednesdayEvents.push(event);
            break
          case 'Thursday':
            state.thursdayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : thursdayEvents.push(event);
            break
          case 'Friday':
            state.fridayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : fridayEvents.push(event);
            break
          case 'Saturday':
            state.saturdayEvents.find(exisItem => exisItem['id'] === event['id']) ? null : saturdayEvents.push(event);
            break
          default:
            return
        }
      });

      return {
        ...state,
        sundayEvents: [ ...state.sundayEvents, ...sundayEvents ],
        mondayEvents: [ ...state.mondayEvents, ...mondayEvents ],
        tuesdayEvents: [ ...state.tuesdayEvents, ...mondayEvents ],
        wednesdayEvents: [ ...state.wednesdayEvents, ...wednesdayEvents ],
        thursdayEvents: [ ...state.thursdayEvents, ...thursdayEvents ],
        fridayEvents: [ ...state.fridayEvents, ...fridayEvents ],
        saturdayEvents: [ ...state.saturdayEvents, ...saturdayEvents ],
      }
    case eventsActions.GET_WEEK_DATES:
      return { ...state, weekDates: [ ...action.payload ] }
    case eventsActions.REMOVE_ALL_DATA:
      return { ...INIT_STATE }
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
