import { IPerson } from './../../../core/interfaces/person.interface';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from './../../role/role.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {PersonService} from "modules/person/person.service";

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
    private personService: PersonService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      nationalId: ['', [Validators.required]],
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthLocation: ['', [Validators.required]],
      idNumberLocation: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      country: ['', [Validators.required]],
      religen: ['', [Validators.required]],
      sect: ['', [Validators.required]],
      military: ['', [Validators.required]],
      marrid: ['', [Validators.required]],
      childNum: ['', [Validators.required]],
      job: ['', [Validators.required]],
      edu: ['', [Validators.required]],
      levelOfEdu: ['', [Validators.required]],
      home: ['', [Validators.required]],
      address: ['', [Validators.required]],
      sIMNumber : ['', [Validators.required]],
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
    let res = this.personService.getById(id).subscribe({
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
      let rest = !this.updateMode?this.personService.insert(this.editForm.value) : this.personService.update(this.editForm.value.id,this.editForm.value);
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
    } else {
      this.disableButton = false;
    }
  }

  cancle(){}


}
