import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import * as fromCore from '../../core'
import { environment } from '../../../environments/environment';
import { SetOnLoginAction } from '../../core/core.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<fromCore.State>,
  ) { }

  get token(): any {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((res) => {
          this.setToken(res);
          this.setData(user);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  logOut() {
    this.setToken(null);
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message }  = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email');
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong pass');
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('User not found');
        break
    }

    return throwError(error);
  }

  public setData(user: User): void {
    this.store.dispatch(new SetOnLoginAction(user));
  }

  private setToken(res: any) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
