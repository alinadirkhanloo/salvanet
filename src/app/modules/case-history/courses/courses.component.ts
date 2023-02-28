import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CoursesService } from './courses.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';
import { ICource } from 'app/core/interfaces/course.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'title',persianTitle:'عنوان دوره',sortKey:'title'},
    {title:'year',persianTitle:'سال برگذاری',sortKey:'year'},
    {title:'duration',persianTitle:'مدت زمان',sortKey:'duration'}
  ];



  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: ICource[]=[];
  selectedList: ICource[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private fileService:CoursesService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.fileService.readList().subscribe({
      next:(list)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list;
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
