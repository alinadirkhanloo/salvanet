import { EnterpriseRoleService } from './enterprise-role.service';
import { IEnterpriseRole } from 'core/interfaces/enterprise-role.interface';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterprise-role',
  templateUrl: './enterprise-role.component.html',
  styleUrls: ['./enterprise-role.component.css']
})
export class EnterpriseRoleComponent implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'isSupervisor',persianTitle:'ناظر ',sortKey:'isSupervisor'},
    {title:'maxPositionNumber',persianTitle:'حداکثر سمت قابل تعريف',sortKey:'maxPositionNumber'}
  ];


  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IEnterpriseRole[]=[];
  selectedList: IEnterpriseRole[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private ERService:EnterpriseRoleService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.ERService.getList().subscribe({
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
