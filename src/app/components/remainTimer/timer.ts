import { NgModule, Component, EventEmitter, Output, Input, OnInit, OnDestroy} from '@angular/core';
import { timer } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
    selector: 'app-remaintimer',
    templateUrl: './timer.html',
    styleUrls: ['./timer.scss']
})

export class RemainTimerComponent implements OnDestroy, OnInit {
    @Input() status: string; // R | S
    @Output() statusChange = new EventEmitter<string>();
    @Input() contract_signed_type: string; // M
    @Input() created_at: string; // M
    @Input() started_at: string;
    @Input() contract_manual_time: number;
    @Input() deposit_wait_time: number;
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
            // if (this.status) {
                this.countDown = this.calTimer();
            // }
        });

    }

    private calTimer() {
        let diff: number;
        if (this.status === 'R' && this.contract_signed_type === 'M') {
            diff = Math.ceil(moment.utc(this.created_at).diff(moment.utc(new Date())) / 1000) + this.contract_manual_time * 60;
            if (diff <= 0) {
                this.statusChange.emit('RTO');
            }

        } else if (this.status === 'S') {
            diff = Math.ceil(moment.utc(this.started_at).diff(moment.utc(new Date())) / 1000) + this.deposit_wait_time * 60;
            if (diff <= 0) {
                this.statusChange.emit('WTO');
            }
        }

        if (diff) {
            if (diff <= 0) {
                return '00:00';
            } else {
                const minutes = Math.floor(diff / 60);
                const second = diff % 60;
                const seconds = Math.ceil(second);
                let str = '';
                // if (minutes) {
                const tmpMin = '0' + minutes.toString();
                str = tmpMin.slice(-2) + ':';
                // }
                const tmpSecond = '0' + seconds.toString();
                return str + tmpSecond.slice(-2);
            }
        } else {
            return '00:00';
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
    declarations: [ RemainTimerComponent ], // , ScrollToBottomDirective
    imports: [
        TranslateModule.forChild()
    ],
    exports: [ RemainTimerComponent ]
})
export class RemainTimerModule {}
