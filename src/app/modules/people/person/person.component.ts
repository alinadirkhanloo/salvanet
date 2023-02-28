import { SharedService } from 'app/shared/services/shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IPerson } from 'app/core/interfaces/person.interface';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  private sub = new Subscription();

  gridHeaders:IGridHeader[] = [
    {title:'nationalCode',persianTitle:'کد ملی',sortKey:'nationalCode'},
    {title:'firstName',persianTitle:'نام',sortKey:'firstName'},
    {title:'lastName',persianTitle:'نام خانوادگي',sortKey:'lastName'},
    {title:'identityCardNumber',persianTitle:'شماره شناسنامه',sortKey:'identityCardNumber'},
    {title:'birthPlaceTitle',persianTitle:'محل تولد',sortKey:'birthPlaceTitle'},
    {title:'birthDate',persianTitle:'تاريخ تولد',sortKey:'birthDate'},
    {title:'phoneNumber',persianTitle:'شماره تماس',sortKey:'phoneNumber'}
  ];

dataGrid = new GenericGrid(this.router,this.gridHeaders);

dataSource: IPerson[]=[];
selectedList: IPerson[]=[];

first = 0;
rows = 10;
lazyLoadvent!:LazyLoadEvent;
constructor(
  private confirmationService: ConfirmationService,
  public dialogService: DialogService,
  private router:Router,
  private pService:PersonService,
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
      this.pService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
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
    message: 'کاربر گرامی، آیا قصد حذف شخص انتخاب شده را دارید؟',
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

confirmDelete(event: Event, id: string|number) {
  this.confirmationService.confirm({
    target: event.target,
    message: `کاربر گرامی، آیا قصد حذف شخص را دارید؟`,
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'بله',
    rejectLabel:'خیر',
    acceptButtonStyleClass:'mx-2',
    accept: () => {
      //confirm action
      this.sub.add(
        this.pService.delete(id).subscribe({
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
