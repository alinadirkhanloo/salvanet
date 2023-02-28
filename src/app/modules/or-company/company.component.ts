import { ICompany } from './../../core/interfaces/company.interface';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'establishmentDate',persianTitle:'تاريخ تاسيس',sortKey:'establishmentDate'},
    {title:'registrationDate',persianTitle:'تاريخ ثبت',sortKey:'registrationDate'},
    {title:'registrationNumber',persianTitle:'شماره ثبت',sortKey:'registrationNumber'},
    {title:'lastRegisteredCapital',persianTitle:'آخرين سرمايه ثبت شده',sortKey:'lastRegisteredCapital'},
    {title:'type',persianTitle:'نوع شرکت',sortKey:'type'}
  ];
  

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: ICompany[]=[];
  selectedList: ICompany[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private companyService:CompanyService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.companyService.readList().subscribe({
      next:(list)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list;
      }
    });
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  confirmSelectdDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف تدریس های انتخاب شده را دارید؟',
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

  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف تدریس را دارید؟`,
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


}
