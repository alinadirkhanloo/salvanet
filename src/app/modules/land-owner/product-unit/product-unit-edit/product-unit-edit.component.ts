
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'app/modules/role/role.service';
import { ActivatedRoute } from '@angular/router';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';

@Component({
  selector: 'app-product-unit-edit',
  templateUrl: './product-unit-edit.component.html',
  styleUrls: ['./product-unit-edit.component.css']
})
export class ProductUnitEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  products=[
    {title:'asfas'},
    {title:'asfas'},
    {title:'asfas'},
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      realEstateUniqueCode: ['', [Validators.required, Validators.maxLength(36)]],
      realEstatePlate: ['', [Validators.required, Validators.maxLength(36)]],
      address: ['', [Validators.required, Validators.maxLength(24)]],
      waterTypeId: ['', [Validators.required, Validators.maxLength(24)]],
      code: ['', [Validators.required, Validators.maxLength(24)]],
      ownerTypeId: ['', [Validators.required, Validators.maxLength(24)]],
      documentTypeId: ['', [Validators.required, Validators.maxLength(24)]],
      vilage: ['', [Validators.required, Validators.maxLength(24)]],
      id:-1
    });
  }
  realEstateUniqueCode: string;


  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }


  loadById(id:number|string) {
    let res = this.roleService.getById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(result);
      },
      error(err) {
        
      },
      complete() {
        res.unsubscribe();
      },
    });
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IProductionUnit[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.roleService.insert(this.editForm.value) : this.roleService.update(this.editForm.value.id,this.editForm.value);
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
        },
        error: (error) => {
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){}


}

