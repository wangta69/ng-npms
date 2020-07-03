import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('state', [
        // 들어오고 나갈대만 현재것을 인식하고 나머지는 css를 인식
      transition(':enter', [
       style({ top: '-100px', transform: 'translateX(-50%) scale(0.3)' }),
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
          transform: 'translateX(-50%) scale(1)',
          opacity: 1,
          top: '20px'
        })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
          transform: 'translateX(-50%) scale(0.1)',
          opacity: 0,
          top: '-100px'
        }))
      ])
    ])
  ]
})

export class SnackbarComponent implements OnInit, OnDestroy {
    show: boolean;
    public message: string;
    public type: string; // success || danger
    private snackbarSubscription: Subscription;

    constructor(
        private snackbarSvc: SnackbarService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.snackbarSubscription = this.snackbarSvc.snackbarState
        .subscribe(
            (state) => {

                let translateMsg = 'message.' + state.message;
                if ( state.message.indexOf('chatmessage.') !== -1) {
                    translateMsg = state.message;
                }

                this.translate.get(translateMsg)
                .subscribe(value => {
                    this.type = state.type;
                    // this.message = state.message;
                    this.message = value;
                    this.show = state.show;
                    setTimeout(() => {
                        this.show = false;
                    }, state.timeout);

                });


        });
    }

    ngOnDestroy() {
        this.snackbarSubscription.unsubscribe();
    }
}
