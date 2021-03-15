import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { filter, first, map } from 'rxjs/operators';
import { Selector, Store } from '@ngrx/store';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { getUserInfo } from 'src/app/core';
import Event from 'src/app/shared/models/event';
import  * as fromCore from 'src/app/core/core.reducer';
import * as fromEvents from 'src/app/core/events/events.reducer';
import { GetWeekDates, GetWeekEvents, GetWeekSharedEvents } from 'src/app/core/events/events.actions';
import { MONTH_DAY_COUNT } from '../../constants/month';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private dbPath = '/events';
  private eventsRef: AngularFireList<Event>;
  private userEmail: string | null | undefined;
  private itemsCollection: AngularFirestoreCollection<Event> | undefined;

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private eventStore: Store<fromEvents.State>,
    private store: Store<fromCore.State>
  ) {
    this.eventsRef = db.list(this.dbPath);
  }

  private getSunday(date: Date): number {
    date = new Date(date);
    const day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 0); // adjust when day is sunday
    const startOfDay = new Date(date.setDate(diff)).setHours(0, 0, 0, 0)
    return startOfDay / 1000;
  }

  private getSaturday(date: Date) {
    date = new Date(date);
    const day = date.getDay(), diff = date.getDate() - day + (day == 0 ? 0 : 6); // adjust when day is sunday
    const startOfDay = new Date(date.setDate(diff)).setHours(23, 59, 59, 0)
    return startOfDay / 1000;
  }

  private getMonthBeginTime(month: number): number {
    const monthBegin = new Date();
    monthBegin.setHours(0);
    monthBegin.setMonth(month);
    monthBegin.setMinutes(0);
    monthBegin.setDate(1);

    return new Date(monthBegin).getTime() / 1000;
  }

  private getMonthEndTime(month: number, dayCounter: number): number {
    const monthEnd = new Date();
    monthEnd.setHours(23);
    monthEnd.setMonth(month);
    monthEnd.setMinutes(59);
    monthEnd.setDate(dayCounter);

    return new Date(monthEnd).getTime() / 1000;
  }

  getWeekDates(curr = new Date()) {
    let week = [];

    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first))
      week.push({ date: day.getDate(), month: day.getMonth(), year: day.getFullYear(), dayName: days[day.getDay()].toLowerCase()})
    }
    this.eventStore.dispatch(new GetWeekDates(week));
    this.store.select(getUserInfo as Selector<any, any>).pipe(first()).subscribe(res => {
    this.userEmail = res.email;
    });
  }

  getAll(): AngularFireList<Event> {
    return this.eventsRef;
  }

  create(event: any, activeUserMail: string | undefined): any {
    event.eventTimeStart = (new Date(event.eventTimeStart).getTime() / 1000);
    event.eventTimeEnd = (new Date(event.eventTimeEnd).getTime() / 1000);
    event.dayOfWeek = days[new Date(event.eventTimeStart * 1000).getDay()];
    event.dayOfWeek = days[new Date(event.eventTimeStart * 1000).getDay()];
    event.status = 'active';
    event.user = this.userEmail;
    if (this.userEmail != null) {
      this.itemsCollection = this.afs.collection<Event>('events');
      this.itemsCollection.add(event);
      return of(true);
    }

    return of(false);
  }

  update(key: string, value: any): Promise<void> {
    return this.eventsRef.update(key, value);
  }

  getWeekEvents(date = new Date()) {
    this.store.select(getUserInfo as Selector<any, any>).pipe(first()).subscribe((res) => {
      this.userEmail = res && res.email;
    })

    const start = this.getSunday(date);
    const end = this.getSaturday(date);
    if (this.userEmail != null) {

      this.afs.collection('events', ref => ref
        .where('user', '==', this.userEmail)
        .where('eventTimeStart', '>=', start)
        .where('eventTimeStart', '<=', end)
      ).snapshotChanges().pipe(
        filter(data => !!data),
        map(actions => actions.map(res => {
          const data = res.payload.doc.data()
          const id = res.payload.doc.id;
          return { id, data };
        })))
        .subscribe(res => {
          this.eventStore.dispatch(new GetWeekEvents(res));
          this.getSharedEvents(date);
        })
    }
  }

  getSharedEvents(date = new Date()) {
    this.store.select(getUserInfo as Selector<any, any>).pipe(first()).subscribe((res) => {
      this.userEmail = res && res.email;
    })

    const start = this.getSunday(date);
    const end = this.getSaturday(date);
    if (this.userEmail != null) {
      this.afs.collection('events', ref => ref
        .where('eventGuests', 'array-contains', this.userEmail)
        .where('eventTimeStart', '>=', start)
        .where('eventTimeStart', '<=', end)
      ).snapshotChanges().pipe(
        map(actions => actions.map(res => {
          const data = res.payload.doc.data()
          const id = res.payload.doc.id;
          return { id, data };
        })))
        .subscribe(res => {
          this.eventStore.dispatch(new GetWeekSharedEvents(res));
      })
    }
  }

  deleteEvent(id: string):void {
    if (this.userEmail != null) {
      this.afs.collection('events').doc(id).delete().then(r => of(true));
    }
  }

  updateEvent(id: string, newEvent: any): void {
    newEvent.dayOfWeek = days[new Date(newEvent.eventTimeStart * 1000).getDay()];
    if (this.userEmail != null) {
      this.afs.collection('events').doc(id).update(newEvent).then(r => of(true));
    }
  }

  done(id: string): void {
    this.afs.collection('events').doc(id).update({
      status: 'done'
    })
  }

  getActiveEvents(month: number, dayCounter: number): any {
    const start = this.getMonthBeginTime(month);
    const end = this.getMonthEndTime(month, dayCounter);
    return this.afs.collection('events', ref => ref
      .where('user', '==', this.userEmail)
      .where('status', '==', 'active')
      .where('eventTimeStart', '>=', start)
      .where('eventTimeStart', '<=', end)
    ).get().pipe(map(res => res.size))
  };

  getDoneEvents(month: number, dayCounter: number): any {
    const start = this.getMonthBeginTime(month);
    const end = this.getMonthEndTime(month, dayCounter);
    return this.afs.collection('events', ref => ref
      .where('user', '==', this.userEmail)
      .where('status', '==', 'done')
      .where('eventTimeStart', '>=', start)
      .where('eventTimeStart', '<=', end)
    ).get().pipe(map(res => res.size))
  };


}
