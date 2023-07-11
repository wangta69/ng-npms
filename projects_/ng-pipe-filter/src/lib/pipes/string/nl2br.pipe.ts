import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'nl2br'})
export class Nl2brPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    public transform(str: string): any {
        if (typeof(str) === 'undefined') { return; }
        const replaced = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
        return this.sanitizer.bypassSecurityTrustHtml(replaced);
    }
}
