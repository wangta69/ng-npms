import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
    constructor() {
    }

    guid () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
    * create random string as given length
    */
    randomString(len: number) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < len; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    range(input: number[], min: number, max: number): any {// @Pipe({name: 'range'}) 와 동일 (range.pipe.ts)
        for (let i = min; i <= max; i++) {
            input.push(i);
        }
        return	input;
    }// init:function(){

    isInt(nVal: number) {
        return typeof nVal === 'number'
                && isFinite(nVal)
                && nVal > -9007199254740992
                && nVal < 9007199254740992
                && Math.floor(nVal) === nVal;
    }

    in_array(needle: string | number, haystack: any[]) {
        for (const i in haystack) {
            if (haystack[i] === needle) { return true; }
        }
        return false;
    }

    copy_array(arr: any[]) {
        return arr.slice();
    }


    // var str = "How are you doing today?";
    // var res = str.split(" ");
    // var fruits = ["Banana", "Orange", "Apple", "Mango"];
    // var energy = fruits.join();
    /**
    * remove item from array by value
    */
    remove_item(value, haystack) {
        return haystack.filter(v => v !== value);
    }

    array_search(needle, haystack) {
        for (const i in haystack) {
            if (haystack[i] === needle) { return i; }
        }
        return false;
    }

    arrayPushUnique(needle, haystack, size? ) {
        if (this.in_array(needle, haystack)) {
            return haystack;
        }
        haystack.push(needle);

        if (typeof size === 'number' && haystack.length > size) {
            haystack.shift();
        }
        return haystack;
    }

    shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }

    hasOwnProp(obj, propName) {
    //    return obj.hasOwnProperty(propName);
        return Object.prototype.hasOwnProperty.call(obj, propName);
   }

    getOwnProperty(obj, propName) {
    //    return obj.hasOwnProperty(propName) ? obj[propName] : undefined;
        return Object.prototype.hasOwnProperty.call(obj, propName) ? obj[propName] : undefined;
   }


    add_comma(input: string) {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    rm_comma(input: string) {
        return input.toString().replace(/,/g , '');
    }

}
