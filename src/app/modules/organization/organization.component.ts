import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IOrganization } from './organization.interface';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { OrganizationService } from './organization.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit{
  private sub = new Subscription();
  gridHeaders:IGridHeader[] = [
    {title:'name',persianTitle:'عنوان',sortKey:'name'},
    {title:'fullAddress',persianTitle:' آدرس کامل',sortKey:'fullAddress'},
    {title:'hasOrganizationUnit',persianTitle:'فعال سازی سازمان',sortKey:'hasOrganizationUnit'}
  ];

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IOrganization[]=[];
  selectedList: IOrganization[]=[];

  first = 0;
  rows = 10;
  lazyLoadvent!:LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private productService:OrganizationService,
    private modalService:NgbModal,
    private shService:SharedService,
    private orgs:OrganizationService
    ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll(){
    this.dataGrid.loading = true;
    this.loadDataSource();
  }

  loadDataSource() {
    this.shService.getCountryDivision().subscribe({
      next:(list:any)=>{
        this.dataSource=list;
        this.dataGrid.loading = false;
      }
    })
  }

  confirmActivation(event: Event,row:any) {
    let observer : Partial<Observer<any>> ={
      next: result=>{
        this.shService.showSuccess(`سازمان ${row.hasOrganizationUnit?'':' غیر '} فعال شد.`);
        this.loadAll();
      },error:(error)=>{
        this.shService.showError('امکان فعال سازی وجود ندارد');
        row.hasOrganizationUnit=!row.hasOrganizationUnit;
      }
    }

    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد ${row.hasOrganizationUnit?'':' غیر '}فعال سازی سازمان بر روی ${row.name} را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
        if (row.hasOrganizationUnit) {
          this.orgs.create({
            id: null,
            name: row.name,
            countryDivisionId: row.id,
            typeId: row.type,
            superiorId: row.organizationSuperiorId,
            active: row.hasOrganizationUnit
          }).subscribe(observer);
        }else{
          this.orgs.update({
            id: row.organizationId,
            name: row.name,
            countryDivisionId: row.id,
            typeId: row.type,
            superiorId: row.organizationSuperiorId,
            active: row.hasOrganizationUnit
          }).subscribe(observer);
        }

      },
      reject: () => {
        //reject action
        row.hasOrganizationUnit=!row.hasOrganizationUnit;
      }
    });
  }

  openProductForm(){
    let modalRef = this.modalService.open(OrganizationEditComponent);
    modalRef.componentInstance.updateMode=false;
    modalRef.componentInstance.id=0;
    modalRef.result?.then(result=>{
      if (result) {
        this.loadAll();
      }
    }).catch(a=>{})
  }

  openProductEditForm(product:IOrganization){
    let modalRef = this.modalService.open(OrganizationEditComponent);
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
