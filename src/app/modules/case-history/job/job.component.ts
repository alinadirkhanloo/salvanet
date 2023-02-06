import { IGridHeader } from 'core/interfaces/grid.interface';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IJob } from 'app/core/interfaces/job.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { JobService } from './job.service';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit{
    
  headers:IGridHeader[] = [
    {title:'workPlace',persianTitle:'محل خدمت',sortKey:'workPlace'},
    {title:'position',persianTitle:'سمت',sortKey:'position'},
    {title:'startDate',persianTitle:'تاریخ شروع',sortKey:'startDate'},
    {title:'endDate',persianTitle:'تاریخ پایان',sortKey:'endDate'}
  ];
  jobGrid = new GenericGrid(this.router,this.headers);

  jobList: IJob[]=[];
  jobSelectedList: IJob[]=[];
  selectedJob: IJob[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private jobService:JobService
    ) {}

  ngOnInit() {
    this.jobGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.jobService.getList().subscribe({
      next:(list)=>{
        this.jobGrid.onLazyLoad(event,list);
        this.jobList=list.data;
      }
    });
  }

  onSelectAllChange(event) {
    this.jobSelectedList = this.jobGrid.selectAllChange(event,this.jobList);
  }

  confirmSelectdJobsDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف شغل های انتخاب شده را دارید؟',
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

  confirmJobDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف شغل ${id} را دارید؟`,
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
