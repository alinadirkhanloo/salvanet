import { EducationalRecordsService } from './educational-records.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { IEducationDegree } from 'app/core/interfaces/education-degree.interface';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';

@Component({
  selector: 'app-educational-records',
  templateUrl: './educational-records.component.html',
  styleUrls: ['./educational-records.component.css']
})
export class EducationalRecordsComponent implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'educationLevel',persianTitle:'مقطع',sortKey:'educationLevel'},
    {title:'university',persianTitle:'دانشگاه',sortKey:'university'},
    {title:'studyField',persianTitle:'رشته',sortKey:'studyField'},
    {title:'majorStudyField',persianTitle:'گرایش',sortKey:'majorStudyField'},
    {title:'gPA',persianTitle:'معدل',sortKey:'gPA'}
  ];


  // "gPA": number;
	// universityId: number;
	// studyFieldId: number;
	// educationLevelId: number;
	// majorStudyFieldId: number;



  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IEducationDegree[]=[];
  selectedList: IEducationDegree[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private fileService:EducationalRecordsService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.fileService.readList().subscribe({
      next:(list:any)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list;
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
