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
