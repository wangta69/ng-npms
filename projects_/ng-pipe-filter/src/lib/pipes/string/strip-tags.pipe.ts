import {Pipe, PipeTransform} from '@angular/core';
import {is_string} from '../../functions/is-string.func';
import {is_undefined} from '../../functions/is-undefined.func';

@Pipe({
  name: 'strip_tags'
})
export class StripTagsPipe implements PipeTransform {
    public transform(input: string): any {
        if (!is_string(input) || is_undefined(input)) {
            return input;
        }
        return input.replace(/<\S[^><]*>/g, '');
    }
}
