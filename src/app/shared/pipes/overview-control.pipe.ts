import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'overviewControl',
    standalone: false
})
export class OverviewControlPipe implements PipeTransform {
  transform(value: string | null | undefined, len: number): string {
    if (!value) return '';
    return value.length < len ? value : value.substring(0, len) + '...';
  }
}
