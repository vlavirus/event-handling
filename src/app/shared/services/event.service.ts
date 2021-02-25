import { Store } from '@ngrx/store';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import Event from '../models/event';
import * as fromEvents from '../../core';
import { GetWeekDates, GetWeekEvents } from '../../core/events/events.actions';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private dbPath = '/events';
  private eventsRef: AngularFireList<Event>;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<fromEvents.State>
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
    const day = date.getDay(), diff = date.getDate() + day + (day == 0 ? -6 : 0); // adjust when day is sunday
    const startOfDay = new Date(date.setDate(diff)).setHours(23, 59, 59, 0)
    return startOfDay / 1000;
  }

  getWeekDates() {
    let curr = new Date();
    let week = [];

    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first))
      week.push({ date: day.getDate(), dayName: days[day.getDay()].toLowerCase()})
    }
    // @ts-ignore
    this.store.dispatch(new GetWeekDates(week));
  }

  getAll(): AngularFireList<Event> {
    return this.eventsRef;
  }

  create(event: any, activeUserMail: string | undefined): any {
    event.dayOfWeek = days[event.eventDate.getDay()];
    event.eventDate = (event.eventDate.getTime() / 1000) + 1;
    event.user = activeUserMail;

    return this.eventsRef.push(event);
  }

  update(key: string, value: any): Promise<void> {
    return this.eventsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.eventsRef.remove(key);
  }

  getWeekEvents() {
    const start = this.getSunday(new Date());
    const end = this.getSaturday(new Date());
    return this.db.list('events', ref =>
      ref.orderByChild('eventDate').startAfter(start).endAt(end)).valueChanges()
      .subscribe(res => {
        // @ts-ignore
        this.store.dispatch(new GetWeekEvents(res));
      })
  }
}
