import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveComponentModule } from '@ngrx/component';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../shared/services/auth.service';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
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
    DashboardSchedulerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    SharedModule,
    ReactiveComponentModule
  ],
  providers: [AuthService]
})
export class DashboardModule { }
