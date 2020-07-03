import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class EventService {

    private sound = new Subject<any>();
    private logStatus = new Subject<any>();
    private point = new Subject<number>();
    private userPoint: number;
    private subject = new Subject<any>();
    private ticktock = new Subject<any>();

    public ngUnsubscribes = {baccarat: new Subject()};
    // public ngUnsubscribes = {baccarat: Subscription };
    // for dice start
    private gameResult = new Subject<any>();
    private gameStatus = new Subject<string>();
    // for dice end

    /**
     * @param Object obj {key, value}
     * key : gameStatus, value : start:플레이진행, ing:플레이진행중, end:플레이끝, ready:대기중 : 현재 진행 status bar show;
     */
    sendMessage(obj: any) {
        this.subject.next(obj);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    constructor() {}

    /*
    * How todo
    * 1. Add EventService to AppModule
    * import { EventService } from './services/event.service';
    * @NgModule({
    *  providers: [ EventService],
    * })
    *
    * 2. Add EventService to a Component where you are going to use
    * import { EventService } from './services/event.service';
    * constructor(protected eventSvc: EventService) {}
    *
    * 3. Send Message
    * message send : this.eventSvc.sendMessage({state: 'PROGRESS'});
    *
    * 4. Receive Message
    * message receive : this.eventSvc.getMessage().subscribe(message => { console.log(message) });
    */
}
