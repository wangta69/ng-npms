import { Pipe, PipeTransform  } from '@angular/core';
import {is_object} from '../../functions/is-object.func';

/**
 * @param Object input {key1:arg1, key2:arg2, key3:arg3....}
 * @param Array output [{k:key1, v:arg1}, {k:key2, v:arg2}, {k:key3, v:arg3}]
 * Usage: <span  *ngFor='let friendType of friendTypes | objtoarray'>{{friendType.k}} / {{ friendType.v }}</span>
 */
@Pipe({ name: 'to_key_val' })
export class ToKeyValPipe implements PipeTransform {

    public transform(input: any): any {
        if (!is_object(input)) {
            return input;
        }

        let myobj: any;
        const arr = Object.keys(input).map((key) => {
            if (typeof input[key] === 'object') {
                myobj = {k: '', v: {}};
                myobj.k = key;
                myobj.v = input[key];
            } else {
                myobj.k = key;
                myobj.v = input[key];
            }
            return myobj;
        });

        return	arr;
    }
}
