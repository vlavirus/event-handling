import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private events: EventService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut();
  }

  public showToday(): void {
    this.events.getWeekEvents(new Date());
    this.events.getWeekDates(new Date());
  }

}
