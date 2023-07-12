import {Pipe, PipeTransform} from '@angular/core';
// import * as moment from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
    
    public transform(value: Date | moment.Moment, ...args: any[]): any {
        console.log('value:', value, '...args', ...args);
        console.log('moment', moment);

        const [format] = args;
        return moment(value).format(format);
    }
}
