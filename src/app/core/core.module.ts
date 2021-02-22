import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducer } from './core.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('core', reducer)
  ],
  exports: []
})

export class CoreModule {}
