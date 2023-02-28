import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IThesis } from 'app/core/interfaces/thesis.interface';
import { IGridHeader } from 'core/interfaces/grid.interface';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { ThesisService } from './thesis.service';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css']
})
export class ThesisComponent implements OnInit{

  gridHeaders:IGridHeader[] = [
    {title:'title',persianTitle:'عنوان',sortKey:'title'},
    {title:'registrationNumber',persianTitle:'نمره',sortKey:'registrationNumber'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IThesis[]=[];
  selectedList: IThesis[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private thesisService:ThesisService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.thesisService.readList().subscribe({
      next:(list:any)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list;
      }
    });
  }

  onSelectAllChange(event) {
    // this.thesisSelectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  confirmSelectdThesisDelete(event: Event) {
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

  confirmThesisDelete(event: Event, id: string) {
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
