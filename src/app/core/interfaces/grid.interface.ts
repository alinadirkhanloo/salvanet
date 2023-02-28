import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface IGridHeader {
    title: string;
    persianTitle: string;
    sortKey: string;
}

export class GenericGrid {
    public position: string;
    public lazy: boolean;
    public selectionMode: boolean;
    public customTableStyle: any;
    public selectedData: any;
    public paginator: boolean;
    public rowCount: number;
    public loading: boolean;
    public tableHeaerFields: IGridHeader[];
    public filterHeaerFields: string[] =[];
    public selectAll: boolean;
    public totalRecords: number;

    public selectionChange(value = []): any {

        this.selectAll = value.length === this.totalRecords;
        this.selectedData = value;
        return this.selectedData;
    }

    public selectAllChange(event: any, dataSource: any): any {

        const checked = event.checked;

        if (checked) {
            this.selectedData = dataSource;
            this.selectAll = true;
        }
        else {
            this.selectedData = [];
            this.selectAll = false;
        }
        return this.selectedData;
    }

    public onLazyLoad(event: LazyLoadEvent, dataSource: any): any {
        this.loading = true;
        let gridData = [];
            gridData = dataSource?dataSource:[];
            this.totalRecords = gridData.length;
            this.loading = false;
        return gridData;
    }

    public redirect(redirectUrl: string) {
        this.router.navigate([`${redirectUrl}`]);
    }


    constructor(private router: Router, tableHeaerFields: IGridHeader[]) {
        this.position = 'top';
        this.lazy = true;
        this.selectionMode = false;
        this.customTableStyle = { 'min-width': '75rem' };
        this.selectedData = [];
        this.paginator = true;
        this.rowCount = 10
        this.loading = false;
        this.tableHeaerFields = tableHeaerFields;
        this.filterHeaerFields = this.tableHeaerFields.map(item=> item.title);
        this.selectAll = false;
    }
}
