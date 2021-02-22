import { User } from '../shared/models/user';
import * as coreActions from './core.actions';

export interface State {
  isAuth: boolean | null;
  userInfo: User | null;
}

export const INIT_STATE: State = {
  isAuth: null,
  userInfo: null
}

export function reducer(state: State = INIT_STATE, action: coreActions.Actions) {
  switch (action.type) {
    case coreActions.ON_LOGIN:
      return { isAuth: true, userInfo: action.payload };
    case coreActions.ON_LOGOUT:
      return { isAuth: false, userInfo: null }
    default:
      return state;
  }
}
