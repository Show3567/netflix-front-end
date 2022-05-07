import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { VideoItemComponent } from './movies/video-item/video-item.component';
import { MainFooterComponent } from './main/main-footer/main-footer.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { MainQuestionsComponent } from './main/main-questions/main-questions.component';
import { MainRowOneComponent } from './main/main-row-one/main-row-one.component';
import { MainRowThreeComponent } from './main/main-row-three/main-row-three.component';
import { MainRowTwoComponent } from './main/main-row-two/main-row-two.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
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
