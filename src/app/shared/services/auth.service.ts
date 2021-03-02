import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, first, shareReplay, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import * as fromCore from '../../core';
import { SetOnLoginAction } from '../../core/core.actions';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Event from '../models/event';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    public http: HttpClient,
    private router: Router,
    private store: Store<fromCore.State>,
  ) {}

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
          // this.setData(user);
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

  isValidSession(): any {
    const token = localStorage.getItem('fb-token');

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, { "idToken": token })
      .pipe(
        first(),
        shareReplay(1),
        tap(res => {
          const user = {
            // @ts-ignore
            email: res.users[0].email,
            password: '',
            returnSecureToken: true
          }
          this.store.dispatch(new SetOnLoginAction(user));
        }),
        switchMap(_ => of(true)),
        catchError(res => {
          return of(false);
        })
      )
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
