import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
@Pipe({name: 'remaindatetime'})
export class RemainDateTimePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}
    transform(datetime: Date): string {
        const countDownDate = new Date(moment.utc(datetime).toDate()).getTime();
        const now = new Date().getTime();

          // Find the distance between now and the count down date
        const distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id='demo'
        let rtn = '';
        if (distance <= 0) {
            const myval: any = this.resultTranslate();
            return myval.__zone_symbol__value;
        } else {
            if (days) {
                rtn = days + ' Day';
            }

            rtn = rtn + ' ' + hours + ':' + ('0' + minutes.toString()).slice(-2) + ':' + ('0' + seconds.toString()).slice(-2);

            return rtn;
        }
    }

    // async resultTranslate(): Promise<any> {
    async resultTranslate() {
        let rtn: string;
        this.translate.get('otc.listDetail.timeout')
        .subscribe(value => {
            rtn = value;
        });
        return rtn;
    }
}

@NgModule({
    declarations: [ RemainDateTimePipe ],
    exports: [ RemainDateTimePipe ],
    imports: [ TranslateModule.forChild() ],

})
export class RemainDateTimeModule { }
