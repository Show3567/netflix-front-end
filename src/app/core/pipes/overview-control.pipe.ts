import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overviewControl',
})
export class OverviewControlPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return value.length < 120 ? value : value.substring(0, 120) + '...';
  }
}
