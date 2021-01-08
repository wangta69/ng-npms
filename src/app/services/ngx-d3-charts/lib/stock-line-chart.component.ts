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
export class LineStockComponent implements OnInit {
    @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
    private svg: any;
    private element: any;
    private chartData: ChartData[];
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
        // this.chartOptions = Object.assign({}, this.chartOptions, newValue);
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
            // this.updateChartLayout();
        }
    }

    private init() {
        const flag = this.chartContainer.nativeElement.offsetHeight;
        if (flag && this.chartData ) {
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
        // append the svg object to the body of the page
        const width = this.chartContainer.nativeElement.offsetWidth;
        const height = this.chartContainer.nativeElement.offsetHeight;
        this.width = width - this.chartOptions.margin.left - this.chartOptions.margin.right,
        this.height = height - this.chartOptions.margin.top - this.chartOptions.margin.bottom;

        this.svg = d3.select(this.element).append('svg');
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
            .attr('class', 'axis y-axis'); // .orient('right')
            // .attr('transform', 'translate(' + this.width + ',0)');

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

        //    .axisRight();
            // .call(d3.axisLeft(y));

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

        this.focus.append('circle').attr('r', 2.5).attr('fill', () => 'yellow');
        this.focus.append('line').classed('x', true);
        this.focus.append('line').classed('y', true);
        this.svg.select('.chart-body')
            .append('rect')
            .attr('class', 'overlay')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'none')
            .on('mouseover', () => {this.focus.style('display', null); this.focusStatus = true; })
            .on('mouseout', () => {this.focus.style('display', 'none'); this.focusStatus = false; })
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
          // .on('zoom.end', () => this.zoomend());

        this.svg.call(zoomed);
        this.windowResize(); // 리사이징시 모든 width를 새로 적용한다.
    }

    private updateChartLayout() {
        // y축 설정
        if (this.chartOptions.yAxis.position === 'right') {
            this.svg.select('.axis.y-axis')
                .attr('transform', 'translate(' + this.width + ', 0)');
        }
    }

    private updateChartData() {
        if (this.focusStatus === false) {
            this.updateLegends(this.chartData[this.chartData.length - 1]);
        }

        const xScale = this.getXrescale();
        this.svg.selectAll('.axis.x-axis')
        .call(d3.axisBottom(xScale).ticks(5));

        // Initialize an Y axis
/*        const yScale = this.getYrescale();
        this.svg.selectAll('.axis.y-axis')
        .call(d3.axisLeft(yScale).ticks(5));
*/
        const yScale = this.getYrescale();
        if (this.chartOptions.yAxis.position === 'right') {
            this.svg.selectAll('.axis.y-axis')
            .call(d3.axisRight(yScale).ticks(3));
        } else {
            this.svg.selectAll('.axis.y-axis')
            .call(d3.axisLeft(yScale).ticks(3));
        }


        // Create a update selection: bind to the new data
        const lineChart = this.svg.select('.chart-body').selectAll('.line')
            .data([this.chartData], (d: ChartData) => d.date);

        // ENTER
        lineChart
            .enter()
            .append('path')
            .attr('class', 'line')
            .merge(lineChart)
            .transition()
            .duration(500)
            .attr('fill', 'none')
            .attr('d', d3.line()
                .x((d: any) => xScale(d.date))
                .y((d: any) => yScale(d.close))
            );

        // UPDATE
        lineChart
    //    .transition()
    //    .duration(500)
        .attr('d', d3.line()
            .x((d: any) => xScale(d.date))
            .y((d: any) => yScale(d.close))
            )
        .attr('stroke-width', () => 1.0)
        .attr('stroke', 'steelblue') // stroke가 endter시에는 로컬에서는 작동하지만 서버 올렸을 때 작동하지 않음
        .attr('fill', 'none');

        // EXIT
        lineChart.exit().remove();
        this.updateBreakPoint(xScale, yScale);
    //    this.updateWaitPoint(xScale, yScale);
        this.updateCurrentClosePrice();

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
        // const yGrid = this.svg.select('.chart-body').selectAll('.y-grid').attr('transform', 'translate(' + this.width + ',0)');
        const y = d3.scaleLinear().range([this.height, 0]);

        // yGrid.call(d3.axisLeft(y).ticks(5)
        // yGrid.call(d3.axisRight(y).ticks(5)
        yGrid.call(d3.axisLeft(y).ticks(5)
            .tickSize(-this.width)
            .tickFormat(null));
    }

    private generateCrosshair(arg1: any, arg2: any, arg3: any) {
        const bisectDate = d3.bisector((data: any ) => {
              return data.date;
        }).left;

        const xScale = this.getXrescale();
        const yScale = this.getYrescale();
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
            .style('fill', () => this.latestGame.start_price > currentData.close ? '#0c6ba3' : this.latestGame.start_price < currentData.close ? '#f55f72' : 'siver');
            // .style('fill', () => currentData.open > currentData.close ? '#0c6ba3' : currentData.open < currentData.close ? '#f55f72' : 'siver');

        this.svg.select('.close-price-indicator').select('.tag-txt')
            .transition()
            .duration(500)
            .attr('transform', `translate(${this.width - 45}, ${yScale(currentData.close) + 3.5})`)
            .text(this.decimalPipe.transform(currentData.close, '1.5-5') );

    }

    private updateLegends(currentData: ChartData) {
    //    this.currentData = currentData;
        d3.selectAll('.lineLegend').remove();

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
            if (parseInt(d3.timeFormat('%M')(data.date), 10) % this.gameType  === 0) {
                // 이전 데이타와 open data 비교
                if (i !== 0 ) { // 3 8, 13, 18
                    if (!this.chartData[i - this.gameType]) {
                        return;
                    }

                    data.difference = data.close - this.chartData[i - this.gameType].close;

                    const text = d3.timeFormat('%I:%M')(data.date);
                    this.svg.select('.chart-body').append('text')
                        .attr('class', 'break-point')
                        .attr('x', xScale(data.date))
                        .attr('y', yScale(data.close))
                        .style('text-anchor', 'end')
                        .style('font-size', '7pt')
                    //    .style('fill', '#fff')
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
            //    return data;
            }
        });
    }
