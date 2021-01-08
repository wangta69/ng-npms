import { Component, OnInit, HostListener, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as d3 from 'd3';
import {deepAssign} from './util';

export interface ChartData {
    date: any;
    open: number;
    high: number;
    low: number;
    close: number;
}

@Component({
    template: `<div class="d3-chart" #chart></div>`,
    styleUrls: ['./chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
    @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
    private svg: any;
    private element: any;
    // private chartData: ChartData[];
    private chartData: any;
    // private currentData: ChartData;
    // private margin: any = {top: 30, right: 30, bottom: 30, left: 70};
    // private transform: any = {k: 1, x: 0, y: 0};
    private width: number;
    private height: number;
    private focus: any; // 마우스 오브시 좌표출력
    private focusStatus = false; // 마우스 오버인지 아닌지 챜크
    private htmlLoaded = false;
//    private intervalContainer: any;
    private chartOptions: any = {
        margin: {top: 30, right: 30, bottom: 30, left: 70},
        yAxis: { position: 'left', label: {text: '', position: 'left'}},
        xAxis: { tick: 0.1}
    };

    private gameType: number;
    private latestGame: any;


    private duration = 500;
    private color = d3.schemeCategory10;
    private xMin: any; // Date
    private xMax: any; // Date
    private line: any;

    private _t: any;
    private _x: any;
    private _y: any;
//    private _z: d3.ScaleOrdinal<string, string>;
//    private _z = (k: string) => {};
//    private _z = () => {};
//    private _z: d3.ScaleOrdinal;
    private _z = d3.scaleOrdinal<number, string>();

    // 상위에서 set data를 통해 데이타를 받아 온다.
    public set data(newValue: any) {
        if (newValue && newValue.length > 1) {
            this.chartData = ['x', 'y', 'z'].map((c) => {
                return {
                  label: c,
                  values: newValue.map((d: any) => {
                    return {time: +d.time, value: d[c]};
                  })
                };
              });

            // this.chartData = newValue.map((d: ChartData) => {
            //     return { date : new Date(d.date * 1000), open: parseFloat(d.open.toString()), high:  parseFloat(d.high.toString()), low:  parseFloat(d.low.toString()), close:  parseFloat(d.close.toString())  };
            // });

//             this.chartData.sort((a, b) => a.date - b.date); // 반드시 해주어야 bisectDate 가 적용됨
            if (this.htmlLoaded) { // zoom 중일경우에는 막아 둔다.
                this.updateChartData();
            }
        }
    }

    public set options(newValue: any) {
        // this.chartOptions = Object.assign({}, this.chartOptions, newValue);
        const options = {nonEnum: true, symbols: true, descriptors: true, proto: true};
    //    this.chartOptions = deepAssign(options)(this.chartOptions, newValue);
        this.optionsInit();
    }

    public set setGameType(newValue: number) {
        this.gameType = newValue;
        // this.chartOptions = Object.assign({}, this.chartOptions, newValue);
    }

    public set setLatestGame(newValue: any) {
        this.latestGame = newValue;
    }

    @HostListener('window:resize', [])
    onResize() {
    //    this.windowResize();
    }

    constructor() { // private decimalPipe: DecimalPipe
    }

    ngOnInit() {
        this.init();

    }

    private optionsInit() {
        // const flag = this.chartContainer.nativeElement.offsetHeight;
        if (!this.htmlLoaded) {
            setTimeout(() => {
                this.optionsInit();
            }, 200);
        } else {
            // this.updateChartLayout();
        }
    }

    private init() {
        const flag = this.chartContainer.nativeElement.offsetHeight;
        if (flag && this.chartData ) {
            this.htmlLoaded = true;
            this.element = this.chartContainer.nativeElement;

        //    if (this.htmlLoaded) { // zoom 중일경우에는 막아 둔다.

        //    }


            this.setUpGraph();
        //    this.updateChartLayout();
        //    this.updateChartData();
        } else {
            //  참이 아닐 경우 0.1초후 다시 초기화를 진행한다..
            setTimeout(() => {
                this.init();
            }, 100);
        }
    }

    setUpGraph() {
        // append the svg object to the body of the page
        const width = this.chartContainer.nativeElement.offsetWidth;
        const height = this.chartContainer.nativeElement.offsetHeight;
        this.width = width - this.chartOptions.margin.left - this.chartOptions.margin.right,
        this.height = height - this.chartOptions.margin.top - this.chartOptions.margin.bottom;

        this.svg = d3.select(this.element).append('svg');
        this.svg.attr('width', this.width).attr('height', this.height);

        const svg = this.svg.selectAll('svg').data([this.chartData]);
        const gEnter = svg.enter().append('g');

        gEnter.append('g').attr('class', 'axis x');
        gEnter.append('g').attr('class', 'axis y');
        gEnter.append('defs').append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', this.width - this.chartOptions.margin.left - this.chartOptions.margin.right)
            .attr('height', this.height - this.chartOptions.margin.top - this.chartOptions.margin.bottom);
        gEnter.append('g')
            .attr('class', 'lines')
            .attr('clip-path', 'url(#clip)')
            .selectAll('.data').data(this.chartData).enter()
            .append('path')
            .attr('class', 'data');

        const legendEnter = gEnter.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(' + (this.width - this.chartOptions.margin.right - this.chartOptions.margin.left - 75) + ', 25)');
        legendEnter.append('rect')
            .attr('width', 50)
            .attr('height', 75)
            .attr('fill', '#ffffff')
            .attr('fill-opacity', 0.7);
        legendEnter.selectAll('text')
            .data(this.chartData).enter()
            .append('text')
            .attr('y', (d: any, i: number) => (i * 20) + 25)
            .attr('x', 5)
            .attr('fill', (d: any) => {
                return this._z(d.label);
                // return this._z();
            });
    }

    // linde chart를 그린다.
    private updateChartData() {
        // if (this.focusStatus === false) {
        //     this.updateLegends(this.chartData[this.chartData.length - 1]);
        // }
        this._t = d3.transition().duration(this.duration).ease(d3.easeLinear);
        this._x = d3.scaleTime().rangeRound([0, this.width - this.chartOptions.margin.left - this.chartOptions.margin.right]);
        this._y = d3.scaleLinear().rangeRound([this.height - this.chartOptions.margin.top - this.chartOptions.margin.bottom, 0]);
        // console.log('color', this.color); ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728",...]
        this._z = d3.scaleOrdinal(this.color);


        this.xMin = d3.min(this.chartData, (c: any) => {
            return d3.min(c.values, (d: any) => {
                return d.time;
            });
        });
        this.xMax = new Date(new Date(d3.max(this.chartData, (c: any) => {
            return d3.max(c.values, (d: any) => {
                return d.time;
            });
        })).getTime() - (this.duration * 2));

    //    console.log(this.xMin, this.xMax);

        this._x.domain([this.xMin, this.xMax]);
        this._y.domain([
            d3.min(this.chartData, (c: any) => d3.min(c.values, (d: any) => d.value)),
            d3.max(this.chartData, (c: any) => d3.max(c.values, (d: any) => d.value))
        ]);
        this._z.domain(this.chartData.map((c: any) => c.label));

        this.line = d3.line()
        .curve(d3.curveBasis)
        .x((d: any) => this._x(d.time))
        .y((d: any) => this._y(d.value));


        // UPDATE
        const g = this.svg.select('g')
            .attr('transform', 'translate(' + this.chartOptions.margin.left + ',' + this.chartOptions.margin.top + ')');

        g.select('g.axis.x')
            .attr('transform', 'translate(0,' + (this.height - this.chartOptions.margin.bottom - this.chartOptions.margin.top) + ')')
            .transition(this._t)
            .call(d3.axisBottom(this._x).ticks(5));
        g.select('g.axis.y')
            .transition(this._t)
            .attr('class', 'axis y')
            .call(d3.axisLeft(this._y));

        g.select('defs clipPath rect')
            .transition(this._t)
            .attr('width', this.width - this.chartOptions.margin.left - this.chartOptions.margin.right)
            .attr('height', this.height - this.chartOptions.margin.top - this.chartOptions.margin.right);

        g.selectAll('g path.data')
            .data(this.chartData)
            .style('stroke', (d: any) => this._z(d.label))
            .style('stroke-width', 2)
            .style('fill', 'none')
            .transition()
            .duration(this.duration)
            .ease(d3.easeLinear)
            // .on('start', this.tick);
            .on('start', (m: any, i: number, n: []) => {
                d3.select(n[i])
                    .attr('d', (d: any) => {
                        return this.line(d.values);
                    })
                    .attr('transform', null);

                const xMinLess = new Date(new Date(this.xMin).getTime() - this.duration);
                d3.active(n[i])
                    .attr('transform', 'translate(' + this._x(xMinLess) + ', 0)')
                    .transition();
                    // .on('start', this.tick);
            });

        g.selectAll('g .legend text')
            .data(this.chartData)
            .text((d: any) => {
                return d.label.toUpperCase() + ': ' + d.values[d.values.length - 1].value;
            });

    }

}
