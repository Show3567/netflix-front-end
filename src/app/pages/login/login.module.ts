import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class LoginModule {}
