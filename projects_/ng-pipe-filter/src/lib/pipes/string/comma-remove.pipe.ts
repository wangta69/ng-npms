import {Pipe, PipeTransform} from '@angular/core';
import {is_undefined} from '../../functions/is-undefined.func';

@Pipe({
  name: 'comma_remove'
})
export class CommaRemovePipe implements PipeTransform {

  public transform(input: string): any {

    if (is_undefined(input)) {
        return input;
    }
    return input.toString().replace(/,/g , '');
  }
}
