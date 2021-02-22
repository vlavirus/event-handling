import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducer } from './events.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('events', reducer)
  ],
  exports: []
})

export class EventsModule {}
