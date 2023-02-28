import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader } from 'app/core/interfaces/grid.interface';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IBook } from 'app/core/interfaces/book.interface';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
   
  headers:IGridHeader[] = [
    {title:'publicationName',persianTitle:'ناشر',sortKey:'publicationName'},
    {title:'type',persianTitle:'نوع',sortKey:'type'},
    {title:'title',persianTitle:'عنوان',sortKey:'title'},
    {title:'publicationYear',persianTitle:'سال انتشار',sortKey:'publicationYear'}
  ];
  bookGrid = new GenericGrid(this.router,this.headers);
  bookList: IBook[]=[];
  bookSelectedList: IBook[]=[];
  selectedBooks: IBook[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private bookService:BookService
    ) {}

  ngOnInit() {
    this.bookGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.bookService.readList().subscribe({
      next:(list:any)=>{
        this.bookGrid.onLazyLoad(event,list);
        this.bookList=list;
      }
    });
  }

  onSelectAllChange(event) {
    this.bookSelectedList = this.bookGrid.selectAllChange(event,this.bookList);
  }

  confirmSelectdBooksDelete(event: Event) {
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

  confirmBookDelete(event: Event, id: string) {
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
