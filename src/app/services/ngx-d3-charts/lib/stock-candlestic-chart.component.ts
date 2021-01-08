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
export class CandlesticStockComponent implements OnInit { // , OnChanges
    @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
    private svg: any;
    private element: any;
    private chartData: ChartData[];
    // private margin: any = {top: 30, right: 30, bottom: 30, left: 60};
    private transform: any = {k: 1, x: 0, y: 0};
    private width: number;
    private height: number;
    private focus: any; // 마우스 오브시 좌표출력
    private focusStatus = false; // 마우스 오버인지 아닌지 챜크
    private htmlLoaded = false;
//    private intervalContainer: any;

    private chartOptions: any = {
        margin: {top: 30, right: 30, bottom: 30, left: 70},
        yAxis: { position: 'left', label: {text: '', position: 'left'}}
    };

    private gameType: number;
    private latestGame: any;

    public set data(newValue: any) {
        if (newValue && newValue.length > 0) {
            this.chartData = newValue.map((d: ChartData) => {
                return { date : new Date(d.date * 1000), open: parseFloat(d.open.toString()), high:  parseFloat(d.high.toString()), low:  parseFloat(d.low.toString()), close:  parseFloat(d.close.toString())  };
            });

            this.chartData.sort((a, b) => a.date - b.date); // 반드시 해주어야 bisectDate 가 적용됨
            if (this.htmlLoaded) { // zoom 중일경우에는 막아 둔다.
                this.updateChartData();
            }
        }
    }

    public set options(newValue: any) {
    //    this.chartOptions = Object.assign({}, this.chartOptions, newValue);
        const options = {nonEnum: true, symbols: true, descriptors: true, proto: true};
        this.chartOptions = deepAssign(options)(this.chartOptions, newValue);
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
        this.windowResize();
    }

