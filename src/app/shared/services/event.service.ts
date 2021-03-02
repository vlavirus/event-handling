import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import Event from '../models/event';
import { getUserInfo } from '../../core';
import  * as fromCore from '../../core/core.reducer';
import * as fromEvents from '../../core/events/events.reducer';
import { GetWeekDates, GetWeekEvents } from '../../core/events/events.actions';

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
    // @ts-ignore
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

  getWeekDates(curr = new Date()) {
    let week = [];

    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first))
      week.push({ date: day.getDate(), dayName: days[day.getDay()].toLowerCase()})
    }
    // @ts-ignore
    this.eventStore.dispatch(new GetWeekDates(week));

    // @ts-ignore
    this.store.select(getUserInfo).pipe(first()).subscribe(res => {
      // @ts-ignore
      this.userEmail = res.email;
    });
  }

  getAll(): AngularFireList<Event> {
    return this.eventsRef;
  }

  create(event: any, activeUserMail: string | undefined): any {
    event.dayOfWeek = days[event.eventDate.getDay()];
    event.eventDate = (event.eventDate.getTime() / 1000);
    if (this.userEmail != null) {
      this.itemsCollection = this.afs.collection<Event>(this.userEmail);
      this.itemsCollection.add(event);
      return of(true)
    }

    return of(false);
  }

  update(key: string, value: any): Promise<void> {
    return this.eventsRef.update(key, value);
  }


  getWeekEvents(date = new Date()) {
    // @ts-ignore
    this.store.select(getUserInfo).pipe(first()).subscribe((res) => {
      this.userEmail = res && res.email;
    })

    const start = this.getSunday(date);
    const end = this.getSaturday(date);
    if (this.userEmail != null) {
      this.afs.collection(this.userEmail, ref => ref
        .where('eventDate', '>=', start)
        .where('eventDate', '<=', end)).snapshotChanges().pipe(
         map(actions => actions.map(a => {

           const data = a.payload.doc.data()
           const id = a.payload.doc.id;
           return { id, data };
         })))
         .subscribe(res => {
           this.eventStore.dispatch(new GetWeekEvents(res));
         })
    }
  }

  deleteEvent(id: string):void {
    if (this.userEmail != null) {
      this.afs.collection(this.userEmail).doc(id).delete().then(r => of(true));
    }
  }

  updateEvent(id: string, newEvent: any):void {
    newEvent.dayOfWeek = days[newEvent.eventDate.getDay()];
    newEvent.eventDate = (newEvent.eventDate.getTime() / 1000);
    if (this.userEmail != null) {
      this.afs.collection(this.userEmail).doc(id).update(newEvent).then(r => of(true));
    }
  }
}
