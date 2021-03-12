import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromEvents from '../core'
import { AuthService } from '../shared/services/auth.service';
import { SetCurrentDate } from '../core/events/events.actions';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isShown: boolean = false;

  constructor(
    public auth: AuthService,
    public events: EventService,
    private store: Store<fromEvents.State>
  ) { }

  ngOnInit(): void {
    const curDate = new Date();
    this.store.dispatch(new SetCurrentDate({ date:  curDate }));
    this.auth.isValidSession().subscribe((res: any) => {
      if (res) {
        this.events.getWeekEvents();
        this.events.getWeekDates();
        // this.events.getSharedEvents();
      }
    })
  }

  toggleShow() {
    this.isShown = ! this.isShown;
  }
}
