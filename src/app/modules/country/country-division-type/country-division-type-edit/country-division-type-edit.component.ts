import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CountryDivisionTypeService } from '../country-division-type.service';
import { ICountryDivision } from 'app/core/interfaces/country.interface';

@Component({
  selector: 'app-country-division-type-edit',
  templateUrl: './country-division-type-edit.component.html',
  styleUrls: ['./country-division-type-edit.component.css']
})
export class CountryDivisionTypeEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private cDTService: CountryDivisionTypeService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(36)]],
      displayName: ['', [Validators.required, Validators.maxLength(36)]],
      code: ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }


  loadById(id:number|string) {
    let res = this.cDTService.getById(id).subscribe({
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
    this.editForm.setValue(entityData as ICountryDivision[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.cDTService.insert(this.editForm.value) : this.cDTService.update(this.editForm.value.id,this.editForm.value);
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
