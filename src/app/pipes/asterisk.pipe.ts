import { Pipe, PipeTransform, NgModule } from '@angular/core';
declare var graphGame: any;
@Pipe({
  name: 'asterisk'
})
export class AsteriskPipe implements PipeTransform {
  transform(value: string): string {
    if (graphGame.serviceInfo.asterisk) {
        return value.substr(0, 1) + Array(value.length).join('*');
    } else {
        return value;
    }
  }
}

@NgModule({
    declarations: [ AsteriskPipe ],
    exports: [ AsteriskPipe ]
})
export class AsteriskPipeModule { }
