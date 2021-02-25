import * as fromCore from './core.reducer';
import * as fromEvents from './events/events.reducer';
import { createSelector } from '@ngrx/store';

export interface State {
  core: fromCore.State,
  events: fromEvents.State
}

export const reducers = {
  core: fromCore.reducer,
  events: fromEvents.reducer
};

export const getCoreState = (state: State) => state.core;
export const getEventsState = (state: State) => state.events;
export const getUserInfo = createSelector(
  getCoreState,
  fromCore.getUserInfo
);

export const getSundayEvents = createSelector(
  getEventsState,
  fromEvents.getSundayEvents
);

export const getMondayEvents = createSelector(
  getEventsState,
  fromEvents.getMondayEvents
);

export const getTuesdayEvents = createSelector(
  getEventsState,
  fromEvents.getTuesdayEvents
);

export const getWednesdayEvents = createSelector(
  getEventsState,
  fromEvents.getWednesdayEvents
);

export const getThursdayEvents = createSelector(
  getEventsState,
  fromEvents.getThursdayEvents
);

export const getFridayEvents = createSelector(
  getEventsState,
  fromEvents.getFridayEvents
);

export const getSaturdayEvents = createSelector(
  getEventsState,
  fromEvents.getSaturdayEvents
);

export const getWeekDates = createSelector(
  getEventsState,
  fromEvents.getWeekDates
);
