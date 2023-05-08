import { UniversityFormComponent } from './university-form/university-form.component';
import { IUniversity } from './university.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';
import { UniversityService } from './university.service';



@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit{

  private sub = new Subscription();

  gridHeaders:IGridHeader[] = [
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'locatedInName',persianTitle:'محل استقرار',sortKey:'locatedInName'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IUniversity[]=[];
  selectedList: IUniversity[]=[];

  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private universityService:UniversityService,
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
      this.sub.add(
        this.universityService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
          next:(list:any)=>{
            this.dataGrid.onLazyLoad(event,list);
            this.dataSource=list;
          }
        })
        );
    }
  }

  openProductForm(){
    let modalRef = this.modalService.open(UniversityFormComponent,{size:'lg'});
    modalRef.componentInstance.updateMode=false;
    modalRef.componentInstance.id=0;
    modalRef.result?.then(result=>{
      if (result) {
        this.loadAll(this.lazyLoadvent);
      }
    }).catch(a=>{})
  }

  openProductEditForm(product:IUniversity){
    let modalRef = this.modalService.open(UniversityFormComponent,{size:'lg'});
    modalRef.componentInstance.updateMode=true;
    modalRef.componentInstance.product=product;
    modalRef.result?.then(result=>{
      if (result) {
        this.loadAll(this.lazyLoadvent);
      }
    }).catch(a=>{})
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  confirmSelectdThesisDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف دانشگاه ها انتخاب شده را دارید؟',
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
      message: `کاربر گرامی، آیا قصد حذف دانشگاه را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
        this.sub.add(
          this.universityService.delete(id).subscribe({
            next:(res)=>{
              this.shService.showSuccess();
              this.loadAll(this.lazyLoadvent);
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
