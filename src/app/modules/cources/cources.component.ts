
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICource } from './cource.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { CoursesService } from '../case-history/courses/courses.service';
import { SharedService } from 'app/shared/services/shared.service';


@Component({
  selector: 'app-cources',
  templateUrl: './cources.component.html',
  styleUrls: ['./cources.component.css']
})

export class CourcesComponent implements OnInit{

  private sub = new Subscription();

  gridHeaders:IGridHeader[] = [
    {title:'code',persianTitle:'نوع',sortKey:'code'},
    {title:'executor',persianTitle:'مجری',sortKey:'executor'},
    {title:'title',persianTitle:'عنوان',sortKey:'title'},
    {title:'year',persianTitle:'سال برگزاری',sortKey:'year'},
    {title:'duration',persianTitle:'مدت زمان',sortKey:'duration'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: ICource[]=[];
  selectedList: ICource[]=[];
  
  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private courseService:CoursesService,
    private shService:SharedService
    ) {}

  ngOnInit() {
    this.loadAll(null);
  }

  loadAll(event){
    this.dataGrid.loading = true;
    this.loadDataSource(event);
  }

  loadDataSource(event: LazyLoadEvent) {
    if (event !== null) {
      this.lazyLoadvent = event;
      this.sub.add(
        this.courseService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
          next:(list:any)=>{
            this.dataGrid.onLazyLoad(event,list);
            this.dataSource=list;
          }
        })
        );
    }
  }


  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  confirmSelectdThesisDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف محصولات انتخاب شده را دارید؟',
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

  confirmThesisDelete(event: Event, id: string|number) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف محصول را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
        this.sub.add(
          this.courseService.delete(id).subscribe({
            next:(res)=>{
              this.shService.showSuccess();
            },
            error:(err)=>{
              this.shService.showError();
            }
          })
        )
      },
      reject: () => {
        //reject action
      }
    });
  }


}

