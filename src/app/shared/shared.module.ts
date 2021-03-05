import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { EventCreatorComponent } from './components/event-creator/event-creator.component';
import { EventPopupComponent } from './components/event-popup/event-popup.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  imports: [
    BrowserModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule
  ],
    exports: [
        HttpClientModule,
        EventCreatorComponent,
        NotificationComponent
    ],
  providers: [MatDatepickerModule],
  declarations: [EventCreatorComponent, EventPopupComponent, NotificationComponent]
})
export class SharedModule { }
