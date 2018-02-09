import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'date'
})

export class DatePipe implements PipeTransform {
  public transform(date: Date): string {
    if (date === null) return '';
    return moment(date).format('DD.MM.YYYY');
  }
}
