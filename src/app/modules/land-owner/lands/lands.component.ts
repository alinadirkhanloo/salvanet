import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { LandsService } from './lands.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/services/shared.service';
import { Table } from 'primeng/table';

export interface ILand {
	realEstateUniqueCode: string;
	realEstatePlate: string;
	address: string;
	statusId: number;
}

@Component({
  selector: 'app-lands',
  templateUrl: './lands.component.html',
  styleUrls: ['./lands.component.css']
})

export class LandsComponent implements OnInit{

  private sub = new Subscription();
  
  gridHeaders:IGridHeader[] = [
    {title:'realEstateUniqueCode',persianTitle:'شماره یکتا',sortKey:'realEstateUniqueCode'},
    {title:'realEstatePlate',persianTitle:'پلاک ثبتی',sortKey:'realEstatePlate'},
    {title:'address',persianTitle:'آدرس',sortKey:'address'},
    {title:'statusId',persianTitle:'وضعیت',sortKey:'statusId'}
  ];


  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: ILand[]=[];
  selectedList: ILand[]=[];
  
  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private ccdService: LandsService,
    public dialogService: DialogService,
    private router:Router,
    private shService:SharedService,
    private confirmationService: ConfirmationService
    ) {}

  ngOnInit() {
    this.loadAll(null);
  }

  loadAll(event){
    this.dataGrid.loading = true;
    this.loadDataSource(event);
  }

  loadDataSource(event: LazyLoadEvent) {
    if (event !== null) {
      this.lazyLoadvent = event;
      this.sub.add(
        this.ccdService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
          next:(list:any)=>{
            this.dataGrid.onLazyLoad(event,list);
            this.dataSource=list;
          }
        })
        );
    }
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }
  clear(table: Table) {
    table.clear();
}

  qualification(event: Event,id:string|number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا تمایل به تایید صلاحیت شخص حقوقی انتخاب شده دارید ؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
      },
      reject: () => {
        //reject action
      }
    });
  }

  disqualification(event: Event, id: string|number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا تمایل به رد صلاحیت شخص حقوقی انتخاب شده دارید ؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
        this.sub.add(
          this.ccdService.delete(id).subscribe({
            next:(res)=>{
              this.shService.showSuccess();
            },
            error:(err)=>{
              this.shService.showError();
            }
          })
        )
      },
      reject: () => {
        //reject action
      }
    });
  }


}
