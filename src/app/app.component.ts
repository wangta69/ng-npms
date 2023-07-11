import { Component, OnInit } from '@angular/core';
// import { SocketMultiService } from 'ng-node-socket';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public momentTestData = new Date();
  // 
  constructor (
      // private socket: SocketMultiService,
     // private commonSvc: CommonService,
        //        private http: RestHttpClient,
        //        private storage: LocalStorageService,
        //        private socket: SocketMultiService,
        //        private easeSvc: NgEasingService
  ) {

  }

  ngOnInit() {
    // this.testCommonService();
    // this.testRestHttpClient();
    // this.testLocalStorages();
    // this.testPipeFilter();
    //  this.testSocketService();
    // this.testEaseService();

    // const valid = WAValidator.validate('mwt4yQ89ApycbgaP5dFRcEtRbfzHKCg125', 'btc', 'testnet');
    // console.log('valid');
    // console.log(valid);
  }
/*
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
*/
  // testSocketService() {
  //     console.log(' [ testSocketService ] ============= ');
  //     this.socket.init('otcChat', '//socket.domain.com:5083', {
  //       withCredentials: true,
  //     });

  //     // this.socket.init('otcChat', 'http://xxx.xxxx.xxxx', {
  //     //   withCredentials: false,
  //     // });

  //     this.socket.On('otcChat', 'connection').subscribe((obj: any) => {
  //       console.log('connection');
  //       console.log(obj);
  //     });
  // }
/*
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

  }
  */// testEaseService() {
}
