import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({name: 'momentLocal'})
export class MomentLocalPipe implements PipeTransform {
  public transform(value: string, ...args: any[]): any {
    const [format] = args;
    const localTime  = moment.utc(value).toDate();
    return moment(localTime).format(format);
  }
}
