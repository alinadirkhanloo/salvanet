import { ProductUnitService } from './product-unit.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';


interface ProductUnitTypes {
  id: number,
  topic: string
}



@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.css']
})
export class ProductUnitComponent implements OnInit{

  gridHeaders:IGridHeader[] = [
    {title:'realEstateUniqueCode',persianTitle:'کد يکتاي ملک',sortKey:'realEstateUniqueCode'},
    {title:'realEstatePlate',persianTitle:'پلاک ملک',sortKey:'realEstatePlate'},
    {title:'address',persianTitle:'آدرس',sortKey:'address'},
  ];

  ownershipStatuses :ProductUnitTypes[]=[
    {id:1,topic:'شش دانگ'},
    {id:2,topic:'مشترک'},
    {id:3,topic:'اصلاحات اراضی'},
    {id:4,topic:'موقوفه'},
    {id:5,topic:'عادی (قولنامه ای)'},
    {id:6,topic:'واگذار شده'},
    {id:7,topic:'تصرفی'}
  ]
  ownershipTypes:ProductUnitTypes[]=[
    {id:1,topic:'اختصاصی'},
    {id:2,topic:'وراثتی'},
    {id:3,topic:'شراکتی'},
    {id:4,topic:'تفکیک نادرست'}
  ]
  statuses:ProductUnitTypes[]=[
    {id:1,topic:'ثبت شده'},
    {id:2,topic:'در حال بررسی'},
    {id:3,topic:'تایید شده'},
    {id:4,topic:'رد شده'}
  ]
  

  productUnits=[
    {
      id: 1,
      realEstateUniqueCode: "string",
      realEstatePlate: "string",
      address: "string",
      landDocumentId: 1,
      landAreaId: 1,
      locatedInId: 1,
      ownershipStatusId: 1,
      landDocumentStatusId: 1,
      landAreaStatusId: 1,
      statusId: 1,
      ownershipTypeId: 1
    },
    {
      id: 2,
      realEstateUniqueCode: "string",
      realEstatePlate: "string",
      address: "string",
      landDocumentId: 1,
      landAreaId: 1,
      locatedInId: 1,
      ownershipStatusId: 1,
      landDocumentStatusId: 1,
      landAreaStatusId: 1,
      statusId: 1,
      ownershipTypeId: 1
    },
    
  ]

  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IProductionUnit[]=[];
  selectedList: IProductionUnit[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private productUnitService:ProductUnitService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.productUnitService.readList().subscribe({
      next:(list)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list;
      }
    });
  }

  newProductUnit(){
    this.router.navigate(['pages/land-owner/product-unit/new']);
  }

  editProductUnit(id:string){
    this.router.navigate(['pages/land-owner/product-unit/edit/'+ id]);
  }

  owners(id:string){
    this.router.navigate(['pages/land-owner/product-unit/'+ id + '/owners']);
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
        this.productUnitService.delete(id)
      },
      reject: () => {
        //reject action
      }
    });
  }


}
