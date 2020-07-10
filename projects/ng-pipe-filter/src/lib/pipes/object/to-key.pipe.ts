import { Pipe, PipeTransform  } from '@angular/core';
import {is_object} from '../../functions/is-object.func';

/**
 * @param Object input {key1:arg1, key2:arg2, key3:arg3....}
 * @param Array output [{key1:arg1}, {key2:arg2}, {key3:arg3}]
 * Usage: <span *ngFor="let k of obj | to_key">{{k}}: {{obj[k]}}</span>
 */
@Pipe({ name: 'to_key' })
export class ToKeyPipe implements PipeTransform {
    public transform(input): any {
        if (!is_object(input)) {
            return input;
        }
        const keys = [];
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }
}
