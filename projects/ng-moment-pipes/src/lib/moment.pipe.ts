import {Pipe, PipeTransform} from '@angular/core';
// import * as moment from 'moment';
import moment, {Moment} from 'moment';
// import moment from 'moment';
// const moment = _moment;
// import moment from 'moment/moment'; 

@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
    
  // public transform(value: Date | moment.Moment, ...args: any[]): any {
  public transform(date: Date | Moment, ...args: any[]): any {
    const [format] = args;

    console.log('transform', date, args, format, moment(date).format(format))
    return moment(date).format(format);
  }
}
