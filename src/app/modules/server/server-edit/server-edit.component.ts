import { ActivatedRoute } from '@angular/router';
import { ServerService } from './../server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IServer } from 'app/core/interfaces/role.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent  implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private serverService: ServerService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(36)]],
      name: ['', [Validators.required, Validators.maxLength(36)]],
      displayName: ['', [Validators.required, Validators.maxLength(24)]],
      address: ['', [Validators.required, Validators.maxLength(24)]],
      isActive: [false, [Validators.required, Validators.maxLength(24)]],
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
    let res = this.serverService.getById(id).subscribe({
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
    this.editForm.setValue(entityData as IServer[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.serverService.insert(this.editForm.value) : this.serverService.update(this.editForm.value.id,this.editForm.value);
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
