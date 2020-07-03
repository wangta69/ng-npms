import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SocketMultiService } from 'ng-node-socket';
import {CHAT_SERVER} from '../constants/urls';

@Injectable({
    providedIn:  'root'
})
export class SocketService {
    private ngUnsubscribe = new Subject();
    constructor(
        private socket: SocketMultiService,
    ) {
    }

    initialize() {
        this.socket.init(CHAT_SERVER.socketName, CHAT_SERVER.socketUrl);
        return new Promise(resolve => {
            this.socket.On(CHAT_SERVER.socketName, 'connection')
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                resolve(true);
            });
        });
    }
    /**
     * 소켙에 보인의 로그인 정보를 남긴다.
     * @param Object params : { id, name }
     */
    public socketLogin(params: any): Promise<any> {
        return new Promise(resolve => {
            this.socket.Emit(CHAT_SERVER.socketName, 'login', params, (err: string) => {
                resolve(err);
            });
        });

    }

    /**
     * 현재 채팅방에서의 채팅 내용들을 가져옮
     * @param Object params { otc, maker(id), taker(id) }
     */
    public enterRoom(params: any): Promise<any> {
        return new Promise(resolve => {
            this.socket.Emit(CHAT_SERVER.socketName, 'enterRoom', params, (err: string, res: any) => {
                resolve({error: err, chats: res.chats});
            });
        });
    }

    /**
     * 채팅 입력
     * @param Object params {otc: this.otcId,maker: this.makerId,taker: this.takerId,message: this.message}
     */
    public sendChat(params: any): Promise<any> {
        return new Promise(resolve => {
            this.socket.Emit(CHAT_SERVER.socketName, 'enterChat', params, (err: string, res: any) => {
                if (err) {
                    resolve({error: err});
                }
                resolve({error: false, res});
            });
        });
    }

}
