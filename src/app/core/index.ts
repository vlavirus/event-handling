import * as fromCore from './core.reducer';
import * as fromEvents from './events/events.reducer';

export interface State {
  core: fromCore.State,
  events: fromEvents.State
}

export const reducers = {
  core: fromCore.reducer,
  events: fromEvents.reducer
};
