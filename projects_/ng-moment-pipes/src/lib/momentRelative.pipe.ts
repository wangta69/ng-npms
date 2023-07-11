import {Pipe, PipeTransform} from '@angular/core';
import * as  _moment from 'moment';
const moment = _moment;
// import * as moment from 'moment';
/**
 * Format Dates
 * moment("20111031", "YYYYMMDD").fromNow();  // 12 minutes ago
 */
@Pipe({name: 'momentRelative'})
export class MomentRelativePipe implements PipeTransform {
    transform(value: Date | _moment.Moment, ...args: any[]): any {
        const [format] = args;
        return moment(value, format).fromNow();
    }
}

/**
 * Format Dates
 * moment().startOf('hour').fromNow();       // 12 minutes ago
 * @param String of : startOf, endOf
 * @param String val : day, hour
 */
@Pipe({name: 'momentRelativeOf'})
export class MomentRelativeOfPipe implements PipeTransform {
    transform(of: string, val: any): any {
        switch (of) {
            case 'startOf': return moment().startOf(val).fromNow();
            case 'endOf': return moment().startOf(val).fromNow();
        }
        return null;
    }
}
