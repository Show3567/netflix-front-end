import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewControlPipe } from './pipes/overview-control.pipe';
import { MainFooterComponent } from './main/main-footer/main-footer.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { SharedModule } from '../shared/shared.module';
import { MainQuestionsComponent } from './main/main-questions/main-questions.component';
import { MainRowOneComponent } from './main/main-row-one/main-row-one.component';
import { MainRowThreeComponent } from './main/main-row-three/main-row-three.component';
import { MainRowTwoComponent } from './main/main-row-two/main-row-two.component';

@NgModule({
  declarations: [
    OverviewControlPipe,
    MainFooterComponent,
    MainHeaderComponent,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    OverviewControlPipe,
    MainFooterComponent,
    MainHeaderComponent,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
  ],
})
export class CoreModule {}
