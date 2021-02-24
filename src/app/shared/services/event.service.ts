import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import Event from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private dbPath = '/events';
  private eventsRef: AngularFireList<Event>;

  tutorial: Event = new Event();

  constructor(private db: AngularFireDatabase) {
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

  getAll(): AngularFireList<Event> {
    return this.eventsRef;
  }

  create(event: Event): any {
    event.eventDate = (event.eventDate.getTime() / 1000) + 1;

    return this.eventsRef.push(event);
  }

  update(key: string, value: any): Promise<void> {
    return this.eventsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.eventsRef.remove(key);
  }

  getWeekEvents() {
    debugger
    const start = this.getSunday(new Date());
    const end = this.getSaturday(new Date());
    return this.db.list('events', ref =>
      ref.orderByChild('eventDate').startAfter(start).endAt(end)).valueChanges()
      //   .subscribe(data => {
      //     debugger
      // });
  }
}
