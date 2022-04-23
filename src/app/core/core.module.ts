import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewControlPipe } from './pipes/overview-control.pipe';

@NgModule({
  declarations: [OverviewControlPipe],
  imports: [CommonModule],
  exports: [OverviewControlPipe],
})
export class CoreModule {}
