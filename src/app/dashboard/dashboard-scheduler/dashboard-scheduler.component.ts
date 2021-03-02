import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import {
  getWeekDates,
  getFridayEvents,
  getMondayEvents,
  getSaturdayEvents,
  getSundayEvents,
  getThursdayEvents,
  getTuesdayEvents,
  getWednesdayEvents
} from '../../core';
import * as fromEvents from '../../core';
import { EventPopupComponent } from '../../shared/components/event-popup/event-popup.component';

@Component({
  selector: 'app-dashboard-scheduler',
  templateUrl: './dashboard-scheduler.component.html',
  styleUrls: ['./dashboard-scheduler.component.scss']
})
export class DashboardSchedulerComponent implements OnInit, OnDestroy {
  sunday: [] = [];
  monday: [] = [];
  tuesday: [] = [];
  wednesday: [] = [];
  thursday: [] = [];
  friday: [] = [];
  saturday: [] = [];

  weekDates: [] | undefined;

  public ngUnsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<fromEvents.State>,
    public popup: MatDialog
  ) {
    this.store.select(getWeekDates).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.weekDates = [ ...res ];
    })
  }

  ngOnInit(): void {
    this.store.select(getSundayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.sunday = [ ...res ];
    });
    this.store.select(getMondayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.monday = [ ...res ];
    });
    this.store.select(getTuesdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.tuesday = [ ...res ];
    });
    this.store.select(getWednesdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.wednesday = [ ...res ];
    });
    this.store.select(getThursdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.thursday = [ ...res ];
    });
    this.store.select(getFridayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.friday = [ ...res ];
    });
    this.store.select(getSaturdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.saturday = [ ...res ];
    });
  }

  openDialog(item: any): void {
    const dialogRef = this.popup.open(EventPopupComponent, {
      // width: '250px',
      data: {
        dayOfWeek: item.data.dayOfWeek,
        eventDate: item.data.eventDate,
        eventDescr: item.data.eventDescr,
        eventName: item.data.eventName,
        eventType: item.data.eventType,
        id: item.id
      }
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    debugger

    const date = event.previousContainer.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );

    }
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

}
