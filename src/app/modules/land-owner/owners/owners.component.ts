import { Relations } from './../../../core/constants/relations.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwnersService } from './owners.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { IGridHeader } from 'app/core/interfaces/grid.interface';
import { GenericGrid } from './../../../core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IOwner } from 'app/core/interfaces/owner.interface';
import { OwnerModalComponent } from '../owener-modal/owner-modal.component';
import { SharedService } from 'app/shared/services/shared.service';




@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit{
  items: MenuItem[];
  gridHeaders:IGridHeader[] = [
    {title:'nationalCode',persianTitle:'کدملی',sortKey:'nationalCode'},
    {title:'firstName',persianTitle:'نام ',sortKey:'firstNAme'},
    {title:'lastName',persianTitle:'نام خانوادگی',sortKey:'lastName'},
    {title:'relationType',persianTitle:'نسبت',sortKey:'relationType'},
    {title:'percentage',persianTitle:'درصد سهم',sortKey:'percentage'}
  ];
  first=0;

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IOwner[]=[];
  selectedList: IOwner[]=[];
  productionUnitId=0;
  lazy=null;
  ownerId=0;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,private route: ActivatedRoute, 
    private ownerService:OwnersService,
    private modalService:NgbModal,
    private sh:SharedService
    ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.productionUnitId=params['id'];
        }
      })

    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }
  setCurrentOwner(id){
    this.ownerId = id;
  }
  
  openProductForm(event:any,update=false){
    let modalRef = this.modalService.open(OwnerModalComponent,{size:'lg'});
    modalRef.componentInstance.updateMode=update;
    modalRef.componentInstance.pId=this.productionUnitId;
    modalRef.componentInstance.ownerId=this.ownerId;
    modalRef.result?.then(result=>{
      if (result) {
        this.loadDataSource(null);
      }
    }).catch(a=>{})
  }


  loadDataSource(event: LazyLoadEvent) {
    if (event) {
      this.lazy = event;
    }
    this.items = [
      {
        label: 'ویرایش',
        icon: 'pi pi-pencil text-warning ml-2',
        command: (event) => {this.openProductForm(event,true)}
    },
    {
        label: 'حذف',
        icon: 'pi pi-trash text-danger ml-2',
        command: (event) => {this.confirmDelete(event)}
    }

  ];
    this.ownerService.readList(`productionUnitOwnership/${this.productionUnitId}`).subscribe({
      next:(list)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list;
      }
    });
  }
  deleteOwner($event){
    this.ownerService.delete(this.ownerId).subscribe(res=>{
      this.sh.showSuccess();
      this.loadDataSource(null);
    })
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف مالک را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        this.deleteOwner(event);
      },
      reject: () => {
        //reject action
      }
    });
  }

  getRelationType(type){
    
    return Relations.find(m=>m.id === type).displayName;
  }
}
