import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IRegistrationAnnouncement } from 'app/core/interfaces/registration-announcement.interface';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { RegistrationAnnouncementService } from './registration-announcement.service';
import { Roles } from './registration-announcement.interface';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-registration-announcement',
  templateUrl: './registration-announcement.component.html',
  styleUrls: ['./registration-announcement.component.css']
})
export class RegistrationAnnouncementComponent implements OnInit{

  gridHeaders:IGridHeader[] = [
    {title:'title',persianTitle:'عنوان',sortKey:'title'},
    {title:'roleTitle',persianTitle:'نقش',sortKey:'roleTitle'},
    {title:'startDate',persianTitle:'تاريخ شروع',sortKey:'startDate'},
    {title:'endDate',persianTitle:'تاريخ خاتمه',sortKey:'endDate'},
    {title:'isActive',persianTitle:'فعال',sortKey:'isActive'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IRegistrationAnnouncement[]=[];
  selectedList: IRegistrationAnnouncement[]=[];
  lazyLoadvent!:LazyLoadEvent;
  first = 0;
  rows = 10;

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,private sh:SharedService,
    private registrationAnnouncementService:RegistrationAnnouncementService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    if (event) {
      this.registrationAnnouncementService.getListCount('count').subscribe(res=>{
        this.registrationAnnouncementService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
          next:(list)=>{
            if (list) {
              this.dataGrid.onLazyLoad(event,list,res);
              this.dataSource=list;
            }
  
          }
        });
      })
    }
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

 confirmAccountActivation(event: any,entity:any) {

    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد ${event.checked?'فعال سازی':'غیر فعال سازی'} حساب های انتخاب شده را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        this.registrationAnnouncementService.update(entity).subscribe(res=>{
          if (res) {
            this.sh.showSuccess(`${event.checked?'فعال سازی':'غیر فعال سازی'} انجام شد`);
          }
        });
        //confirm action
      },
      reject: () => {
        entity.active = !entity.active;
        //reject action
      }
    });
  }

  getRoleTitle(roleId:number):string{
    return Roles.filter(m=>m.value === roleId)[0].key;
  }
}
