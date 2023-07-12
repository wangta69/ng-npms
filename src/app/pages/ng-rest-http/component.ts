import { Component, OnInit } from '@angular/core';
import { RestHttpClient } from 'ng-rest-http'
@Component({
  selector: 'app-root',
  templateUrl:'./component.html'
})
export class NgRestHttpComponent implements OnInit{
  // public today = new Date();
  // private http

  private api_url = 'http://sample.domain.com/api/what';
  private params = {arg1: 'arg'};
  private headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    };

  constructor(
    protected http:RestHttpClient
  ) { }

  ngOnInit(){
    console.log('ngOninit start');
    this.http.get({url: 'https://www.onstory.fun/api/v1/test', params: this.params, headers: this.headers}).then((res) => {

      console.log('res>>', res);
    });
  }

  private get_sample(){
    this.http.get({url: this.api_url, params: this.params, headers: this.headers}).then((res) => {
      console.log(res);
      // HttpResponse {body, headers: {...}, ok, status, statusText, type, url}
    });
  }

  private post_sample(){
    this.http.post({url: this.api_url, params: this.params, headers: this.headers}).then((res) => {
      console.log(res);
      // HttpResponse {body, headers: {...}, ok, status, statusText, type, url}
    });
  }

  private filedownload_sample(){
    this.http.filedownload({url: this.api_url, params: this.params, headers: this.headers}).then((blob) => {
      console.log(blob);
      // this.file.writeFile(this.localDirectory, link.icon, blob, {replace: true})
    });
  }
}



