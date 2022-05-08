import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthWithLocalInterceptor } from 'src/app/interceptors/auth-with-local.interceptor';

const routes: Routes = [{ path: '', component: LoginComponent }];

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
