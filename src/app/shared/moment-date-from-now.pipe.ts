import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDateFromNow',
  standalone: true
})
export class MomentDateFromNowPipe implements PipeTransform {

  transform(date: Date): unknown {
    return moment(date).fromNow();
  }

}
