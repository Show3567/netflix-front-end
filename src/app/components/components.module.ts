import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageOneComponent } from './register/page-one/page-one.component';
import { PageTwoComponent } from './register/page-two/page-two.component';
import { PageThreeComponent } from './register/page-three/page-three.component';
import { PageFourComponent } from './register/page-four/page-four.component';
import { SharedModule } from '../shared/shared.module';
import { ItemComponent } from './movies/item/item.component';
import { VideoItemComponent } from './movies/video-item/video-item.component';
import { MainFooterComponent } from './main/main-footer/main-footer.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { MainQuestionsComponent } from './main/main-questions/main-questions.component';
import { MainRowOneComponent } from './main/main-row-one/main-row-one.component';
import { MainRowThreeComponent } from './main/main-row-three/main-row-three.component';
import { MainRowTwoComponent } from './main/main-row-two/main-row-two.component';
import { CoreModule } from '../core/core.module';
import { OverviewControlPipe } from '../core/pipes/overview-control.pipe';

@NgModule({
  declarations: [
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    PageFourComponent,
    ItemComponent,
    VideoItemComponent,
    MainFooterComponent,
    MainHeaderComponent,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
  ],
  exports: [
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    PageFourComponent,
    ItemComponent,
    VideoItemComponent,
    MainFooterComponent,
    MainHeaderComponent,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
