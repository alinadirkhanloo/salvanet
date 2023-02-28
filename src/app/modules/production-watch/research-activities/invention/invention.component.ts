import { InventionService } from './invention.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IInvention } from 'app/core/interfaces/invention.interface';

@Component({
  selector: 'app-invention',
  templateUrl: './invention.component.html',
  styleUrls: ['./invention.component.css']
})
export class InventionComponent implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'title',persianTitle:'عنوان',sortKey:'title'},
    {title:'registrationNumber',persianTitle:'شماره ثبت',sortKey:'registrationNumber'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IInvention[]=[];
  selectedList: IInvention[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private inventionService:InventionService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.inventionService.readList().subscribe({
      next:(list:any)=>{
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
