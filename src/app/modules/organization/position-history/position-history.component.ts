import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';
import { IPosition } from 'app/core/interfaces/position.interface';
import { PositionHistoryService } from './position.service';
import { PositionIncumbentComponent } from '../position-incumbent/position-incumbent.component';
import { PositionStatusComponent } from '../position-status/position-status.component';

@Component({
  selector: 'app-position-history',
  templateUrl: './position-history.component.html',
  styleUrls: ['./position-history.component.css']
})
export class PositionHistoryComponent implements OnInit{
    private sub = new Subscription();

    gridHeaders:IGridHeader[] = [
      {title:'name',persianTitle:'متصدی',sortKey:'name'},
      {title:'holdsById',persianTitle:'تاریخ انتصاب',sortKey:'holdsById'},
      {title:'organizationUnitId',persianTitle:'تاریخ انفصال',sortKey:'organizationUnitId'}
    ];


    dataGrid = new GenericGrid(this.router,this.gridHeaders);

    dataSource: IPosition[]=[];
    selectedList: IPosition[]=[];

    first = 0;
    rows = 10;
    lazyLoadvent!:LazyLoadEvent;
    constructor(
      private confirmationService: ConfirmationService,
      public dialogService: DialogService,
      private router:Router,
      private pService:PositionHistoryService,
      private modalService:NgbModal,
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
        console.log('x');
        // this.sub.add(
          this.pService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe(
            list =>{
              console.log(list);

              this.dataGrid.onLazyLoad(event,list);
              this.dataSource=list;
            }
          )
          // );
      }
    }

    openProductForm(){
      let modalRef = this.modalService.open(PositionIncumbentComponent);
      modalRef.componentInstance.updateMode=false;
      modalRef.componentInstance.id=0;
      modalRef.result?.then(result=>{
        if (result) {
          this.loadAll(this.lazyLoadvent);
        }
      }).catch(a=>{})
    }

    openProductEditForm(product:IPosition){
      let modalRef = this.modalService.open(PositionStatusComponent);
      modalRef.componentInstance.updateMode=true;
      modalRef.componentInstance.product=product;
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
