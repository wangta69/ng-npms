import {Pipe, PipeTransform} from '@angular/core';
import * as  _moment from 'moment';
const moment = _moment;

@Pipe({name: 'momentUnix'})
export class MomentUnixPipe implements PipeTransform {
    transform(value: number, ...args: any[]): any {
        const [format] = args;
        return moment.unix(value).format(format);
    }
}
