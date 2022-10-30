import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// export const ROUTER_SCROLL_SERVICE = new InjectionToken<string>(
//   'ROUTER_SCROLL_SERVICE'
// );

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule],
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
