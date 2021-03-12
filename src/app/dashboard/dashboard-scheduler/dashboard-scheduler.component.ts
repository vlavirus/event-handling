import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  getWeekDates,
  getFridayEvents,
  getMondayEvents,
  getSaturdayEvents,
  getSundayEvents,
  getThursdayEvents,
  getTuesdayEvents,
  getWednesdayEvents
} from 'src/app/core';
import * as fromEvents from 'src/app/core';
import { DAY_S } from 'src/app/shared/constants/constants';
import { EventService } from 'src/app/shared/services/event.service';
import { EventPopupComponent } from 'src/app/shared/components/event-popup/event-popup.component';

@Component({
  selector: 'app-dashboard-scheduler',
  templateUrl: './dashboard-scheduler.component.html',
  styleUrls: ['./dashboard-scheduler.component.scss']
})
export class DashboardSchedulerComponent implements OnInit, OnDestroy {
  weekData: { [index: string]: any } = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };

  weekDates: any[] = [];

  today = new Date().getDate();
  month = new Date().getMonth();
  year = new Date().getFullYear();

  public ngUnsubscribe$ = new Subject<any>();

  constructor(
    private store: Store<fromEvents.State>,
    private events: EventService,
    public popup: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.select(getWeekDates).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe((res: [] | null) => {
      // @ts-ignore
      this.weekDates = [...res];
    });
    this.store.select(getSundayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.sunday = [...res];
    });
    this.store.select(getMondayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.monday = [...res];
    });
    this.store.select(getTuesdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.tuesday = [...res];
    });
    this.store.select(getWednesdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.wednesday = [...res];
    });
    this.store.select(getThursdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.thursday = [...res];
    });
    this.store.select(getFridayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.friday = [...res];
    });
    this.store.select(getSaturdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.weekData.saturday = [...res];
    });
  }

  openDialog(item: any): void {
    const dialogRef = this.popup.open(EventPopupComponent, {
      data: {
        dayOfWeek: item.data.dayOfWeek,
        eventDate: item.data.eventDate,
        eventDescr: item.data.eventDescr,
        eventName: item.data.eventName,
        eventType: item.data.eventType,
        eventTimeStart: item.data.eventTimeStart,
        eventTimeEnd: item.data.eventTimeEnd,
        id: item.id
      }
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      const draggedEvent = JSON.parse(JSON.stringify(event.previousContainer.data['data'][event.previousIndex]));
      const prevDayNumber = event.previousContainer.data['dayNumber'];
      const dayNumber = event.container.data['dayNumber'];
      const dayName = event.previousContainer.data['dayName'];
      let newEventDate = draggedEvent.data.eventDate + (( dayNumber - prevDayNumber ) * DAY_S);
      draggedEvent.data.eventDate = new Date(newEventDate * 1000);

      this.weekData[dayName] = this.weekData[dayName].filter((item: any, id: number) => id !== event.previousIndex);
      this.events.updateEvent(draggedEvent.id, draggedEvent.data);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

}
