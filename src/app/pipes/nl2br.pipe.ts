import { Pipe, PipeTransform, NgModule, SecurityContext  } from '@angular/core';
import { DomSanitizer, SafeHtml  } from '@angular/platform-browser';

@Pipe({name: 'nl2br'})
export class Nl2brPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(str: string): SafeHtml  {
        if (typeof (str) === 'undefined') { return; }
        const replaced = str.replace(/(?: \r\n|\r|\n)/g, '<br />');
        return replaced;
       // return this.sanitizer.bypassSecurityTrustHtml(replaced);
        // return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(replaced));
    }
}

@NgModule({
    declarations: [ Nl2brPipe ],
    exports: [ Nl2brPipe ],
})
export class Nl2brPipeModule { }
