import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageOneComponent } from 'src/app/components/register/page-one/page-one.component';
import { PageTwoComponent } from 'src/app/components/register/page-two/page-two.component';
import { PageThreeComponent } from 'src/app/components/register/page-three/page-three.component';
import { PageFourComponent } from 'src/app/components/register/page-four/page-four.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      { path: 'step1', component: PageOneComponent },
      { path: 'step2', component: PageTwoComponent },
      { path: 'step3', component: PageThreeComponent },
      { path: 'step4', component: PageFourComponent },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class RegisterModule {}
