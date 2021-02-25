import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import {
  getFridayEvents,
  getMondayEvents,
  getSaturdayEvents,
  getSundayEvents,
  getThursdayEvents,
  getTuesdayEvents,
  getWednesdayEvents, getWeekDates
} from '../../core';
import * as fromEvents from '../../core';

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
    private store: Store<fromEvents.State>
  ) {
    this.store.select(getWeekDates).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.weekDates = [...res];
    })
  }

  ngOnInit(): void {

    this.store.select(getSundayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.sunday = [...res];
    });
    this.store.select(getMondayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.monday = [...res];
    });
    this.store.select(getTuesdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.tuesday = [...res];
    });
    this.store.select(getWednesdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.wednesday = [...res];
    });
    this.store.select(getThursdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.thursday = [...res];
    });
    this.store.select(getFridayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.friday = [...res];
    });
    this.store.select(getSaturdayEvents).pipe(filter(res => !!res), takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      // @ts-ignore
      this.saturday = [...res];
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

}
