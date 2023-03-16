import { ProductClassificationFormComponent } from './product-classification-form/product-classification-form.component';
import { IProductClassification } from './product-classification.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';
import { ProductClassificationService } from './product-classification.service';

@Component({
  selector: 'app-product-classification',
  templateUrl: './product-classification.component.html',
  styleUrls: ['./product-classification.component.css']
})
export class ProductClassificationComponent  implements OnInit{
  private sub = new Subscription();
  gridHeaders:IGridHeader[] = [
    {title:'code',persianTitle:'کد',sortKey:'code'},
    {title:'name',persianTitle:'نام',sortKey:'name'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IProductClassification[]=[];
  selectedList: IProductClassification[]=[];
  
  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private pcService:ProductClassificationService,
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
        this.pcService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
          next:(list:any)=>{
            this.dataGrid.onLazyLoad(event,list);
            this.dataSource=list;
          }
        })
        );
    }
  }

  openProductForm(){
    let modalRef = this.modalService.open(ProductClassificationFormComponent,{size:'lg'});
    modalRef.componentInstance.updateMode=false;
    modalRef.componentInstance.id=0;
    modalRef.result?.then(result=>{
      if (result) {
        this.loadAll(this.lazyLoadvent);
      }
    }).catch(a=>{})
  }

  openProductEditForm(product:IProductClassification){
    let modalRef = this.modalService.open(ProductClassificationFormComponent,{size:'lg'});
    modalRef.componentInstance.updateMode=true;
    modalRef.componentInstance.product=product;
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  // confirmSelectdThesisDelete(event: Event) {
  //   this.confirmationService.confirm({
  //     target: event.target,
  //     message: 'کاربر گرامی، آیا قصد حذف محصولات انتخاب شده را دارید؟',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel:'بله',
  //     rejectLabel:'خیر',
  //     acceptButtonStyleClass:'mx-2',
  //     accept: () => {
  //       //confirm action
  //     },
  //     reject: () => {
  //       //reject action
  //     }
  //   });
  // }

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
          this.pcService.delete(id).subscribe({
            next:(res)=>{
              this.loadAll(this.lazyLoadvent);
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
