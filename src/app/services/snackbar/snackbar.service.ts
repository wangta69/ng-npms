import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    private snackbarSubject = new Subject<any>();
    public snackbarState = this.snackbarSubject.asObservable();

    constructor() { }

    show(messages: any, options?: any) {
        let message: string;
        if (typeof messages === 'string') {
            message = messages;
        } else {
            const key = Object.keys(messages)[0];
            message = messages[key];
        }
        const snackOptions = typeof options !== 'undefined' ? options : {};
        const show = typeof snackOptions.show !== 'undefined' ? snackOptions.show : true;
        const type = typeof snackOptions.type !== 'undefined' ? snackOptions.type : 'danger'; // success
        const timeout = typeof snackOptions.timeout !== 'undefined' ? snackOptions.timeout : 2000;

        this.snackbarSubject.next({
            message,
            show,
            type,
            timeout
        });
    }
}
