import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../shared/services/auth.service';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardResultsComponent } from './dashboard-results/dashboard-results.component';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';
import { DashboardSchedulerComponent } from './dashboard-scheduler/dashboard-scheduler.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardCalendarComponent,
    DashboardSchedulerComponent,
    DashboardResultsComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    SharedModule,
    ReactiveComponentModule,
    MatIconModule
  ],
  providers: [AuthService]
})
export class DashboardModule { }
