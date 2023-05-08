import { SharedService } from './../../../shared/services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductUnitService } from './product-unit.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';
import { UserAuthComponent } from 'app/core/components/dynamics/user-auth/user-auth.component';


interface ProductUnitTypes {
  id: number,
  topic: string
}



@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.css']
})
export class ProductUnitComponent implements OnInit {

  gridHeaders: IGridHeader[] = [
    { title: 'realEstateUniqueCode', persianTitle: 'کد يکتاي ملک', sortKey: 'realEstateUniqueCode' },
    { title: 'realEstatePlate', persianTitle: 'پلاک ملک', sortKey: 'realEstatePlate' },
    { title: 'address', persianTitle: 'آدرس', sortKey: 'address' },
  ];

  ownershipStatuses: ProductUnitTypes[] = [
    { id: 1, topic: 'شش دانگ' },
    { id: 2, topic: 'مشترک' },
    { id: 3, topic: 'اصلاحات اراضی' },
    { id: 4, topic: 'موقوفه' },
    { id: 5, topic: 'عادی (قولنامه ای)' },
    { id: 6, topic: 'واگذار شده' },
    { id: 7, topic: 'تصرفی' }
  ]
  ownershipTypes: ProductUnitTypes[] = [
    { id: 1, topic: 'اختصاصی' },
    { id: 2, topic: 'وراثتی' },
    { id: 3, topic: 'شراکتی' },
    { id: 4, topic: 'تفکیک نادرست' }
  ]
  statuses: ProductUnitTypes[] = [
    { id: 1, topic: 'ثبت شده' },
    { id: 2, topic: 'در حال بررسی' },
    { id: 3, topic: 'تایید شده' },
    { id: 4, topic: 'رد شده' }
  ]


  dataGrid = new GenericGrid(this.router, this.gridHeaders);

  dataSource: IProductionUnit[] = [];
  selectedList: IProductionUnit[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,private sh:SharedService,
    private router: Router, private modalService: NgbModal,
    private productUnitService: ProductUnitService
  ) { }

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.productUnitService.readList().subscribe({
      next: (list) => {
        this.dataGrid.onLazyLoad(event, list);
        this.dataSource = list;
      }
    });
  }

  newProductUnit() {
    this.router.navigate(['pages/product-units/new']);
  }

  editProductUnit(id: string) {
    this.router.navigate(['pages/product-units/edit/' + id]);
  }

  owners(id: string) {
    this.router.navigate(['pages/product-units/owners/' + id]);
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event, this.dataSource);
  }

  openFindBox(fileId) {

    const modalRef = this.modalService.open(UserAuthComponent, { size: 'lg' });

    modalRef.result.then((result) => {

      if (result) {
        this.productUnitService.readById(fileId, '', 'file').subscribe(res2 => {
          let a = document.createElement("a"); //Create <a>
          a.href = res2.content; //Image Base64 Goes here
          a.download = "Image.png"; //File name Here
          a.click();
        })
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }


  confirmSelectdDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف تدریس های انتخاب شده را دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'mx-2',
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
      message: `کاربر گرامی، آیا قصد حذف واحد تولیدی را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'mx-2',
      accept: () => {
        //confirm action
        this.productUnitService.delete(id).subscribe(res=>{
          this.sh.showSuccess('واحد تولیدی حذف شد');
          this.loadDataSource(null);
        });
      },
      reject: () => {
        //reject action
      }
    });
  }


}
