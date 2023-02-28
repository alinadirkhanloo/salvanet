import { IJob } from 'app/core/interfaces/job.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { JobService } from './../job/job.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { IGridHeader } from 'core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-software-skills',
  templateUrl: './software-skills.component.html',
  styleUrls: ['./software-skills.component.css']
})
export class SoftwareSkillsComponent implements OnInit{
    
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
    this.jobService.readList().subscribe({
      next:(list)=>{
        this.jobGrid.onLazyLoad(event,list);
        this.jobList=list;
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
