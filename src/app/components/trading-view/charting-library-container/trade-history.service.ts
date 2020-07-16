import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // , HttpParams, HttpHeaders
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // map,

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
@Injectable()
export class TradeHistoryService {
    private baseUrl = 'https://min-api.cryptocompare.com';
    constructor(private http: HttpClient) {}

    private handleError(error: Response): any {
        console.error(error);
        return throwError(error);
    }

    /**
     * @param Object symbolInfo { base_name: ['Coinbase:BTC/USD'], name: 'Coinbase:BTC/USD', ticker: 'Coinbase:BTC/USD'}
     * @param String resolution ie) 1
     * @param Number from ie) 1594792270
     * @param Number to ie) 1594880530
     * @param Boolean first ie) true
     * @param Number limit ie) 2000
     */
    public getBars(symbolInfo: any, resolution: string, from: number, to: number, first: boolean, limit: number): Promise<any> {
        const splitSymbol = symbolInfo.name.split(/[:/]/);
        const url = resolution === 'D' ? '/data/histoday' : parseInt(resolution, 10) >= 60 ? '/data/histohour' : '/data/histominute';
        const qs = {
            e: splitSymbol[0], // Coinbase
            fsym: splitSymbol[1], // BTC
            tsym: splitSymbol[2], // USD
            toTs:  to ? to : '',
            limit: limit ? limit : 2000
        };

        const body: any = {};
        body.params = qs;

        return new Promise((resolve) => {
            this.http.get(`${this.baseUrl}${url}`, body)
            .pipe (
              catchError(this.handleError)
            )
            .subscribe(
                (data) => resolve(data),
                // data => resolve(this.extractData(data)),
                (err) => this.handleError(err)
            );
        });
        /*
        return this.http.get(`${this.baseUrl}${url}`, params)
          .map(res => {
            return res.json();
          })
          .catch(this.handleError)

          */

  }

}
