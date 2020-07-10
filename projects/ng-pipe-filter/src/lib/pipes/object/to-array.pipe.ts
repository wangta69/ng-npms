import { Pipe, PipeTransform  } from '@angular/core';
import {is_object} from '../../functions/is-object.func';

/**
 * @param Object input {arg1, arg2, arg3....}
 * @param Array output [arg1, arg2, arg3]
 */
@Pipe({ name: 'to_array' })
export class ToArrayPipe implements PipeTransform {
    public transform(input: any): any {
        if (!is_object(input)) {
            return input;
        }
        return Object.keys(input).map((value) => input[value]);
    }
}
