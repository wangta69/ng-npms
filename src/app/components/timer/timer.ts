import { NgModule, Component, Input, OnInit, OnDestroy} from '@angular/core';
import { timer } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.html',
    styleUrls: ['./timer.scss']
})

export class TimerComponent implements OnDestroy, OnInit {
    @Input() datetime: any;
    public countDown: string;
    private timerSubscription: any;
    constructor(
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.downCount();

    }

    ngOnDestroy() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    private downCount() {


        this.timerSubscription = timer(0, 1000)
        .subscribe(() => {
            if (this.datetime) {
                this.countDown = this.calTimer();
            }
        });
    }

    private calTimer() {
        const countDownDate = new Date(moment.utc(this.datetime).toDate()).getTime();
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
            this.timerSubscription.unsubscribe();
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
    declarations: [ TimerComponent ], // , ScrollToBottomDirective
    imports: [
        TranslateModule.forChild()
    ],
    exports: [ TimerComponent ]
})
export class TimerModule {}
