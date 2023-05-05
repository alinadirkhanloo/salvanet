import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';
import { ICompany } from './company.interface';
import { CompanyService } from './company.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{

  private sub = new Subscription();
  
  gridHeaders:IGridHeader[] = [
    {title:'nationalCode',persianTitle:'کد ملی',sortKey:'nationalCode'},
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'establishmentDate',persianTitle:'تاریخ تاسیس',sortKey:'establishmentDate'},
    {title:'registrationDate',persianTitle:'تاریخ ثبت',sortKey:'registrationDate'},
    {title:'registrationNumber',persianTitle:'شماره ثبت',sortKey:'registrationNumber'}
  ];


  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: ICompany[]=[];
  selectedList: ICompany[]=[];
  
  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private cService:CompanyService,
    private modalService:NgbModal,
    private shService:SharedService
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
        this.cService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
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
          this.cService.delete(id).subscribe({
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
