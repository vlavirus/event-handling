import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import * as fromEvents from 'src/app/core';
import { getCurrentDate } from 'src/app/core';
import { DAY_MS } from 'src/app/shared/constants/constants';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: "app-dashboard-calendar",
  templateUrl: "./dashboard-calendar.component.html",
  styleUrls: ["./dashboard-calendar.component.scss"]
})
export class DashboardCalendarComponent implements OnInit, OnDestroy {
  @Output() selected = new EventEmitter();

  dates!: Array<Date>;
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  date: Date | null = new Date();
  currentDate = new Date();

  public ngUnsubscribe$ = new Subject<any>();

  constructor(
    private events: EventService,
    private store: Store<fromEvents.State>
  ) { }

  ngOnInit(): void {
    this.store.select(getCurrentDate).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.date = res;
      this.dates = this.getCalendarDays(this.date!)
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  setMonth(inc: number): void {
    const [year, month] = [this.date!.getFullYear(), this.date!.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.date);
  }

  isSameMonth(date: Date): boolean {
    return date.getMonth() === this.date!.getMonth();
  }

  isSameDay(date: Date): boolean {
    return date.getDate() === this.currentDate.getDate() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear();
  }

  public showCurrentDate(date: Date): void {
    this.events.getWeekEvents(new Date(date.getTime()));
    this.events.getSharedEvents(new Date(date.getTime()));
    this.events.getWeekDates(new Date(date.getTime()));
  }

  private getCalendarDays(date = new Date()): Date[] {
    const calendarStartTime = this.getCalendarStartDay(date)!.getTime();

    return this.range(0, 41).map(
      num => new Date(calendarStartTime + DAY_MS * num)
    );
  }

  private getCalendarStartDay(date = new Date()): Date | undefined {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(0, 6)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => {
        dt.getHours() === 23 ? dt.setHours(24) : dt;
        return dt.getDay() === 0;
      });
  }

  private range(start: any, end: any, length = end - start + 1): number[] {
    return Array.from({ length }, (_, i) => start + i);
  }
}
