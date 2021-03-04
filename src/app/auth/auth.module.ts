import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthComponent } from './auth.component';
import { AuthService } from '../shared/services/auth.service';

const routes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent
  ],
    imports: [
      FormsModule,
      MatButtonModule,
      MatInputModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      CommonModule,
      MatFormFieldModule
    ],
  providers: [AuthService]
})
export class AuthModule { }