/*
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
    */

    private zoomed() {
        this.updateChartData();
    }

    private getXscale() {
/*
        const xExtent = d3.extent(this.chartData, (d) => d.date);
        const xRange = xExtent[1] - xExtent[0];
        return d3.scaleTime()
            .domain([xExtent[0] - (xRange * .05), xExtent[1] + (xRange * .05)])
            .range([ 0, this.width ]);
*/

        return d3.scaleTime()
        .domain(d3.extent(this.chartData, (d: any) => d.date))
        .range([ 0, this.width - 70 ]);

    }

    private getXrescale() {
        const t = d3.zoomTransform( this.svg.node());
        const xScale =  this.getXscale();
        return t.rescaleX(xScale).nice();
    }

    private getYscale() {
        const yMin  = d3.min(this.chartData, (d: ChartData) => d.close);
        const yMax = d3.max(this.chartData, (d: ChartData) => d.close);
        return d3.scaleLinear()
        .domain([yMin - 0.0005, yMax + 0.0005])
        .range([ this.height, 0 ]);
    }

    private getYrescale() {
        const t = d3.zoomTransform( this.svg.node());
        const yScale =  this.getYscale();
        return t.rescaleY(yScale);
    }
/*
    private getXBandWidth() {
        const t = d3.zoomTransform( this.svg.node());
        const d3RangeNumber = d3.range(-1, this.chartData.length);
        const d3RangeString: string[] = [];
        for (const n of d3RangeNumber) {
            d3RangeString.push(n.toString());
        }
        const xBand = d3.scaleBand()
                        .domain(d3RangeString)
                        .range([0, this.width]);
        return xBand.bandwidth() * t.k;
        // return t.rescaleX(xBand).bandwidth()
    }
    */

    private windowResize() {
        const width = this.chartContainer.nativeElement.offsetWidth;
        const height = this.chartContainer.nativeElement.offsetHeight;
        this.width = width - this.chartOptions.margin.left - this.chartOptions.margin.right,
        this.height = height - this.chartOptions.margin.top - this.chartOptions.margin.bottom;

        if (this.svg) {
            this.svg
            .attr('width', this.width + this.chartOptions.margin.left + this.chartOptions.margin.right)
            .attr('height', this.height + this.chartOptions.margin.top + this.chartOptions.margin.bottom);
        }

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
