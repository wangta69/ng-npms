import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../projects/ng-functions/src/public_api';
import { RestHttpClient } from '../../projects/ng-rest-http/src/public_api';
import { LocalStorageService } from '../../projects/ng-storages/src/public_api';
// import { only_number, is_undefined } from 'ng-pipe-filter';
import { only_number, is_undefined } from '../../projects/ng-pipe-filter/src/public_api';
import { SocketMultiService } from '../../projects/ng-node-socket/src/public_api';
import { NgEasingService } from '../../projects/ng-easing/src/public_api';
import WAValidator from 'wallet-address-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  comma_test_vale = 300000;
  moment_test_data = new Date();
  constructor(
                private commonSvc: CommonService,
                private http: RestHttpClient,
                private storage: LocalStorageService,
                private socket: SocketMultiService,
                private easeSvc: NgEasingService
            ) {
  }

  ngOnInit() {
      this.testCommonService();
      this.testRestHttpClient();
      this.testLocalStorages();
      this.testPipeFilter();
      this.testSocketService();
      this.testEaseService();

      const valid = WAValidator.validate('mwt4yQ89ApycbgaP5dFRcEtRbfzHKCg125', 'btc', 'testnet');
      console.log('valid');
      console.log(valid);
  }

  testCommonService() {
      console.log(' [ testCommonService ] ============= ');
      const prefix_unique = this.commonSvc.guid();
      console.log(prefix_unique);
  }

  testRestHttpClient() {
      console.log(' [ testRestHttpClient ] ============= ');
      const api_url = 'http://api.chanceball.com/api/v1/bbs?bo_table=photo';
      const params = {};
      const headers = {};
      this.http.get ({'url': api_url, 'params': params, 'headers': headers}).then((res) => {
          console.log(res.body);
          console.log(res.headers);
      });
  }

  testLocalStorages() {
      console.log(' [ testLocalStorages ] ============= ');
      const value = 'successful';
      this.storage.set({key: value}).then((res) => {
          console.log(res);
      });

      this.storage.get('key').then((res) => {
          console.log(res);
      });
  }

  testPipeFilter() {
      console.log(' [ testPipeFilter ] ============= ');
      const input = '12AB345';
      if (is_undefined(input)) {
        console.log('undefined');
      }

      if (only_number(input)) {
        console.log('only number');
    } else {
        console.log('this is not only number');
    }
  }

  testSocketService() {
      console.log(' [ testSocketService ] ============= ');
      this.socket.init('test', 'http://io.chanceball.com');

       this.socket.On('test', 'connection').subscribe(obj => {
           console.log('connection');
          console.log(obj);
      });
  }

  testEaseService() {
      console.log(' [ testEaseService ] ============= ');

      this.easeSvc.anmaionStart({'duration': 1000, 'from': 0, 'to': 500, 'ease': 'easeInQuart', 'delay': 0}, (v) => {
            // console.log(v);
        },
        function(v) {
            console.log('done');
        });

      this.easeSvc.anmaionStart({'duration': 1000, 'from': 0, 'to': 500, 'ease': 'easeInQuart'}, (v) => {
            //  console.log(v);
        });

  } // testEaseService() {
}
