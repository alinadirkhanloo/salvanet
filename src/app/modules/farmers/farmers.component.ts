import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';
import { IFarmer } from './farmers.interface';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { FarmerService } from './farmers.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/services/shared.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent implements OnInit{

  private sub = new Subscription();
  
  gridHeaders:IGridHeader[] = [
    {title:'nationalCode',persianTitle:'کد ملی',sortKey:'nationalCode'},
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'lastName',persianTitle:'نام خانوادگی',sortKey:'lastName'},
    {title:'birthDate',persianTitle:'تاریخ تولد',sortKey:'birthDate'},
    {title:'identityCardNumber',persianTitle:'شماره شناسنامه',sortKey:'identityCardNumber'},
    {title:'status',persianTitle:'وضعیت',sortKey:'status'},
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IFarmer[]=[];
  selectedList: IFarmer[]=[];
  
  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private farmerService: FarmerService,
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
        this.farmerService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
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
          this.farmerService.delete(id).subscribe({
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