import { NgModule, Component, EventEmitter, Input, Output, OnChanges, SimpleChange} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'ngc-pagination',
    templateUrl: 'pagination.html',
    // template: ``
    styleUrls: ['./pagination.scss']
})

/*
collectionSize - 총 아이템수 Number of elements/items in the collection. i.e. the total number of items the pagination should handle.
pageSize - 페이지당 아이템 출력수 Number of elements/items per page.
pageCount - 페이지블록에 출력할 페이지 갯수  Number of display pages
page - The current page.
*/
export class PaginationComponent implements OnChanges {
    @Input() collectionSize: number;
    @Input() pageSize: number;
    @Input() pageCount: number;
    @Input() currentPage: number;
    @Output() currentPageChanged = new EventEmitter<number>(true);

    public pageInfo = {prev: 0, next: 0, total: [], lists: [], pageCount: 0};
    // total: 총 페이지
    // lists: 디스플레이할 페이지
    // pageCount : total pages;
    constructor(

    ) {
        //    this.gameSound = globals.gameSound;
    }

    public ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.updatePages();
        for (const propName in changes) {
        //     console.log(propName);
            if (changes.hasOwnProperty(propName)) {
                // const changedProp = changes[propName];
                // if (propName === 'active') {
                //
                // }
            }
        }

    }

    private updatePages() { // newPage: number
        // 총페이지 수
        this.pageInfo.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        // console.log(this.pageInfo.pageCount, this.collectionSize, this.pageSize);
        // 총 블럭수
        const blocks = Math.ceil(this.pageInfo.pageCount / this.pageCount);
        const currentblock = Math.ceil(this.currentPage / this.pageCount);

        if (!this.isNumber(this.pageInfo.pageCount)) {
            this.pageInfo.pageCount = 0;
        }

        if (this.currentPage < this.pageCount) {
            this.pageInfo.prev = 0;
        } else {
            this.pageInfo.prev = currentblock * this.pageCount - this.pageCount;
        }

        if (currentblock >= blocks) {
            this.pageInfo.next = 0;
        } else {
            this.pageInfo.next = currentblock * this.pageCount + 1;
        }

        // fill-in model needed to render pages
        this.pageInfo.total.length = 0;
        for (let i = 1; i <= this.pageInfo.pageCount; i++) {
            this.pageInfo.total.push(i);
        }

        const start = Math.ceil((currentblock - 1) * this.pageCount);
        const end = start +  this.pageCount;



        this.pageInfo.lists = this.pageInfo.total.slice(start, end);

    }
/*
    private _setPageInRange(newPageNo) {
       const prevPageNo = this.page;
       this.page = getValueInRange(newPageNo, this.pageCount, 1);

       if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
         this.pageChange.emit(this.page);
       }
     }
*/
    private toInteger(value: any): number {
      return parseInt(`${value}`, 10);
    }

    private isNumber(value: any): value is number {
        return !isNaN(this.toInteger(value));
    }

    public setPage(page: number) {
        console.log('setPage', page);
        this.currentPage = page;
        this.currentPageChanged.emit(page);
        this.updatePages();

    }
}

@NgModule({
    declarations: [
        PaginationComponent,

        // SpeedDialGamesIconFabComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [ PaginationComponent ]
})
export class PaginationModule {}