    constructor(private decimalPipe: DecimalPipe) {
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
            this.updateChartLayout();
        }
    }

    private init() {
        const flag = this.chartContainer.nativeElement.offsetHeight;
        if (flag && this.chartData) {
            this.htmlLoaded = true;
            this.element = this.chartContainer.nativeElement;
            this.setUpGraph();
            this.updateChartLayout();
        } else {
            setTimeout(() => {
                this.init();
            }, 100);
        }
    }

    setUpGraph() {

        const width = this.chartContainer.nativeElement.offsetWidth;
        const height = this.chartContainer.nativeElement.offsetHeight;
        this.width = width - this.chartOptions.margin.left - this.chartOptions.margin.right,
        this.height = height - this.chartOptions.margin.top - this.chartOptions.margin.bottom;

        this.svg = d3.select(this.element).append('svg');
    //    const bounds = this.svg.node().getBoundingClientRect();

        const layout = this.svg.append('g')// chart plot area
            .attr('class', 'layout')
            .attr('transform', 'translate(' + this.chartOptions.margin.left + ',' + this.chartOptions.margin.top + ')');


        // x 축 설정
        layout.append('g')
            .attr('class', 'axis x-axis'); // Assign 'axis' class

        // x축 tick 설정
        layout.append('g')
            .attr('class', 'tick');

        // y축 설정
        layout.append('g')
            .attr('class', 'axis y-axis');

       // chart body
        layout.append('g')
            .attr('class', 'chart-body')
            .attr('clip-path', 'url(#clip)');

        // grid X
        this.svg.select('.chart-body').append('g')
            .attr('class', 'grid x-grid');

        // grid Y
        this.svg.select('.chart-body').append('g')
            .attr('class', 'grid y-grid');

        // text label for the y axis
        const labelY = this.svg.append('text')
            .attr('class', 'label y');

        if (this.chartOptions.yAxis.label.text) {
            labelY
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('fill', '#fff')
            .text('Close Price');
        }

        if (this.chartOptions.yAxis.label.position === 'left') {
            labelY
            .attr('x', 0 - (this.height / 2))
            .attr('y', 0)
            .attr('transform', 'rotate(-90)');
        } else if (this.chartOptions.yAxis.label.position === 'right') {
            labelY
            .attr('x', 0 + (this.height / 2))
            .attr('y', 0)
            .attr('transform', 'translate(' + this.width + ', 0)rotate(90)');
        }

        // mask 설정
        this.svg.append('g').append('defs')
            .append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', this.width)
            .attr('height', this.height);

        // 현재 가격 설정
        const closePriceIndicator = this.svg.select('.chart-body')
            .append('g')
            .attr('class', 'close-price-indicator');

        closePriceIndicator
            .append('line')
            .attr('class', 'close-price-line')
            .style('fill', 'none')
            .style('fill-opacity', '0.4')
            .style('stroke', '#fff')
            .style('stroke-width', '0.5px');

        // 현재 close price 가격 표시 태그 설정
        closePriceIndicator.append('path')
            .attr('class', 'close-price-line-tag')
            .style('fill', 'none')
            .style('stroke', '#fff')
            .style('stroke-width', '0.5px')
            .attr('d', 'M0 5 L5 0 L55 0 L50 5 L55 10 L5 10 z');

        closePriceIndicator.append('text')
            .attr('class', 'tag-txt')
            .style('text-anchor', 'start')
            .style('font-size', '7pt')
            .style('fill', '#fff');
        //    .style('fill', 'silver');

        // overlay 설정
        // focus (crosshair) 설정
        this.focus = this.svg.select('.chart-body').append('g')
            .attr('class', 'focus')
            .style('display', 'none');

        this.focus.append('circle')
            .attr('r', 2.5)
            .attr('fill', () => 'yellow');
        this.focus.append('line').classed('x', true);
        this.focus.append('line').classed('y', true);
        this.svg.select('.chart-body')
            .append('rect')
            .attr('class', 'overlay')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'none')
            .on('mouseover', () => this.focus.style('display', null))
            .on('mouseout', () => this.focus.style('display', 'none'))
            .on('mousemove', (d: any, i: any, n: any) => this.generateCrosshair(d, i, n));

        d3.select('.overlay').style('fill', 'none');
        d3.select('.overlay').style('pointer-events', 'all');
        d3.selectAll('.focus line').style('fill', 'none');
        d3.selectAll('.focus line').style('stroke', '#67809f');
        d3.selectAll('.focus line').style('stroke-width', '1.5px');
        d3.selectAll('.focus line').style('stroke-dasharray', '3 3');

        // zoom에 대한 정의
        const extent: [[number, number], [number, number]] = [[0, 0], [this.width, this.height]];
        const zoomed = d3.zoom()
          .scaleExtent([1, 100])
          .translateExtent(extent)
          .extent(extent)
          .on('zoom', () => this.zoomed());
        //  .on('zoom.end', () => this.zoomend());

        this.svg.call(zoomed);

        this.windowResize();
    }

    private updateChartLayout() {
        // append the svg object to the body of the page
        // y축 설정
        if (this.chartOptions.yAxis.position === 'right') {
            this.svg.select('.axis.y-axis')
                .attr('transform', 'translate(' + this.width + ', 0)');
        }
    }

    private updateChartData() {
        if (this.htmlLoaded === false) {
            return;
        }
        if (this.focusStatus === false) {
            this.updateLegends(this.chartData[this.chartData.length - 1]);
        }

        const xScale = this.getXrescale();
        this.svg.selectAll('.axis.x-axis')
        .call(d3.axisBottom(xScale).ticks(5));

        const yScale = this.getYrescale();
        if (this.chartOptions.yAxis.position === 'right') {
            this.svg.selectAll('.axis.y-axis')
            .call(d3.axisRight(yScale).ticks(3));
        } else {
            this.svg.selectAll('.axis.y-axis')
            .call(d3.axisLeft(yScale).ticks(3));
        }

        const xBand = this.getXBand();

        const candles = this.svg.select('.chart-body').selectAll('.candle')
            .data(this.chartData);

        // ENTER
        candles.enter()
            .append('rect')
            .attr('class', 'candle')
            .transition()
            .duration(500)
            .attr('x', (d: ChartData) => xScale(d.date) - (xBand.bandwidth() * this.transform.k) / 2)
            .attr('y', (d: ChartData) => yScale(Math.max(d.open, d.close)))
            .attr('width', xBand.bandwidth() * this.transform.k)
            .attr('height', (d: ChartData) => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)))
            .attr('fill', (d: ChartData) => (d.open === d.close) ? 'silver' : (d.open > d.close) ? '#0c6ba3' : '#f55f72');

        // UPDATE
        candles.attr('x', (d: ChartData) => xScale(d.date) - (xBand.bandwidth() * this.transform.k) / 2)
            .attr('y', (d: ChartData) => yScale(Math.max(d.open, d.close)))
            .attr('width', xBand.bandwidth() * this.transform.k)
            .attr('height', (d: ChartData) => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)))
            .attr('fill', (d: ChartData) => (d.open === d.close) ? 'silver' : (d.open > d.close) ? '#0c6ba3' : '#f55f72');

        // EXIT
        candles.exit().remove();


        // draw high and low : candle 중앙의 로하이 바를 그린다.
        const stem = this.svg.select('.chart-body').selectAll('.stem')
           .data(this.chartData);

        // ENTER
        stem.enter()
            .append('line')
            .attr('class', 'stem')
            .transition()
            .duration(500)
            // .attr('x1', (d: ChartData, i: number) => xScale(i) - xBand.bandwidth() / 2)
            // .attr('x2', (d: ChartData, i: number) => xScale(i) - xBand.bandwidth() / 2)
            .attr('x1', (d: ChartData) => xScale(d.date) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5)
            .attr('x2', (d: ChartData) => xScale(d.date) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5)
            .attr('y1', (d: ChartData) => yScale(d.high))
            .attr('y2', (d: ChartData) => yScale(d.low))
            .attr('stroke', (d: ChartData) => (d.open === d.close) ? 'white' : (d.open > d.close) ? '#0c6ba3' : '#f55f72');

        // UPDATE
        stem.attr('x1', (d: ChartData) => xScale(d.date) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5)
            .attr('x2', (d: ChartData) => xScale(d.date) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5)
            .attr('y1', (d: ChartData) => yScale(d.high))
            .attr('y2', (d: ChartData) => yScale(d.low))
            .attr('stroke', (d: ChartData) => (d.open === d.close) ? 'white' : (d.open > d.close) ? '#0c6ba3' : '#f55f72');
        // EXIT
        stem.exit().remove();
        this.updateBreakPoint(xScale, yScale);
        this.updateWaitPoint(xScale, yScale);
        this.updateCurrentClosePrice();
    }

    private updateWaitPoint(xScale: (d: Date) => {}, yScale: (d: number) => {}) {
        d3.selectAll('.wait-point-rec').remove();
        this.chartData.filter( (data: any, i) => {
            // 이전 데이타와 open data 비교
            if (d3.timeFormat('%I:%M')(data.date) === d3.timeFormat('%I:%M')(new Date()) ) {
                if (parseInt(d3.timeFormat('%M')(data.date), 10) % 3 === 0) {
                    this.svg.select('.chart-body').append('rect')

                        .attr('class', 'wait-point-rec')
                        .attr('x', xScale(data.date))
                        .attr('y', 0)
                        // .attr('width', this.getXBandWidth())
                        .attr('width', '70')
                        .attr('height', this.height)
                        .attr('fill', 'silver')
                        .style('opacity', 0.1);
                }
            }
        });
    }

    private zoomed() {
        if (d3.event) {
        //    const t = d3.event.transform;
            this.transform = d3.event.transform;
            const xScale = this.getXrescale();

            const xBand = this.getXBand();

            this.svg.select('.chart-body').selectAll('.candle')
                .attr('x', (d: ChartData) => xScale(d.date) - (xBand.bandwidth() * this.transform.k) / 2)
                .attr('width', xBand.bandwidth() * this.transform.k);

            this.svg.select('.chart-body').selectAll('.stem')
                .attr('x1', (d: ChartData) => xScale(d.date) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5)
                .attr('x2', (d: ChartData) => xScale(d.date) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5);

            this.updateChartData();
        }
    }

    private getXscale() {
        return d3.scaleTime()
        .domain(d3.extent(this.chartData, (d: any) => d.date))
        // .range([ 30, this.width - 30 ]);
        .range([ 0, this.width - 70 ]);
    }

    private getXrescale() {
        const t = d3.zoomTransform( this.svg.node());
        const xScale =  this.getXscale();
        return t.rescaleX(xScale).nice();
    }

    private getYscale() {
        const ymin = d3.min(this.chartData.map(r => r.low));
        const ymax = d3.max(this.chartData.map(r => r.high));
        return d3.scaleLinear().domain([ymin - 0.0005, ymax + 0.0005]).range([this.height, 0]).nice();
    }

    private getYrescale() {
        const t = d3.zoomTransform( this.svg.node());
        const yScale =  this.getYscale();
        return t.rescaleY(yScale);
    }

    private getXBand() {
        const d3RangeNumber = d3.range(-1, this.chartData.length);
        const d3RangeString: string[] = [];
        for (const n of d3RangeNumber) {
            d3RangeString.push(n.toString());
        }
        return d3.scaleBand().domain(d3RangeString).range([0, this.width]).padding(0.3);
    }

    // gridlines in x axis function
    private drawGridlinesX() {
        const xGrid = this.svg.select('.chart-body').selectAll('.x-grid').attr('transform', 'translate(0,' + this.height + ')');

        const x = d3.scaleTime().range([0, this.width]);
        xGrid.call(d3.axisBottom(x).ticks(5)
            .tickSize(-this.height)
            .tickFormat(null));
    }

    // gridlines in y axis function
    private drawGridlinesY() {
        const yGrid = this.svg.select('.chart-body').selectAll('.y-grid');

        const y = d3.scaleLinear().range([this.height, 0]);
        yGrid.call(d3.axisLeft(y).ticks(5)
            .tickSize(-this.width)
            .tickFormat(null));
    }

    private generateCrosshair(arg1: any, arg2: any, arg3: any) {
        const bisectDate = d3.bisector((data: any ) => {
              return data.date;
        }).left;

        const xScale  = this.getXrescale();
        const yScale  = this.getYrescale();
        const coordinates = d3.mouse(arg3[arg2]);
        const correspondingDate: any = xScale.invert(coordinates[0]); // <-- use the bisector to search the array for the closest point to the left and find that point given our mouse position
        const i = bisectDate(this.chartData, correspondingDate, 1); // 현재 데이타와 가장 인접한 데이타를 가져와야함
        const d0 = this.chartData[i - 1];
        const d1 = this.chartData[i];
        if (!d0 || !d1) {
            return;
        }
        const currentPoint = correspondingDate - d0.date > d1.date - correspondingDate ? d1 : d0;

        this.focus
            .attr('transform', `translate(${xScale(currentPoint.date)}, ${yScale(currentPoint.close)})`);
        this.focus
            .select('line.x')
            .attr('x1', 0)
            .attr('x2', this.width - xScale(currentPoint.date))
            .attr('y1', 0)
            .attr('y2', 0);
        this.focus
            .select('line.y')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', this.height - yScale(currentPoint.close));

        this.updateLegends(currentPoint);
    }

    private updateCurrentClosePrice() {
        const currentData = this.chartData[this.chartData.length - 1];
        const yScale = this.getYrescale();
        this.svg.select('.close-price-line')
        //    .attr('transform', `translate(0, ${yScale(currentData.close)})`)
            .attr('x1', 0)
            .attr('x2',  this.width)
            .transition()
            .duration(500)
            .attr('y1', yScale(currentData.close))
            .attr('y2', yScale(currentData.close));

        this.svg.select('.close-price-line-tag')
            .transition()
            .duration(500)
            .attr('transform', `translate(${this.width - 55}, ${yScale(currentData.close) - 5})`)
            // .style('fill', () => currentData.open > currentData.close ? '#0c6ba3' : currentData.open < currentData.close ? '#f55f72' : 'siver');
            .style('fill', () => this.latestGame.start_price > currentData.close ? '#0c6ba3' : this.latestGame.start_price < currentData.close ? '#f55f72' : 'siver');
        this.svg.select('.close-price-indicator').select('.tag-txt')
            .transition()
            .duration(500)
            .attr('transform', `translate(${this.width - 45}, ${yScale(currentData.close) + 3.5})`)
            .text(this.decimalPipe.transform(currentData.close, '1.5-5') );
    }

    private updateLegends(currentData: ChartData) {
        d3.selectAll('.lineLegend').remove();

        // let text = currentData.date.toLocaleDateString();
        let text = d3.timeFormat('%I:%M')(currentData.date);
        text += ' 시:' + currentData.open.toFixed(5);
        text += ' 고:' + currentData.high.toFixed(5);
        text += ' 저:' + currentData.low.toFixed(5);
        text += ' 종:' + currentData.close.toFixed(5);
        this.svg.append('text')
            .attr('class', 'lineLegend')
            .attr('y', 20)
            .attr('x', 30)
            .style('text-anchor', 'start')
            .style('font-size', '10pt')
            .style('fill', '#fff')
            .text(text);

    }


    private updateBreakPoint(xScale: (d: Date) => {}, yScale: (d: number) => {}) {
        d3.selectAll('.break-point').remove();
        d3.selectAll('.break-point-rec').remove();

        this.chartData.filter( (data: any, i) => {
            if (parseInt(d3.timeFormat('%M')(data.date), 10) % 3  === 1) {
                // 이전 데이타와 open data 비교
                if (i !== 0 ) {
                    data.difference = data.open - this.chartData[i - 1].open;

                    const text = d3.timeFormat('%I:%M')(data.date);
                    this.svg.select('.chart-body').append('text')
                        .attr('class', 'break-point')
                        .attr('x', xScale(data.date))
                        .attr('y', yScale(data.close))
                        .style('text-anchor', 'end')
                        .style('font-size', '7pt')
                        // .style('fill', '#fff')
                        .style('fill', 'currentColor')
                        .text(text);
                    const color = (data.difference < 0) ? '#0c6ba3' : (data.difference > 0) ? '#f55f72' : 'silver';
                    this.svg.select('.chart-body').append('rect')

                        .attr('class', 'break-point-rec')
                        .attr('x', xScale(data.date) as number - 2.5)
                        .attr('y', yScale(data.close) as number - 2.5)
                        .attr('width', 5)
                        .attr('height', 5)
                        .attr('fill', color);
                }
                return data;
            }
        });
    }

    private windowResize() {
        // const bounds = this.svg.node().getBoundingClientRect();
    //    this.element = this.chartContainer.nativeElement;
        const width = this.chartContainer.nativeElement.offsetWidth;
        const height = this.chartContainer.nativeElement.offsetHeight;
        this.width = width - this.chartOptions.margin.left - this.chartOptions.margin.right,
        this.height = height - this.chartOptions.margin.top - this.chartOptions.margin.bottom;

        this.svg
        .attr('width', this.width + this.chartOptions.margin.left + this.chartOptions.margin.right)
        .attr('height', this.height + this.chartOptions.margin.top + this.chartOptions.margin.bottom);

        this.svg.select('#clip').select('rect')
        .attr('width', this.width)
        .attr('height', this.height);

        this.svg.select('.chart-body')
            .attr('width', this.width)
            .attr('height', this.height);

        this.svg.selectAll('.axis.x-axis')
        .attr('transform', 'translate(0,' + this.height + ')');


        this.updateChartData();
        this.updateChartLayout();

        this.drawGridlinesX();
        this.drawGridlinesY();

        // over lay resizing
        this.svg.select('.overlay')
            .attr('width', this.width)
            .attr('height', this.height);
    }

}
