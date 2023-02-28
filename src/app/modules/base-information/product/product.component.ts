import { Subscription } from 'rxjs';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IProduct } from './product.interface';
import { Component, OnInit } from '@angular/core';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  private sub = new Subscription();
  gridHeaders:IGridHeader[] = [
    {title:'code',persianTitle:'کد',sortKey:'code'},
    {title:'name',persianTitle:'نام',sortKey:'name'},
    {title:'hasVariety',persianTitle:'رقم دارد',sortKey:'hasVariety'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IProduct[]=[];
  selectedList: IProduct[]=[];
  
  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private productService:ProductService,
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
        this.productService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
          next:(list:any)=>{
            this.dataGrid.onLazyLoad(event,list);
            this.dataSource=list;
          }
        })
        );
    }
  }

  openProductForm(){
    let modalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.updateMode=false;
    modalRef.componentInstance.id=0;
    modalRef.result?.then(result=>{
      if (result) {
        this.loadAll(this.lazyLoadvent);
      }
    }).catch(a=>{})
  }

  openProductEditForm(product:IProduct){
    let modalRef = this.modalService.open(ProductFormComponent);
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
          this.productService.delete(id).subscribe({
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
