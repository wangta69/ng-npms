import { Component, Input,  OnInit, OnChanges, SimpleChange, IterableChanges, IterableDiffer, IterableDiffers, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
// import { Component, Input,  OnInit, DoCheck, IterableChanges, IterableDiffer, IterableDiffers, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ChartDirective } from './chart.directive';
import { CandlesticStockComponent } from './stock-candlestic-chart.component';
import { LineStockComponent } from './stock-line-chart.component';

@Component({
    selector: 'app-chart',
    template: `
        <ng-template chart-host></ng-template>
    `
})
export class NgxChartComponent implements OnInit, OnDestroy, OnChanges { // OnChanges,

    @Input() type: string; // candlestic | linestock
    @Input() data: any;
    @Input() options: any;
    @Input() tick: boolean;
    @Input() gameType: number; // 1, 2, 3, 4, 5분봉
    @Input() latestGame: any;

    charts = {candlestic: CandlesticStockComponent, linestock: LineStockComponent};

    componentRef: any;
    private diffData: IterableDiffer<number>;
    private diffOption: KeyValueDiffer<any, any>;
//    private diff: KeyValueDiffer<K, V>;
    private diffType: string;

    @ViewChild(ChartDirective, {static: true}) chartHost: ChartDirective;
    interval: any;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private iterableDiffers: IterableDiffers,
        private keyValueDiffers: KeyValueDiffers
    ) { }

    ngOnInit() {

        this.diffData = this.iterableDiffers.find(this.data).create();
        this.diffOption = this.keyValueDiffers.find(this.options).create();

        // this.diff = this.diff.find(this.data).create();
    //    this.diffType = this.iterableDiffers.find(this.type).create();
    //    this.loadComponent();
    }

    ngOnDestroy() {
        // clearInterval(this.interval);
    }
/*
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                const changedProp = changes[propName];
                switch (propName) {
                    case 'type':
                        this.type = changedProp.currentValue;
                        this.loadComponent();
                        break;
                //    case 'data':
                //        this.data = changedProp.currentValue;
                //        this.componentRef.instance.data = this.data;
                //        break;
                }
            }
        }
        // this.changeLog.push(log.join(', '));
    }
    */


//    public ngDoCheck(): void {

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) { //
        if (this.type !== this.diffType) {
            this.diffType = this.type;
            this.loadComponent();
            (this.componentRef.instance as any).options = this.options;
        }
        if (this.diffData) {
            const dataChanges: IterableChanges<number> = this.diffData.diff(this.data);
            if (dataChanges) {
                this.componentRef.instance.data = this.data;
            }
        }

        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                switch (propName) {
                    case 'gameType':
                        this.componentRef.instance.setGameType = this.gameType;
                        break;
                    case 'latestGame':
                        this.componentRef.instance.setLatestGame = this.latestGame;
                        break;

                }
            }
        }

    //    const optionChanges: KeyValueChanges<any, any> = this.diffOption.diff(this.options);
    //    if (optionChanges) {
    //        this.componentRef.instance.options = this.options;
    //    }
      }

    loadComponent() {
        const component = this.charts[this.type];

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.chartHost.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
    //    (this.componentRef.instance as any).data = this.data;
    //    (this.componentRef.instance as any).options = this.options;
    }
}
