import { Injectable } from '@angular/core';
import { RestHttpClient } from 'ng-rest-http';
import { httpUrl } from '../constants/urls';

@Injectable()
export class HttpService {
    private defaultUrl = '';

    constructor(
        protected http: RestHttpClient,
    ) {
        this.defaultUrl = httpUrl;
    }

    public post(obj: any): Promise<any> {
        obj.url = this.defaultUrl + obj.url;
        if (typeof obj.headers === 'undefined') {
            obj.headers = {};
        }
        // obj.headers.Authorization = 'Bearer '+this.userToken();
        obj.headers.Authorization = 'Bearer ' + this.userToken();
        return new Promise(resolve => {
            this.http.post(obj).then((res) => {
                resolve(res.body);
            });
        });
    }


    public postOtp(obj: any): Promise<any> {
        obj.url = this.defaultUrl + obj.url;
        if (typeof obj.headers === 'undefined') {
            obj.headers = {};
        }
        // obj.headers.Authorization = 'Bearer '+this.userToken();
        obj.headers.Authorization = 'Bearer ' + obj.params.userToken;
        return new Promise(resolve => {
            this.http.post(obj).then((res) => {
                resolve(res.body);
            });
        });
    }

    public get(obj: any): Promise<any> {
        obj.url = this.defaultUrl + obj.url;
        if (typeof obj.headers === 'undefined') {
            obj.headers = {};
        }
        // obj.headers = {'Access-Control-Allow-Origin': '*'};
        obj.headers.Authorization = 'Bearer ' + this.userToken();
        return new Promise(resolve => {
            this.http.get(obj).then((res) => {
                resolve(res.body);
            });
        });
    }

    public delete(obj: any): Promise<any> {
        obj.url = this.defaultUrl + obj.url;
        if (typeof obj.headers === 'undefined') {
            obj.headers = {};
        }
        // obj.headers.Authorization = 'Bearer '+this.userToken();
        obj.headers.Authorization = 'Bearer ' + this.userToken();
        return new Promise(resolve => {
            this.http.delete(obj).then((res) => {
                resolve(res.body);
            });
        });
    }

    public put(obj: any): Promise<any> {
        obj.url = this.defaultUrl + obj.url;
        if (typeof obj.headers === 'undefined') {
            obj.headers = {};
        }
        // obj.headers.Authorization = 'Bearer '+this.userToken();
        obj.headers.Authorization = 'Bearer ' + this.userToken();
        return new Promise(resolve => {
            this.http.put(obj).then((res) => {
                resolve(res.body);
            });
        });
    }

    private refreshToken(): Promise<any> {
        const params = {
            url: this.defaultUrl + 'refreshToken',
            headers: {Authorization: 'Bearer ' + this.userToken()}
        };
        return new Promise(resolve => {
            this.http.get(params).then((res) => {
                if (!res.body.error) {
                    localStorage.setItem('userToken', res.body.userToken);
                } else {
                    localStorage.setItem('userToken', null);
                }
                resolve(null);
            });
        });
    }

    public getDirect(obj: any): Promise<any> {
        obj.url = obj.url;
        if (typeof obj.headers === 'undefined' ) {
            obj.headers = {};
        }

        return new Promise(resolve => {
            this.http.get(obj).then((res) => {
                resolve(res);
            });
        });
    }

    private userToken() {
        return localStorage.getItem('userToken') || null;
    }

    // 아래는 현재 앱에서 사용하는 모든 http를 정의해 둔다.
    public updateAuthenticate(user: any): Promise<any> {
        return new Promise(resolve => {
            this.post({url: 'authenticate', params: user}).then((obj) => {
                resolve(obj);
            });
        });
    }

}
