import { IPerson } from './../../../core/interfaces/person.interface';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from './../../role/role.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(36)]],
      lastName: ['', [Validators.required, Validators.maxLength(36)]],
      gender: ['', [Validators.required, Validators.maxLength(36)]],
      identityCardNumber: ['', [Validators.required, Validators.maxLength(36)]],
      // birthDate: ['', [Validators.required, Validators.maxLength(36)]],
      // religion: ['', [Validators.required, Validators.maxLength(36)]],
      // sect: ['', [Validators.required, Validators.maxLength(36)]],
      // militaryStatus: ['', [Validators.required, Validators.maxLength(36)]],
      // maritalStatus: ['', [Validators.required, Validators.maxLength(36)]],
      // employmentStatus: ['', [Validators.required, Validators.maxLength(36)]],
      // numberOfChildren: ['', [Validators.required, Validators.maxLength(36)]],
      // isStudying: [false, [Validators.required]],
      // levelOfEducation: ['', [Validators.required, Validators.maxLength(24)]],
      // address: ['', [Validators.required, Validators.maxLength(24)]],
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
    this.editForm.setValue(entityData as IPerson[]);
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
