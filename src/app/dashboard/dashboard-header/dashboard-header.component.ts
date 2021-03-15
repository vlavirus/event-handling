import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import * as fromEvents from 'src/app/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SetCurrentDate } from 'src/app/core/events/events.actions';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Output() shownToggleResult = new EventEmitter();

  constructor(
    private events: EventService,
    public auth: AuthService,
    private store: Store<fromEvents.State>
  ) {}

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut();
  }

  showToday(): void {
    this.events.getWeekDates(new Date());
    this.store.dispatch(new SetCurrentDate({ date:  new Date() }));
  }

  showResults(): void {
    this.shownToggleResult.emit();
  }

}
