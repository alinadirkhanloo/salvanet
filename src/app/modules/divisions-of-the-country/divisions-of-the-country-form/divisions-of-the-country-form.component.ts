import { TreeNode } from 'primeng/api';
import { SharedService } from './../../../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisionsOfTheCountryService } from './../divisions-of-the-country.service';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICountryDivision } from 'app/core/interfaces/country.interface';

@Component({
  selector: 'app-divisions-of-the-country-form',
  templateUrl: './divisions-of-the-country-form.component.html',
  styleUrls: ['./divisions-of-the-country-form.component.css']
})
export class DivisionsOfTheCountryFormComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  node!: TreeNode;
  typeConfig!: IDynamicSelect;

  constructor(
    private _formBuilder: FormBuilder,
    private dcsService: DivisionsOfTheCountryService,
    private route: ActivatedRoute,
    private router:Router,
    private shService:SharedService
  ) {
    if (this.router.getCurrentNavigation()) {
      this.node = this.router.getCurrentNavigation().extras.state.node;

    } else {
      this.router.navigate(['pages/divisions-of-the-country/tree']);
    }
  }

  ngOnInit(): void { 
    this.editForm = this._formBuilder.group({
      typeId: ['', [Validators.required]],
      superDivisionId: [this.node?.data],
      superDivisionLabel: [this.node?.label],
      code : ['', [Validators.required, Validators.maxLength(3),Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.maxLength(64),Validators.minLength(2)]],
      fullAddress: ['', [Validators.required,Validators.maxLength(512),Validators.minLength(2)]],
      id:-1
    });
      if (!!this.node) {
        this.loadById(this.node.data);
      }

    
    this.typeConfig = {
      options$: this.dcsService.types$,
      selectId: 'product',
      placeholder: '...',
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
  }


  loadById(id:number|string) {

    let res = this.dcsService.readById(id).subscribe({
      next:(result)=>{
        if (result.superDivisionId) {
          this.loadParent(result as ICountryDivision,result.superDivisionId);
        }else this.setDataToForm(result,'تعریف نشده');
      },
      error:(err)=> {
        this.shService.showError('خطار در دریافت اطلاعات');
      },
      complete() {
        res.unsubscribe();
      },
    });

  }

  loadParent(child:ICountryDivision,id:number|string) {
    let res = this.dcsService.readById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(child,result.name);
      },
      error:(err)=> {
        this.shService.showError('خطار در دریافت اطلاعات');
      },
      complete() {
        res.unsubscribe();
      },
    });

  }

  setDataToForm(entityData:ICountryDivision,parentTitle:string) {
    this.editForm.controls['code'].setValue(entityData.code);
    this.editForm.controls['name'].setValue(entityData.name);
    this.editForm.controls['id'].setValue(entityData.id);
    this.editForm.controls['fullAddress'].setValue(entityData.fullAddress);
    this.editForm.controls['superDivisionId'].setValue(entityData.superDivisionId);
    this.editForm.controls['typeId'].setValue(this.getType(entityData.typeId));
    this.editForm.controls['superDivisionLabel'].setValue(parentTitle);
  }

  getType(id:number){

    return this.typeConfig.items.find(m=>m.id === id);
  }

  submit() {

    this.disableButton = true;
    let temp = this.editForm.value;
    temp.educationLevelId = this.editForm.controls["typeId"].value.id;
    if (this.editForm.valid) {
      let rest = this.updateMode?this.dcsService.update(this.editForm.value.id,temp):this.dcsService.create(temp);
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
          this.router.navigate(['pages/divisions-of-the-country']);
          this.shService.showSuccess();
        },
        error: (error) => {
            this.disableButton = false;
            this.shService.showError();
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    console.log(this.editForm.valid,this.editForm.value);
    
    // this.router.navigate(['pages/divisions-of-the-country/tree']);
  }


}
