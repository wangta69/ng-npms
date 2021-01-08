// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// import { AppComponent } from './app.component';
import { NgxChartComponent } from './ngxchart.component';
import { ChartDirective } from './chart.directive';
import { CandlesticStockComponent } from './stock-candlestic-chart.component';
import { LineStockComponent } from './stock-line-chart.component';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        DecimalPipe
    ],
    entryComponents: [
        CandlesticStockComponent,
        LineStockComponent
    ],
    declarations: [
    // AppComponent,
        NgxChartComponent,
        CandlesticStockComponent,
        LineStockComponent,
        ChartDirective
    ],
    exports: [
        CandlesticStockComponent,
        LineStockComponent,
        NgxChartComponent
    ]
})
export class NgxD3ChartModule { }
