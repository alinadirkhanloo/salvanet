import { OwnersService } from './owners.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader } from 'app/core/interfaces/grid.interface';
import { GenericGrid } from './../../../core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IOwner } from 'app/core/interfaces/owner.interface';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit{

  gridHeaders:IGridHeader[] = [
    {title:'nationalId',persianTitle:'کدملی',sortKey:'nationalId'},
    {title:'fullName',persianTitle:'نام و نام خانوادگی',sortKey:'fullName'},
    {title:'ratio',persianTitle:'نسبت',sortKey:'ratio'},
    {title:'sharePercentage',persianTitle:'درصد سهم',sortKey:'sharePercentage'}
  ];


  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IOwner[]=[];
  selectedList: IOwner[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private roleService:OwnersService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.roleService.getList().subscribe({
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
