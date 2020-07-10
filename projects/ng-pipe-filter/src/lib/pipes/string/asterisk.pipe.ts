import { Pipe, PipeTransform, NgModule } from '@angular/core';
@Pipe({
  name: 'asterisk'
})
export class AsteriskPipe implements PipeTransform {
  public transform(value: string, len: number): string {
    return value.substr(0, len) + Array(value.length).join('*');
  }
}

@NgModule({
    declarations: [ AsteriskPipe ],
    exports: [ AsteriskPipe ]
})
export class AsteriskPipeModule { }
