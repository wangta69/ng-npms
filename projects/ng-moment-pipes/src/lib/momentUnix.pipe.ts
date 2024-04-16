import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({name: 'momentUnix'})
export class MomentUnixPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const [format] = args;
    return moment.unix(value).format(format);
  }
}
