import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IRegistrationAnnouncement } from 'app/core/interfaces/registration-announcement.interface';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { RegistrationAnnouncementService } from './registration-announcement.service';

@Component({
  selector: 'app-registration-announcement',
  templateUrl: './registration-announcement.component.html',
  styleUrls: ['./registration-announcement.component.css']
})
export class RegistrationAnnouncementComponent implements OnInit{

  gridHeaders:IGridHeader[] = [
    {title:'title',persianTitle:'عنوان',sortKey:'title'},
    {title:'startDate',persianTitle:'تاريخ شروع',sortKey:'startDate'},
    {title:'endDate',persianTitle:'تاريخ پايان',sortKey:'endDate'},
    {title:'isActive',persianTitle:'فعال',sortKey:'isActive'},
    {title:'description',persianTitle:'توصيفات',sortKey:'description'},
    {title:'code',persianTitle:'کد',sortKey:'code'},
  ];

  // {colDef: 'title', title:'عنوان'},
	// {colDef: 'startDate', title:'تاريخ شروع'},
	// {colDef: 'endDate', title:'تاريخ پايان'},
	// {colDef: 'code', title:'کد'},
	// {colDef: 'description', title:'توصيفات'},
	// {colDef: 'isActive', title:'فعال است'}


  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IRegistrationAnnouncement[]=[];
  selectedList: IRegistrationAnnouncement[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private registrationAnnouncementService:RegistrationAnnouncementService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.registrationAnnouncementService.getList().subscribe({
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
