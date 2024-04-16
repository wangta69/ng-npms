import {Pipe, PipeTransform} from '@angular/core';
import moment, {Moment} from 'moment';

@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
    
  public transform(date: Date | Moment, ...args: any[]): any {
    const [format] = args;
    return moment(date).format(format);
  }
}
