import { IRole } from './../../../../core/interfaces/role.interface';
import { ActivatedRoute } from '@angular/router';
import { OwnersService } from './../owners.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-owners-edit',
  templateUrl: './owners-edit.component.html',
  styleUrls: ['./owners-edit.component.css']
})
export class OwnersEditComponent  implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: OwnersService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      nationalId: [0, [Validators.required, Validators.maxLength(36)]],
      ratioId: [0, [Validators.required, Validators.maxLength(36)]],
      sharePercentage: ['', [Validators.required, Validators.maxLength(24)]],
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
    let res = this.roleService.readById(id).subscribe({
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
    this.editForm.setValue(entityData as IRole[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = !this.updateMode?this.roleService.create(this.editForm.value) : this.roleService.update(this.editForm.value.id,this.editForm.value);
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
