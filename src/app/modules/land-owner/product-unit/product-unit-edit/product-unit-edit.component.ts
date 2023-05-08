import { SelectionMode } from 'core/enums/dynamic-tree.enum';
import { CommonService } from 'core/services/common/common.service';
import { MenuItem } from 'primeng/api';
import { Subscription, ReplaySubject, map } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';
import { ProductUnitService } from '../product-unit.service';
import { SharedService } from 'app/shared/services/shared.service';
import { IFile } from 'app/core/interfaces/file.interface';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environment/environment';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-product-unit-edit',
  templateUrl: './product-unit-edit.component.html',
  styleUrls: ['./product-unit-edit.component.css']
})
export class ProductUnitEditComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload1') public fileUpload!: FileUpload;
  private subscription = new Subscription();
  items: MenuItem[];
  activeIndex: number = 0;
  public treeConfig: IDynamicTree;

  load = false;
  uploadAddress = `${environment}/file`
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
      id: null,
      submitDate: null,
      resultDate: null,
      resultId:0,
      locatedInId: ['',[Validators.required]],
      landBoundaryId: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      ownershipTypeId: [''],
      deedOwnershipTypeId: [''],
      deedId: ['', [Validators.required]],
      locatedInTitle: [''],
      ownershipApproved: false,
      ownershipApprovalDescription: null,
      boundaryApproved: false,
      boundaryApprovalDescription: null,

    });
  }



  get docs(){
    return this.editForm.controls['deedId'].value !== null &&
     this.editForm.controls['landBoundaryId'].value !== null 
  }

  realEstateUniqueCode: string;
  fileName1:string='';
  fileName2:string='';

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


  deleteFile1(){
    this.editForm.controls['deedId'].setValue(null);
    this.fileName1 = '';
  }
  deleteFile2(){
    this.editForm.controls['landBoundaryId'].setValue(null);
    this.fileName2 = '';
  }
  pickPhoto($event: any) {

    const file: File = $event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.fileName1 = file.name;
      setTimeout(() => {
        
        let tmp: IFile = {
          name: file.name,
          displayName: file.name,
          size: file.size,
          createdAt: null,
          modifiedAt: null,
          content: reader.result as string
        };
          
      this.puService.create(tmp,'','file').subscribe(res=>{
        this.shService.showSuccess('فایل آپلود شد');
        this.editForm.controls['deedId'].setValue(res.id);
      });
      }, 2000);

    }

  }

  pickPhoto2($event: any) {

    const file: File = $event.target.files[0];
    if (file) {
      this.fileName2 = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      setTimeout(() => {
          
        let tmp: IFile = {
          name: file.name,
          displayName: file.name,
          size: file.size,
          createdAt: null,
          modifiedAt: null,
          content: reader.result as string
        };
          
      this.puService.create(tmp,'','file').subscribe(res=>{
        this.shService.showSuccess('فایل آپلود شد');
        this.editForm.controls['landBoundaryId'].setValue(res.id);
      });
      }, 2000);

    }

  }

  uploader(event) {
    let file = event.files[0];
    const reader = new FileReader();
    let x = reader.readAsArrayBuffer(file);
    console.log(x);
    
    const formData: FormData = new FormData();
    for (let file of event.files) {
      formData.append('documento', file.data, file.data.name);
    }


    let tmp: IFile = {
      name: file.name,
      displayName: file.name,
      size: file.size,
      createdAt: null,
      modifiedAt: null,
      content: [
        file
      ]
    };


    this.puService.create(tmp,'','file').subscribe({});
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
    let id = event.originalEvent.body.id;
    for (let file of event.files) {
      this.landDocFiles.push(file);
      this.editForm.controls['deedId'].setValue(id);
    }
  }

  onLandAreaUpload(event) {
    let id = event.originalEvent.body.id;
    for (let file of event.files) {
      this.landAreaFiles.push(file);
      this.editForm.controls['landBoundaryId'].setValue(id);
    }
  }

  onActiveIndexChange(event) {
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
    this.puService.readById(entityData.locatedInId,'','countryDivision').pipe(
      map(res=>{
        this.puService.readById(entityData.deedId,'','file').pipe(
          map(result=>{
            this.puService.readById(entityData.deedId,'','file').subscribe(res2=>{
              this.fileName2 = res2.name;
            })
            return result;
          })
        ).subscribe(res1=>{
          this.fileName1 = res1.name;
        })
        return res;
      })
    ).subscribe(res=>{
      entityData.locatedInTitle = res.name;
      this.editForm.setValue(entityData as IProductionUnit[]);
    });
    
  }

  submit() {

    this.disableButton = true;
    let productUnit = this.editForm.value;

    if (this.editForm.valid) {
      let rest = this.updateMode ? this.puService.update( productUnit) : this.puService.create(productUnit);
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
    this.router.navigate(['pages/product-units']);
  }

}

