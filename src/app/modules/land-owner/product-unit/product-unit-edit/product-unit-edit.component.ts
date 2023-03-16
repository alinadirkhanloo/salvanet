import { Subscription, Observable } from 'rxjs';
import { IDynamicSelect, IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';
import { ProductUnitService } from '../product-unit.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-product-unit-edit',
  templateUrl: './product-unit-edit.component.html',
  styleUrls: ['./product-unit-edit.component.css']
})
export class ProductUnitEditComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  load=false;
  uploadAddress="http://localhost:3001/file"
  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub = null;
  products = [
    { title: 'asfas' },
    { title: 'asfas' },
    { title: 'asfas' }
  ]
  landDocFiles: any[] = [];
  landFiles: any[] = [];
  landAreaFiles: any[] = [];

  landRecordTypeConfig !: IDynamicSelect;
  landOwnerTypeConfig !: IDynamicSelect;
  productionUnitTypeConfig !: IDynamicSelect;
  landDocumentStatusConfig!: IDynamicSelect;
  landAreaStatusConfig!: IDynamicSelect;
  statusConfig!: IDynamicSelect;

  constructor(
    private _formBuilder: FormBuilder,
    private puService: ProductUnitService,
    private route: ActivatedRoute,
    private router: Router,private shService:SharedService
  ) {

    this.editForm = this._formBuilder.group({
      realEstateUniqueCode: ['', [Validators.required, Validators.maxLength(36)]],
      realEstatePlate: ['', [Validators.required, Validators.maxLength(36)]],
      address: ['', [Validators.required, Validators.maxLength(24)]],
      statusId: ['', [Validators.required, Validators.maxLength(24)]],
      landAreaStatusId: ['', [Validators.required, Validators.maxLength(24)]],
      landDocumentStatusId: ['', [Validators.required, Validators.maxLength(24)]],
      typeId: ['', [Validators.required, Validators.maxLength(24)]],
      landAreaId: ['', [Validators.required, Validators.maxLength(24)]],
      documentTypeId: ['', [Validators.required, Validators.maxLength(24)]],
      landDocumentId: ['', [Validators.required, Validators.maxLength(24)]],
      locatedInId: ['', [Validators.required, Validators.maxLength(24)]],
      id: -1
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
    this.initialSelects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialSelects() {
    this.landRecordTypeConfig = {
      options$: this.puService.landRecordType$,
      selectId: 'productType',
      placeholder: '...',
      showClear: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.landOwnerTypeConfig = {
      options$: this.puService.ownershipType$,
      selectId: 'ownerType',
      placeholder: '...',
      showClear: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.productionUnitTypeConfig = {
      options$: this.puService.productionUnitType$,
      selectId: 'type',
      placeholder: '...',
      showClear: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    // let options= this.puService.status$.subscribe(result=>{
      this.landDocumentStatusConfig ={
        options$:this.puService.status$,
        selectId: 'ldstatus',
        placeholder: '...',
        filter: true,
        showClear: true,
        emptyFilterMessage: 'موردی یافت نشد',
        emptyMessage: 'موردی یافت نشد'
      }
      
      this.landAreaStatusConfig ={
        options$:this.puService.status$,
        selectId: 'areastatus',
        placeholder: '...',
        showClear: true,
        emptyFilterMessage: 'موردی یافت نشد',
        emptyMessage: 'موردی یافت نشد'
      }
      this.statusConfig = {
        options$:this.puService.status$,
        selectId: 'statusk',
        placeholder: '...',
        showClear: true,
        emptyFilterMessage: 'موردی یافت نشد',
        emptyMessage: 'موردی یافت نشد'
      }
    // });
// this.subscription.add(options); 
    setTimeout(() => {
      this.load=true;
    }, 500);
  }

  _onStatusChange(event){
    console.log(event);
    
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
    productUnit.landAreaStatusId = this.editForm.controls['landAreaStatusId'].value.id;
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

  _onLandRecordTypeChange(event) {

  }

  cancle() {
    this.router.navigate(['pages/land-owner/product-unit']);
  }

}

