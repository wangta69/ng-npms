import {Pipe, PipeTransform} from '@angular/core';
import {is_undefined} from '../../functions/is-undefined.func';
import {only_number} from '../../functions/only-number.func';
@Pipe({
  name: 'only_number'
})
export class OnlyNumberPipe implements PipeTransform {
    public transform(input: string): boolean {
        if (is_undefined(input)) {
            return false;
        }
        return only_number(input);
    }
}
