import * as coreActions from './core.actions';
import { User } from 'src/app/shared/models/user';

export interface State {
  isAuth: boolean | null;
  userInfo: User | null;
  localId: string;
}

export const INIT_STATE: State = {
  isAuth: null,
  userInfo: null,
  localId: ''
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

export const getUserInfo = (state: State): User | null => state.userInfo;
