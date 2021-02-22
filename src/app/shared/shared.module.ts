import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EventCreatorComponent } from './components/event-creator/event-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  exports: [
    HttpClientModule,
    EventCreatorComponent
  ],
  providers: [MatDatepickerModule],
  declarations: [EventCreatorComponent]
})
export class SharedModule { }
