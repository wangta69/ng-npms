import {Pipe, PipeTransform} from '@angular/core';
import * as  _moment from 'moment';
const moment = _moment;
// utc to local
@Pipe({name: 'momentLocal'})
export class MomentLocalPipe implements PipeTransform {
    public transform(value: string, ...args: any[]): any {
        const [format] = args;
        const localTime  = moment.utc(value).toDate();
        return moment(localTime).format(format);
        // return moment.unix(value).format(format);
    }
}
