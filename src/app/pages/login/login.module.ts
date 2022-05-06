import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginModule {}
