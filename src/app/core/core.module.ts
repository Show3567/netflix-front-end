import { ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OverviewControlPipe } from './pipes/overview-control.pipe';
import { MainFooterComponent } from './main/main-footer/main-footer.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { MainRowOneComponent } from './main/main-row-one/main-row-one.component';
import { MainRowTwoComponent } from './main/main-row-two/main-row-two.component';
import { MainQuestionsComponent } from './main/main-questions/main-questions.component';
import { MainRowThreeComponent } from './main/main-row-three/main-row-three.component';
import { TitlePipe } from './pipes/title.pipe';
import { RouterScrollService } from '../services/router-scroll.service';

export const ROUTER_SCROLL_SERVICE = new InjectionToken<string>(
  'ROUTER_SCROLL_SERVICE'
);

@NgModule({
  declarations: [
    OverviewControlPipe,
    MainFooterComponent,
    MainHeaderComponent,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
    TitlePipe,
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
    TitlePipe,
  ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: ROUTER_SCROLL_SERVICE,
          useClass: RouterScrollService,
        },
      ],
    };
  }
}
