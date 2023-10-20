import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestHttpClient {
  constructor(private http: HttpClient) {}

  /**
   * @param Object obj {url, params, headers}
   * url : String,
   * params {k1:v1, k2:v2....}
   * headers {k1:v1, k2:v2....}
   * @return Callback Function
   */
  public get(obj: any): Promise<any> {
    const apiUrl = obj.url;
    const body: any = {};
    body.observe = 'response';

    if (!Object.entries) {
      Object.entries = ( entryObj: any ) => {
        const ownProps = Object.keys( entryObj );
        let i = ownProps.length;
        const resArray = new Array(i); // preallocate the Array
        while (i--) {
          resArray[i] = [ownProps[i], entryObj[ownProps[i]]];
        }
        return resArray;
      };
    }

    if (typeof obj.params !== 'undefined') {
      let Params = new HttpParams();
      Object.entries(obj.params).forEach(
        ([key, value]) => Params = Params.append(key, String(value))
      );

      body.params = Params;
    }

    if (typeof obj.headers !== 'undefined') {
      body.headers = this.createHeders(obj.headers);
    }

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl, body)
      .pipe (
        // catchError(this.handleError)
        catchError(err => {return of(err);})
        // catchError(err => {return of(this.handleError(err));})
      )
      .subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e), //  this.logError(e),
        complete: () => console.info('complete') 
      })
    })
  }

  /**
   * @param Object obj {url, params}
   * @return Callback Function
   */
  public post(obj: any): Promise<any> {
    const apiUrl = obj.url;
    const params = obj.params;

    const body: any = {};
    body.observe = 'response';

    if (typeof obj.headers !== 'undefined') {
      body.headers = this.createHeders(obj.headers);
    }

    return new Promise((resolve) => {
      this.http.post(apiUrl, params,  body)
      .subscribe({
        next: (v) => resolve(v),
        error: (e) => this.logError(e),
        complete: () => console.info('complete') 
      })
    })
  }

  /**
   * @param Object obj {url, params}
   * @return Callback Function
   */

  public delete(obj: any): Promise<any> {
    const apiUrl = obj.url;
    const body: any = {};
    body.observe = 'response';

    if (typeof obj.headers !== 'undefined') {
      body.headers = this.createHeders(obj.headers);
    }

    return new Promise((resolve) => {
      this.http.delete(apiUrl, body)
      .subscribe({
        next: (v) => resolve(v),
        error: (e) => this.logError(e),
        complete: () => console.info('complete') 
      })
    })
  }

  /**
   * @param Object obj {url, params}
   * @return Callback Function
   */
  public update(obj: any): Promise<any> {
    const apiUrl = obj.url;
    const params = obj.params;
    const body: any = {};
    body.observe = 'response';

    if (typeof obj.headers !== 'undefined') {
      body.headers = this.createHeders(obj.headers);
    }

    return new Promise((resolve) => {
      this.http.post(apiUrl, params,  body)
      .subscribe({
        next: (v) => resolve(v),
        error: (e) => this.logError(e),
        complete: () => console.info('complete') 
      })
    })
  }

  /**
   * @param Object obj {url, params}
   * @return Callback Function
   */
  public put(obj: any): Promise<any> {
    const apiUrl = obj.url;
    const params = obj.params;
    const body: any = {};
    body.observe = 'response';

    if (typeof obj.headers !== 'undefined') {
      body.headers = this.createHeders(obj.headers);
    }

    return new Promise((resolve) => {
      this.http.put(apiUrl, params,  body)
      .subscribe({
        next: (v) => resolve(v),
        error: (e) => this.logError(e),
        complete: () => console.info('complete') 
      })
    });
  }

  /**
   * @param Object headers : headers {k1:v1, k2:v2....}
   */
  private createHeders(headers: HttpHeaders): HttpHeaders {
    let header = new HttpHeaders (); // { 'Content-Type': 'application/json' }

    if (!Object.entries) {
      Object.entries = ( entryObj: any ) => {
        const ownProps = Object.keys( entryObj );
        let i = ownProps.length;
        const resArray = new Array(i); // preallocate the Array
        while (i--) {
          resArray[i] = [ownProps[i], entryObj[ownProps[i]]];
        }
        return resArray;
      };
    }

    Object.entries(headers).forEach (
      ([key, value]) => header = header.append(key, String(value))
    );

    return header;
  }

  private extractData(res: any): any {
    try {
      if ( typeof res.constructor !== 'undefined' && res.constructor.name === 'HttpResponse') {
        return res.body;
      } else {
        const body = res.json();
        return body || {};
      }
    } catch (e) {
      return res._body;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return error;
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private logError(err: string): void {
    console.error('There was an error: ');
    console.error(err);
  }

  /**
   * Not yet tested
   * @param Object obj {url, params, headers}
   * url : String,
   * params {k1:v1, k2:v2....}
   * headers {k1:v1, k2:v2....}
   * @return Callback Function
   * @param String filetype application/ms-excel  image/jpeg, image/png, and image/svg+xml.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
   */
  public filedownload(obj: any, filetype?: string): Promise<any> {
    const apiUrl = obj.url;
    const body: any = {};
    body.observe = 'response';
    body.responseType = 'arraybuffer'; // add responseType

    if (!Object.entries) {
      Object.entries = ( entryObj: any ) => {
        const ownProps = Object.keys( entryObj );
        let i = ownProps.length;
        const resArray = new Array(i); // preallocate the Array
        while (i--) {
          resArray[i] = [ownProps[i], entryObj[ownProps[i]]];
        }

        return resArray;
      };
    }

    if (typeof obj.params !== 'undefined') {
      let Params = new HttpParams();
      Object.entries(obj.params).forEach(
        ([key, value]) => Params = Params.append(key, String(value))
      );

      body.params = Params;
    }

    if (typeof obj.headers !== 'undefined') {
      body.headers = this.createHeders(obj.headers);
    }

    if (typeof obj.headers !== 'undefined') {
      this.createHeders(obj.headers);
    }

    return new Promise((resolve) => {
      this.http.get(apiUrl, body)
      .pipe (
        // catchError(this.handleError)
        catchError(err => {return of(err);})
        // catchError(err => {return of(this.handleError(err));})
      )
      .subscribe({
        next: (v: any) => resolve(v.body),
        error: (e) => this.logError(e),
        complete: () => console.info('complete') 
      })
    })
  }
  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  private downLoadFile(data: any, type: string): void {
    const blob = new Blob([data], { type});

    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      console.log( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
