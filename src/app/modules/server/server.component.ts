import { ServerService } from './server.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IServer } from 'app/core/interfaces/role.interface';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { IGridHeader } from './../../core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent  implements OnInit{

  theachingHeaders:IGridHeader[] = [
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'code',persianTitle:'کد',sortKey:'code'},
    {title:'displayName',persianTitle:'نام نمايشي',sortKey:'displayName'},
    {title:'isActive',persianTitle:'فعال',sortKey:'isActive'},
    {title:'address',persianTitle:'آدرس',sortKey:'address'},
  ];


  dataGrid = new GenericGrid(this.router,this.theachingHeaders);

  dataSource: IServer[]=[];
  selectedList: IServer[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private serverService:ServerService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.serverService.getList().subscribe({
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
