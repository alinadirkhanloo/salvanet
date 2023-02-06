import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ICountryDivisionType } from '../../core/interfaces/country.interface';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { CountryDivisionTypeService } from './country-division-type.service';

@Component({
  selector: 'app-country-division-type',
  templateUrl: './country-division-type.component.html',
  styleUrls: ['./country-division-type.component.css']
})
export class CountryDivisionTypeComponent implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'displayName',persianTitle:'نام نمايشي',sortKey:'displayName'},
    {title:'code',persianTitle:'کد',sortKey:'code'},
  ];


  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: ICountryDivisionType[]=[];
  selectedList: ICountryDivisionType[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private cDTService:CountryDivisionTypeService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.cDTService.getList().subscribe({
      next:(list)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list.data;
        console.log(this.dataSource);
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
