import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overviewControl',
})
export class OverviewControlPipe implements PipeTransform {
  transform(value: string, len: number): string {
    return value.length < len ? value : value.substring(0, len) + '...';
  }
}
