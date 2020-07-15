this.pagination = {currentPage: 1,  pageSize: chunk, collectionSize: res.length, pageCount: 3};

<ngc-pagination
    [currentPage]="pagination.currentPage"
    (currentPageChanged)="pageChanged($event)"
    [pageSize]="pagination.pageSize"
    [pageCount]="pagination.pageCount"
    [collectionSize]="pagination.collectionSize"
>
</ngc-pagination>
