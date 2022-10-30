import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OverviewControlPipe } from './pipes/overview-control.pipe';
import { TitlePipe } from './pipes/title.pipe';

// export const ROUTER_SCROLL_SERVICE = new InjectionToken<string>(
//   'ROUTER_SCROLL_SERVICE'
// );

@NgModule({
  declarations: [OverviewControlPipe, TitlePipe],
  imports: [CommonModule, SharedModule],
  exports: [OverviewControlPipe, TitlePipe],
})
export class CoreModule {
  // public static forRoot(): ModuleWithProviders<CoreModule> {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [
  //       {
  //         provide: ROUTER_SCROLL_SERVICE,
  //         useClass: RouterScrollService,
  //       },
  //     ],
  //   };
  // }
}
