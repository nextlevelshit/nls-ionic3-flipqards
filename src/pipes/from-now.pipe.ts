import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'fromNow'
})

export class FromNowPipe implements PipeTransform {
  public transform(date: Date): string {
    moment.locale('de-DE');

    if (date === null) return '';
    return moment(date).fromNow();
  }
}
