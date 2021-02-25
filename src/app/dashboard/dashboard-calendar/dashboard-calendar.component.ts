import { Component, Output, EventEmitter } from "@angular/core";
const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: "app-dashboard-calendar",
  templateUrl: "./dashboard-calendar.component.html",
  styleUrls: ["./dashboard-calendar.component.scss"]
})
export class DashboardCalendarComponent {
  dates: Array<Date>;
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  date = new Date();
  currentDate = new Date();
  @Output() selected = new EventEmitter();

  constructor() {
    this.dates = this.getCalendarDays(this.date);
  }

  setMonth(inc: number) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.date);
  }

  isSameMonth(date: Date) {
    return date.getMonth() === this.date.getMonth();
  }

  isSameDay(date: Date) {
    return date.getDate() === this.currentDate.getDate() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear();
  }

  private getCalendarDays(date = new Date()) {
    // @ts-ignore
    const calendarStartTime = this.getCalendarStartDay(date).getTime();

    return this.range(0, 41).map(
      num => new Date(calendarStartTime + DAY_MS * num)
    );
  }

  private getCalendarStartDay(date = new Date()) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1, 7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === 0);
  }

  private range(start: any, end: any, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i);
  }
}
