import { Pipe, PipeTransform, NgModule } from '@angular/core';

/**
 * 문자열 조인
 */
@Pipe({name: 'join'})
export class JoinPipe implements PipeTransform {
    transform(arr: [], split?: string): string {
        split = split ? split : '';
        if (typeof (arr) === 'undefined') { return; }
        return arr.join(split);
    }
}

@NgModule({
    declarations: [ JoinPipe ],
    exports: [ JoinPipe ],
})
export class JoinPipeModule { }
