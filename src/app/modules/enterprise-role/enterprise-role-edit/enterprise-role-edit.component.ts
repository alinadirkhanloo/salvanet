import { EnterpriseRoleService } from './../enterprise-role.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IEnterpriseRole } from 'app/core/interfaces/enterprise-role.interface';

@Component({
  selector: 'app-enterprise-role-edit',
  templateUrl: './enterprise-role-edit.component.html',
  styleUrls: ['./enterprise-role-edit.component.css']
})
export class EnterpriseRoleEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private EPService: EnterpriseRoleService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      isSupervisor: [false, [Validators.required]],
      maxPositionNumber: ['', [Validators.required, Validators.maxLength(36)]],
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
    let res = this.EPService.getById(id).subscribe({
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
    this.editForm.setValue(entityData as IEnterpriseRole[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.EPService.insert(this.editForm.value) : this.EPService.update(this.editForm.value.id,this.editForm.value);
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
