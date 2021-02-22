import { Action } from '@ngrx/store';

import { User } from '../shared/models/user';

export const ON_LOGIN = '[Core] On login';
export const ON_LOGOUT= '[Core] On logOut';

export class SetOnLoginAction implements Action {
  readonly type = ON_LOGIN;
  constructor(public payload: User) {}
}

export class SetOnLogOutAction implements Action {
  readonly type = ON_LOGOUT;
}

export type Actions =
  | SetOnLoginAction
  | SetOnLogOutAction;
