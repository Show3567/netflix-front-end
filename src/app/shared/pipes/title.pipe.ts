import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: string | undefined, num: number) {
    if (value) {
      const title_arr = value.split(' ');
      return title_arr.length > num
        ? title_arr.splice(0, num).join(' ')
        : value;
    }
    return null;
  }
}
