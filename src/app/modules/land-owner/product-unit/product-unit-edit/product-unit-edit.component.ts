import { SelectionMode } from 'core/enums/dynamic-tree.enum';
import { CommonService } from 'core/services/common/common.service';
import { MenuItem } from 'primeng/api';
import { Subscription, ReplaySubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';
import { ProductUnitService } from '../product-unit.service';
import { SharedService } from 'app/shared/services/shared.service';
import { IFile } from 'app/core/interfaces/file.interface';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-product-unit-edit',
  templateUrl: './product-unit-edit.component.html',
  styleUrls: ['./product-unit-edit.component.css']
})
export class ProductUnitEditComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  items: MenuItem[];
  activeIndex: number = 0;
  public treeConfig: IDynamicTree;

  load = false;
  uploadAddress = `${environment}/file`;
  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub = null;

  productionUnitTypes = [
    { id: null, topic: '...' },
    { id: 1, topic: 'مزرعه کشاورزی' },
    { id: 2, topic: 'دامداری' },
    { id: 3, topic: 'باغ' },
    { id: 4, topic: 'مزرعه آبزی پروری' },
    { id: 5, topic: 'مزرعه پرورش طیور' }
  ];

  documentTypes = [
    { id: null, topic: '...' },
    { id: 1, topic: 'شش دانگ' },
    { id: 2, topic: 'مشترک' },
    { id: 3, topic: 'اصلاحات اراضی' },
    { id: 4, topic: 'موقوفه' },
    { id: 5, topic: 'عادی (قولنامه دستی)' },
    { id: 5, topic: 'واگذار شده' },
    { id: 5, topic: 'تصرفی' }
  ];

  landDocumentStatues = [
    { id: null, topic: '...' },
    { id: 1, topic: 'تایید شده' },
    { id: 2, topic: 'تایید نشده' }
  ];

  ownershipTypes = [
    { id: null, topic: '...' },
    { id: 1, topic: 'اختصاصی' },
    { id: 2, topic: 'شراکتی' },
    { id: 2, topic: 'موروثی' },
    { id: 2, topic: 'تفکیک نادرست' },
  ];


  landDocFiles: any[] = [];
  landFiles: any[] = [];
  landAreaFiles: any[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    private puService: ProductUnitService,
    private route: ActivatedRoute, private commonService: CommonService,
    private router: Router, private shService: SharedService, private modalService: NgbModal
  ) {

    this.editForm = this._formBuilder.group({
      realEstateUniqueCode: ['', [Validators.required, Validators.maxLength(36)]],
      realEstatePlate: ['', [Validators.required, Validators.maxLength(36)]],
      address: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      landDocumentStatusId: ['', [Validators.required]],
      landAreaStatusId: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      landAreaId: ['', [Validators.required]],
      documentTypeId: ['', [Validators.required]],
      landDocumentId: ['', [Validators.required]],
      ownershipTypeId: ['', [Validators.required]],
      ownershipTypeTitle: [''],
      locatedInId: [''],
      locatedInTitle: [''],
      id: null
    });
  }

  realEstateUniqueCode: string;


  ngOnInit(): void {
    this.subscription.add(
      this.routeSub = this.route.params.subscribe(params => {
        if (params['id']) {
          this.updateMode = true;
          this.loadById(params['id']);
        }
      })
    );
    this.items = [
      {
        label: 'مشخصات اصلی',
        command: (event: any) => this.activeIndex = 0
      },
      {
        label: 'آپلود سند',
        command: (event: any) => this.activeIndex = 1
      },
      {
        label: 'تعیین آدرس',
        command: (event: any) => this.activeIndex = 2
      }
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  uploader(event) {
    let file = event.files[0];
    let tmp: IFile = {
      name: file.name,
      displayName: file.name,
      size: file.size,
      createdAt: new Date().toString(),
      modifiedAt: new Date().toString(),
      content: [
        file.objectURL['changingThisBreaksApplicationSecurity']
      ]
    };
    this.puService.create(tmp).subscribe({});
  }

  openFindBox(idControlName: string, titleControlname: string, url: string, expandUrl: string, title: string) {
    this.treeConfig = {

      treeNodes$: this.commonService.getTree(url),

      onNodeContextMenuSelect: new ReplaySubject<any>(1),
      onNodeSelect: new ReplaySubject<any>(1),

      lazyUrl: [
        expandUrl, ''
      ],

      selectionMode: SelectionMode.SINGLE_SELECT
    };

    const modalRef = this.modalService.open(FindBoxComponent, { size: 'lg' });
    modalRef.componentInstance.treeConfig = this.treeConfig;
    modalRef.componentInstance.title = title;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      console.log(result);
      if (result) {
        this.editForm.controls[idControlName].setValue(result.data);
        this.editForm.controls[titleControlname].setValue(result.label);
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }


  onLandDocUpload(event) {
    console.log(event);
    let id = event.originalEvent.body.id;
    for (let file of event.files) {
      this.landDocFiles.push(file);
      this.editForm.controls['landDocumentId'].setValue(id);
    }
  }

  onLandAreaUpload(event) {
    let id = event.originalEvent.body.id;
    for (let file of event.files) {
      this.landAreaFiles.push(file);
      this.editForm.controls['landAreaId'].setValue(id);
    }
  }

  onActiveIndexChange(event) {
    console.log(event);

    this.activeIndex = event;
  }



  loadById(id: number | string) {
    let res = this.puService.readById(id).subscribe({
      next: (result) => {
        this.setDataToForm(result);
      },
      error(err) { },
      complete() {
        res.unsubscribe();
      },
    });
  }

  setDataToForm(entityData: any) {
    this.editForm.setValue(entityData as IProductionUnit[]);
  }

  submit() {

    this.disableButton = true;
    let productUnit = this.editForm.value;
    productUnit.documentTypeId = this.editForm.controls['documentTypeId'].value.id;
    productUnit.landDocumentStatusId = this.editForm.controls['landDocumentStatusId'].value.id;
    productUnit.statusId = this.editForm.controls['statusId'].value.id;
    productUnit.typeId = this.editForm.controls['typeId'].value.id;

    if (this.editForm.valid) {
      let rest = this.updateMode ? this.puService.update(this.editForm.value.id, productUnit) : this.puService.create(productUnit);
      let restSub = rest.subscribe({
        next: (result) => {
          this.shService.showSuccess();
          this.cancle();
          this.disableButton = false;
        },
        error: (error) => {
          this.shService.showError()
          this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle() {
    this.router.navigate(['pages/lands/product-unit']);
  }

}

