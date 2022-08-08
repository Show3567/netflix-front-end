import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: string) {
    const title_arr = value.split(' ');
    return title_arr.length > 2 ? title_arr.splice(0, 2).join(' ') : value;
  }
}
