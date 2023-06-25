import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { MainQuestionsComponent } from './components/main-questions/main-questions.component';
import { MainRowThreeComponent } from './components/main-row-three/main-row-three.component';
import { MainRowTwoComponent } from './components/main-row-two/main-row-two.component';
import { MainRowOneComponent } from './components/main-row-one/main-row-one.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'NotFlix-Home' },
];

@NgModule({
  declarations: [
    HomeComponent,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
