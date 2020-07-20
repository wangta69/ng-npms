place charting library to
assets/charting_library/
assets/datafeeds/

import { TvChartContainerComponent } from '../../components/trading-view/charting-library-container/tv-chart-container.component';
import { TradeHistoryService } from '../../components/trading-view/charting-library-container/trade-history.service';
import { SocketService } from '../../components/trading-view/charting-library-container/socket.service';


Coinbase:BTC/USD
<app-tv-chart-container
    [symbol]="symbol"
>
</app-tv-chart-container>




1. Create Angular Project
ng new tradingViewAngular

2. Copy Files
Copy charting_library's datafeeds and charting_library folders to src/assets in angular project.

3. Update src/tsconfig.app.json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "es2015",
    "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts",
    "assets/datafeeds/udf/src"
  ]
}
4. Update index.html to add datafeeds
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TradingViewAngular5</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="/assets/datafeeds/udf/dist/polyfills.js"></script>
  <script src="/assets/datafeeds/udf/dist/bundle.js"></script>
</head>
<body>
  <app-root></app-root>
</body>
</html>

## charting_libray.min.d.ts에서 jquery를 사용함
5. Install jquery Types
npm install @types/jquery --save-dev

6. Install bootstrap


nodejs crawling 하여 db에 입력 https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD

각각의 코인에 대해 소켓 데이타 받아서 전송
