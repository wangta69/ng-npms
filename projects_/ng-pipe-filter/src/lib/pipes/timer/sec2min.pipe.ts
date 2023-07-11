import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({name: 'sec2min'})
export class Sec2MinPipe implements PipeTransform {
    constructor() {}
    public transform(sec: number): string {
        if (sec <= 0) {
            return '00:00';
        } else {
            const minutes = Math.floor(sec / 60);
            const second = sec % 60;
            const seconds = Math.ceil(second);
            let str = '';
            // if (minutes) {
            const tmpMin = '0' + minutes.toString();
            str = tmpMin.slice(-2) + ':';
            // }
            const tmpSecond = '0' + seconds.toString();
            return str + tmpSecond.slice(-2);
        }

    }
}

@NgModule({
    declarations: [ Sec2MinPipe ],
    exports: [ Sec2MinPipe ],
})
export class Sec2MinPipeModule { }
