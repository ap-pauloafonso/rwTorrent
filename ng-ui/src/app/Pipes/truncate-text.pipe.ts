import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit, completeWords = false, ellipsis = '...'): string {

    if (!value) { return }
    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)} ${ellipsis} `;
  }

}
