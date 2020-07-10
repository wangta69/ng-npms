import {Pipe, PipeTransform} from '@angular/core';
import {is_undefined} from '../../functions/is-undefined.func';

@Pipe({
  name: 'comma_add'
})
export class CommaAddPipe implements PipeTransform {

    public transform(input: string): any {
        if (is_undefined(input)) {
            return input;
        }
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
