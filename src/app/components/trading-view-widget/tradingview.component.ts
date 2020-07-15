import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

declare const TradingView: any;

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.scss']
})

export class TradingviewComponent implements OnInit, OnChanges {
    @Input() symbol: string;
    constructor() { }

    ngOnInit() {
    }

    private loadTradingView() {
        const widget = new TradingView.widget (
            {
                width: '100%',
                height: 610,
                autosize: false,
                // symbol: 'BITHUMB:BTCKRW',
                symbol: this.symbol,
                timezone: 'Etc/UTC',
                theme: 'light',
                style: '1',  // candlechart: 1, linechart 2
                locale: 'en',
                toolbar_bg: '#f1f3f6',
                enable_publishing: false,
                withdateranges: true,
                interval: 'ytd',
                range: '5d',
                hide_side_toolbar: true,
                hide_top_toolbar: false,
                allow_symbol_change: true,
                show_popup_button: true,
                popup_width: '1000',
                popup_height: '650',
                no_referral_id: true,
                container_id: 'tradingview'
            }
        );
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                const changedProp = changes[propName];
                if (propName === 'symbol') {
                    this.symbol = changedProp.currentValue || 'NONE';
                    // if (this.symbol) {
                    this.loadTradingView();
                    // }
                }
            }
        }
    }

}
