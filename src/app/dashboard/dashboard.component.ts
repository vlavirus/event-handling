import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromEvents from '../core'
import { SetCurrentDate } from '../core/events/events.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isShown: boolean = false;

  constructor(
    private store: Store<fromEvents.State>,
  ) { }

  ngOnInit(): void {
    const curDate = new Date();
    this.store.dispatch(new SetCurrentDate({day: curDate.getDate(), month: curDate.getMonth(), year: curDate.getFullYear() }));
  }

  toggleShow() {
    this.isShown = ! this.isShown;
  }
}
