import { ArticleService } from './article.service';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { IGridHeader } from 'core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IArticle } from 'app/core/interfaces/article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

gridHeaders:IGridHeader[] = [
  {title:'type',persianTitle:'نوع',sortKey:'type'},
  {title:'title',persianTitle:'عنوان',sortKey:'title'},
  {title:'printYear',persianTitle:'سال چاپ',sortKey:'printYear'}
];



dataGrid = new GenericGrid(this.router,this.gridHeaders);

dataSource: IArticle[]=[];
selectedList: IArticle[]=[];

constructor(
  private confirmationService: ConfirmationService,
  public dialogService: DialogService,
  private router:Router,
  private articleService:ArticleService
  ) {}

ngOnInit() {
  this.dataGrid.loading = true;
  this.loadDataSource(null)
}

loadDataSource(event: LazyLoadEvent) {
  this.articleService.readList().subscribe({
    next:(list:any)=>{
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
