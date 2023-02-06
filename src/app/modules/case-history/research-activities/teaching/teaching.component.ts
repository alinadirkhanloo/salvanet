import { IGridHeader } from 'core/interfaces/grid.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ITeaching } from 'app/core/interfaces/teaching.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { TeachingService } from './teaching.service';


@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit{

  theachingHeaders:IGridHeader[] = [
    {title:'subject',persianTitle:'موضوع',sortKey:'subject'},
    {title:'venue',persianTitle:'محل',sortKey:'venue'},
    {title:'year',persianTitle:'سال',sortKey:'year'},
    {title:'duration',persianTitle:'مدت زمان به روز',sortKey:'duration'},
  ];
  teachingGrid = new GenericGrid(this.router,this.theachingHeaders);

  teachingList: ITeaching[]=[];
  teachingSelectedList: ITeaching[]=[];
  selectedTeaching: ITeaching[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private teachingService:TeachingService
    ) {}

  ngOnInit() {
    this.teachingGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.teachingService.getList().subscribe({
      next:(list)=>{
        this.teachingGrid.onLazyLoad(event,list);
        this.teachingList=list.data;
        console.log(this.teachingList);
      }
    });
  }

  onSelectAllChange(event) {
    this.teachingSelectedList = this.teachingGrid.selectAllChange(event,this.teachingList);
  }


  confirmSelectdTeachingDelete(event: Event) {
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

  confirmTeachingDelete(event: Event, id: string) {
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
